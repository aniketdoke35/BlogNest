"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative h-10 w-32 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="BlogNest Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        <Link
                            href="/"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-900 border-b-2 border-transparent hover:border-black transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-500 border-b-2 border-transparent hover:border-black hover:text-neutral-900 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-500 border-b-2 border-transparent hover:border-black hover:text-neutral-900 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <Link
                                    href="/create"
                                    className="hidden sm:flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span>Write</span>
                                </Link>
                                <div className="flex items-center gap-3 ml-2">
                                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                                        {session.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-sm font-medium text-neutral-500 hover:text-red-500 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
                                    Sign In
                                </Link>
                                <Link href="/register" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
