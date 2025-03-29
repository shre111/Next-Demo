
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address*").required("Email is required*"),
    password: Yup.string().min(8, "Password must be at least 8 characters*").required("Password is required*"),
});

export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // This ensures the random elements only render on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data, "loginData")
                sessionStorage.setItem("auth", data.token); // Store token in sessionStorage
                sessionStorage.setItem("userId", data.userId);
                router.push("/dashboard");
            } else {
                const data = await response.json();
                setErrors({ general: data.error || "Registration failed. Please try again." });
            }
        } catch (err) {
            setErrors({ general: "Network error. Please check your connection and try again." });
        } finally {
            setSubmitting(false);
        }
    };

    // Generate background bubbles only on the client side
    const renderBackgroundBubbles = () => {
        if (!isClient) return null;

        return [...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    opacity: Math.random() * 0.3,
                    transform: `scale(${Math.random() * 0.5 + 0.5})`,
                    animation: `float ${Math.random() * 10 + 15}s linear infinite`
                }}
            />
        ));
    };

    return (
        <div className="flex justify-center items-center min-h-[775px] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 animate-gradient-x">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    {isClient && renderBackgroundBubbles()}
                </div>
            </div>

            <div className="w-full max-w-md p-8 mx-4 bg-white/15 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 transform transition-all duration-300 hover:shadow-2xl z-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>

                <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Welcome Back
                </h2>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }: any) => (
                        <Form className="space-y-6">
                            {errors.general && (
                                <div className="mb-6 bg-red-50/30 text-red-200 p-3 rounded-lg border-l-4 border-red-400 text-sm animate-shake backdrop-blur-sm">
                                    {errors.general}
                                </div>
                            )}

                            <div className="relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full pl-10 pr-4 py-3 bg-white/20 border-2 border-white/30 text-white placeholder:text-gray-300 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 shadow-sm backdrop-blur-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-300">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <ErrorMessage name="email" component="div" className="absolute text-red-300 text-sm mt-1 left-3 top-full" />
                            </div>

                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full pl-10 pr-12 py-3 bg-white/20 border-2 border-white/30 text-white placeholder:text-gray-300 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 shadow-sm backdrop-blur-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-300">
                                    <FiLock className="w-5 h-5" />
                                </div>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                                <ErrorMessage name="password" component="div" className="absolute text-red-300 text-sm mt-1 left-3 top-full" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative z-10">
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </span>
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-center text-gray-200 mt-6">
                    Don't have an account? {" "}
                    <Link
                        href="/register"
                        className="text-blue-300 font-semibold hover:text-blue-100 relative after:absolute after:w-full after:h-0.5 after:bg-blue-300 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}


