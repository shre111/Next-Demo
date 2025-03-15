"use client";
import Link from 'next/link';

export default function Home() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 mt-[85px] mb-[90px]">
            <div className="relative overflow-hidden bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8 md:p-12">
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Secure Authentication
                    </h1>

                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Experience seamless and secure authentication with our modern Next.js application.
                        Protected routes, user management, and more.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link
                            href="/login"
                            className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="py-3 px-8 bg-white text-gray-800 font-medium rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Create Account
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-center">Secure Access</h3>
                            <p className="text-gray-600 text-sm text-center">Industry-standard JWT authentication keeps your data safe</p>
                        </div>

                        <div className="bg-white/70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-center">Fast Performance</h3>
                            <p className="text-gray-600 text-sm text-center">Built with Next.js for optimal speed and user experience</p>
                        </div>

                        <div className="bg-white/70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-center">Customizable</h3>
                            <p className="text-gray-600 text-sm text-center">Easily adaptable to fit your specific application needs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}