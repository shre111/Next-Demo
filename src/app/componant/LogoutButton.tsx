"use client"; // Mark this as a Client Component

export default function LogoutButton() {
    const handleLogout = () => {
        sessionStorage.clear(); // Clear session storage
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
            Logout
        </button>
    );
}
