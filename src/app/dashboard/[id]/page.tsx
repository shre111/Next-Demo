/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ProductView = () => {
    const { id } = useParams(); // Get the dynamic id from the URL
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (id) {
            axios.get(`/api/auth/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    // Handle quantity changes
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Loading state with skeleton loader
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="md:flex md:space-x-8">
                        <div className="md:w-1/2">
                            <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
                        </div>
                        <div className="md:w-1/2 mt-6 md:mt-0">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-32 bg-gray-200 rounded w-full mb-6"></div>
                            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
            <p className="mt-4 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Return to Shop
            </button>
        </div>
    );

    // Generate some additional mock images since we only have one in the data
    const productImages = [
        product.imgUrl,
        product.imgUrl, // Using the same image as placeholders
        product.imgUrl,
        product.imgUrl
    ];

    // Generate random related products
    const relatedProducts = [
        {
            name: "Modern Armchair",
            price: 129,
            image: "https://res.cloudinary.com/ddqo8zyvx/image/upload/v1740988305/rds1vugg0xonfot92ugz.png"
        },
        {
            name: "Coffee Table",
            price: 89,
            image: "https://res.cloudinary.com/ddqo8zyvx/image/upload/v1740988305/rds1vugg0xonfot92ugz.png"
        },
        {
            name: "Floor Lamp",
            price: 59,
            image: "https://res.cloudinary.com/ddqo8zyvx/image/upload/v1740988305/rds1vugg0xonfot92ugz.png"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Product Main Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Product Images */}
                        <div className="md:w-1/2 p-6">
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 h-96">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.productName}
                                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">SALE</span>
                                <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {productImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer rounded-md overflow-hidden h-20 border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.productName} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2 p-6 md:border-l border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md uppercase tracking-wider mb-2">
                                        {product.category}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
                                </div>
                                <button className="text-gray-400 hover:text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mt-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5"
                                            fill={i < Math.floor(product.avgRating) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            ></path>
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">{product.avgRating} ({product.reviews.length} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="mt-6">
                                <div className="flex items-end space-x-2">
                                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                    <span className="text-lg text-gray-500 line-through">${Math.round(product.price * 1.2)}</span>
                                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">Save 20%</span>
                                </div>
                                <p className="text-green-600 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    In Stock & Ready to Ship
                                </p>
                            </div>

                            {/* Short Description */}
                            <div className="mt-4">
                                <p className="text-gray-600">{product.shortDesc}</p>
                            </div>

                            {/* Color Options */}
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                <div className="flex items-center space-x-3 mt-2">
                                    <button className="relative w-8 h-8 bg-gray-800 rounded-full focus:outline-none ring-2 ring-offset-2 ring-gray-800">
                                        <span className="sr-only">Charcoal</span>
                                    </button>
                                    <button className="relative w-8 h-8 bg-blue-600 rounded-full focus:outline-none">
                                        <span className="sr-only">Blue</span>
                                    </button>
                                    <button className="relative w-8 h-8 bg-amber-700 rounded-full focus:outline-none">
                                        <span className="sr-only">Brown</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                <div className="flex h-9 w-32 mt-2">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="w-9 h-full flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <div className="flex-1 flex items-center justify-center h-full border-t border-b border-gray-300 bg-white text-gray-700">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={increaseQuantity}
                                        className="w-9 h-full flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 space-y-3 md:space-y-0 md:flex md:space-x-4">
                                <button
                                    className="w-full md:w-1/2 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="w-full md:w-1/2 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Delivery and Returns */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-medium text-gray-900">Free shipping over $100</h4>
                                    </div>
                                </div>
                                <div className="flex mt-4">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-medium text-gray-900">30-day returns</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "description"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "reviews"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Reviews ({product.reviews.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("shipping")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "shipping"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Shipping & Returns
                            </button>
                        </nav>
                    </div>
                    <div className="p-6">
                        {activeTab === "description" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                                <p className="text-gray-600">{product.description}</p>

                                <h4 className="text-md font-medium text-gray-900 mt-6 mb-3">Features</h4>
                                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                    <li>Premium quality materials for long-lasting durability</li>
                                    <li>Modern design that complements any living space</li>
                                    <li>Comfortable seating with superior support</li>
                                    <li>Easy assembly with included tools</li>
                                    <li>Stain-resistant fabric for easy cleaning</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                                        Write a Review
                                    </button>
                                </div>

                                {product.reviews.map((review, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-0">
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-4 h-4"
                                                        fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                        ></path>
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">{review.rating}</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <span className="text-sm text-gray-500">Verified Purchase</span>
                                        </div>
                                        <h4 className="font-medium text-gray-900 mb-1">Customer {index + 1}</h4>
                                        <p className="text-gray-600 text-sm">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                                <div className="space-y-4 text-gray-600">
                                    <p>We offer several shipping options to meet your needs:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><span className="font-medium">Standard Shipping:</span> 5-7 business days - FREE on orders over $100</li>
                                        <li><span className="font-medium">Express Shipping:</span> 2-3 business days - $15.99</li>
                                        <li><span className="font-medium">Next Day Delivery:</span> Next business day if ordered before 2pm - $29.99</li>
                                    </ul>

                                    <h4 className="text-md font-medium text-gray-900 mt-6 mb-2">Returns Policy</h4>
                                    <p>We want you to be completely satisfied with your purchase. If for any reason you're not happy, you can return your item within 30 days of delivery for a full refund or exchange.</p>
                                    <p>To be eligible for a return, the item must be unused and in the same condition that you received it, with all original packaging and tags attached.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedProducts.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden group">
                            <div className="relative h-64 bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-gray-600 mt-1">${item.price}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Add to Cart
                                    </button>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4"
                                                fill={i < 4 ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                ></path>
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;