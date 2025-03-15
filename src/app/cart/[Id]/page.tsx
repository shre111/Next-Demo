/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Gift, CreditCard, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserCartPage() {
    // Sample cart data
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);

    // Handle quantity changes
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Handle item removal
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
        const discountedPrice = item.price * (1 - item.discount / 100);
        return sum + (discountedPrice * item.quantity);
    }, 0);

    // Fixed values for demo
    const shipping = 12.99;
    const tax = subtotal * 0.07;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
                    <p className="text-gray-600 mt-1">{cartItems.length} items in your cart</p>
                </div>

                {/* Main content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart items section */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Cart header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                                    <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium" onClick={() => router.push("/dashboard")}>
                                        <ArrowLeft size={16} />
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>

                            {/* Cart items */}
                            <div className="divide-y divide-gray-200">
                                {cartItems.map(item => (
                                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                                        {/* Product image */}
                                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product details */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                                <p className="font-semibold text-gray-900">
                                                    {item.discount > 0 ? (
                                                        <>
                                                            <span className="text-red-600">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                                                            <span className="text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                                                        </>
                                                    ) : (
                                                        `$${item.price.toFixed(2)}`
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-4">
                                                Color: {item.color}
                                                {item.discount > 0 && (
                                                    <span className="ml-4 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                        {item.discount}% OFF
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quantity and remove */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                                                >
                                                    <Trash2 size={16} />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {cartItems.length === 0 && (
                                    <div className="p-12 text-center">
                                        <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700">
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Feature cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-full">
                                    <Truck size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Free Shipping</h3>
                                    <p className="text-sm text-gray-600">On orders over $100</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-full">
                                    <Gift size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Gift Cards</h3>
                                    <p className="text-sm text-gray-600">Available for purchase</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-full">
                                    <CreditCard size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Secure Payment</h3>
                                    <p className="text-sm text-gray-600">100% secure checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order summary section */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                            {/* Promo code */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Order totals */}
                            <div className="space-y-3 border-t border-b py-6 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t">
                                    <span className="text-gray-800 font-semibold">Total</span>
                                    <span className="text-xl text-indigo-600 font-bold">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout button */}
                            <button className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                Proceed to Checkout
                            </button>

                            {/* Payment methods */}
                            <div className="mt-6">
                                <p className="text-xs text-gray-500 text-center mb-2">We accept:</p>
                                <div className="flex justify-center gap-2">
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}