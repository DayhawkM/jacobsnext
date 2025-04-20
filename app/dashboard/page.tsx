"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [showVoucher, setShowVoucher] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setUser(user);
  
        
        const voucherKey = `voucher_${user.uid}`;
        const firstLoginKey = `first_login_${user.uid}`;
  
     
        const savedVoucher = localStorage.getItem(voucherKey);
        const isFirstLogin = !localStorage.getItem(firstLoginKey);
  
        
        if (isFirstLogin) {
          const newVoucher = generateVoucher();
          localStorage.setItem(voucherKey, newVoucher);  
          localStorage.setItem(firstLoginKey, "true");  
          setVoucher(newVoucher);  
          setShowVoucher(true); 
        } else {
    
          setVoucher(savedVoucher);
          setShowVoucher(false);
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

  const generateVoucher = (): string => {
    return `SAVE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user && <p className="text-gray-700 mb-4">Welcome, {user.email}!</p>}

        {voucher && showVoucher && (
          <div className="bg-green-100 p-4 rounded-md text-green-800 border border-green-400 mb-4">
            🎉 Your discount voucher:
            <span className="font-bold"> {voucher} </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
