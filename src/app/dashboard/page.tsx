
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Search, Gift, TrendingUp, Star, Package } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    // Categories for filter
    const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"];

    useEffect(() => {
        const token = sessionStorage.getItem("auth");

        if (!token) {
            router.replace("/");
        } else {
            fetchProducts();
            // Load wishlist and cart from localStorage
            const savedWishlist = localStorage.getItem("wishlist");
            const savedCart = localStorage.getItem("cart");
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
            if (savedCart) setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/auth/products");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const toggleWishlist = (productId) => {
        const newWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];

        setWishlist(newWishlist);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    };

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        let newCart;
        if (existingItem) {
            newCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newCart = [...cartItems, { ...product, quantity: 1 }];
        }

        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));

        // Show toast notification
        showToast(`${product.productName} added to cart!`);
    };

    const showToast = (message) => {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("opacity-0", "transition-opacity", "duration-500");
            setTimeout(() => document.body.removeChild(toast), 500);
        }, 2000);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="text-center">
                <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                <p className="mt-4 text-xl font-semibold text-gray-700">Loading amazing products for you...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Creative Header */}
            <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 shadow-lg">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                                <Package className="mr-2" /> MultiMart <span className="animate-pulse ml-2">🛍️</span>
                            </h1>
                            <p className="text-lg opacity-90">Your one-stop shop for the best products!</p>
                        </div>

                        <div className="mt-4 md:mt-0 flex items-center">
                            <div className="relative mr-4">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="py-2 pl-10 pr-4 rounded-full text-gray-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button className="relative p-2 bg-white bg-opacity-20 rounded-full mr-2 hover:bg-opacity-30 transition-all">
                                <Heart className="h-5 w-5" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            <button className="relative p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all" onClick={(e) => router.replace('/cart')}>
                                <ShoppingCart className="h-5 w-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Special Offers Banner */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white p-3 text-center">
                <div className="flex items-center justify-center">
                    <Gift className="mr-2" />
                    <span className="font-medium">Special offer: Use code <span className="font-bold">WELCOME20</span> for 20% off your first order!</span>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                {/* Category Navigation */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <TrendingUp className="mr-2" /> Explore Categories
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full transition-all ${activeCategory === category
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Our Products</h2>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            {/* Product Image with Sale Badge */}
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <img
                                    src={product.imgUrl}
                                    alt={product.productName}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    onClick={() => {
                                        router.push(`/dashboard/${product._id}`)
                                    }}
                                />
                                {product.onSale && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        SALE
                                    </div>
                                )}
                                <button
                                    className={`absolute top-2 right-2 p-2 rounded-full ${wishlist.includes(product.id)
                                        ? "bg-red-500 text-white"
                                        : "bg-white text-gray-600"
                                        }`}
                                    onClick={() => toggleWishlist(product.id)}
                                >
                                    <Heart className="h-4 w-4" fill={wishlist.includes(product.id) ? "white" : "none"} />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <span className="text-xs font-semibold text-purple-600 uppercase">{product.category || "General"}</span>
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.productName}</h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.shortDesc}</p>

                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="ml-1 text-sm font-medium">{product.avgRating}
                                            <span className="text-gray-500">({product.ratingCount || 0})</span></span>
                                    </div>
                                    <div className="flex items-baseline">
                                        {product.oldPrice && (
                                            <span className="text-xs line-through text-gray-500 mr-2">${product.oldPrice}</span>
                                        )}
                                        <span className="text-lg font-bold text-gray-800">${product.price}</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button
                                        className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                                        onClick={() => addToCart(product)}
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                                    </button>
                                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                                        Buy Now ⚡
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <img src="/api/placeholder/200/200" alt="No products found" className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-medium text-gray-700">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">MultiMart</h3>
                            <p className="text-gray-400">Shopping made simple and delightful</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} MultiMart. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}