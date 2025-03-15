import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "../app/globals.css";
import LogoutButton from "./componant/LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Auth App",
  description: "Secure authentication with protected routes",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800`}>
        {/* Navigation Bar with glass effect */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <span className="text-2xl transform transition-transform group-hover:rotate-12 duration-300">🔒</span>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AuthApp</h1>
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium after:absolute after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:origin-bottom-left after:transition-transform after:duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium after:absolute after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:origin-bottom-left after:transition-transform after:duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <LogoutButton />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content with subtle animation */}
        <main>
          {children}
        </main>

        {/* Footer with glass effect */}
        <footer className="mt-auto py-6 backdrop-blur-md bg-white/40 border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} AuthApp. Secure authentication with style.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}