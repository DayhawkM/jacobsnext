"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [showVoucher, setShowVoucher] = useState(false); // Controls display of voucher
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                const voucherKey = `voucher_${user.uid}`;
                const firstLoginKey = `first_login_${user.uid}`;
                const savedVoucher = localStorage.getItem(voucherKey);

                if (!savedVoucher && !localStorage.getItem(firstLoginKey)) {
                    // First-time registration, generate a voucher
                    const newVoucher = generateVoucher();
                    localStorage.setItem(voucherKey, newVoucher);
                    localStorage.setItem(firstLoginKey, "true"); // Mark first login
                    setVoucher(newVoucher);
                    setShowVoucher(true); // Show voucher for first-time users
                } else {
                    setVoucher(savedVoucher);
                    setShowVoucher(false); // Hide for returning users
                }
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/");
    };

    // Function to generate a random voucher code
    const generateVoucher = () => {
        return `SAVE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                {user && <p className="text-gray-700 mb-4">Welcome, {user.email}!</p>}

                {/* 🎉 Show voucher only if it's the first registration */}
                {voucher && showVoucher && (
                    <div className="bg-green-100 p-4 rounded-md text-green-800 border border-green-400 mb-4">
                        🎉 Your discount voucher:  
                        <span className="font-bold"> {voucher} </span>
                    </div>
                )}

                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </div>
    );
}
