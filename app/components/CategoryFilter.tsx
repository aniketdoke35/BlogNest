"use client";

import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
    categories: Category[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    const handleCategoryClick = (slug: string | null) => {
        if (slug) {
            router.push(`/?category=${slug}`);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex flex-wrap gap-2 my-8 justify-center">
            <button
                onClick={() => handleCategoryClick(null)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${!currentCategory
                        ? 'bg-black text-white border-black ring-2 ring-offset-2 ring-black'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${currentCategory === category.slug
                            ? 'bg-black text-white border-black ring-2 ring-offset-2 ring-black'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
