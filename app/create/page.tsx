"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Category {
    id: string;
    name: string;
}

export default function CreatePost() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/create");
        }

        // Fetch categories logic properly would be via API, but let's assume we can fetch valid categories or just hardcode for valid seeding if DB access is strict from client.
        // Actually, client cannot access DB directly. We should create an API for categories or pass them as props if it was server component.
        // For now, let's just fetch them or hardcode usual suspects if the API is not ready. But I should make an API for categories.
        // I'll create /api/categories for this.
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to load categories", err));

    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                    categoryId,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create post");
            }

            const post = await res.json();
            router.push(`/post/${post.slug}`);
            router.refresh();
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Write a new story</h1>
            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="Enter your title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        required
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL (Unsplash recommended)
                    </label>
                    <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="https://images.unsplash.com/..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                    </label>
                    <textarea
                        required
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="Tell your story..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    {loading ? "Publishing..." : "Publish Story"}
                </button>
            </form>
        </div>
    );
}
