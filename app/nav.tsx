'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for authentication state

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-3">
      <ul className="list-none flex justify-center gap-6">
        
        <li className="relative">
          <Link className={`relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-blue-500 hover:shadow-lg ${pathname === '/' ? 'bg-white text-blue-500' : 'bg-transparent border border-white'}`} href="/">Home</Link>
        </li>
        
        <li className="relative">
          <Link className={`relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-blue-500 hover:shadow-lg ${pathname === '/products' ? 'bg-white text-blue-500' : 'bg-transparent border border-white'}`} href="/products">Products</Link>
        </li>
        
        <li className="relative">
          <Link className={`relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-blue-500 hover:shadow-lg ${pathname === '/dogs' ? 'bg-white text-blue-500' : 'bg-transparent border border-white'}`} href="/dogs">Dogs</Link>
        </li>
        
        <li className="relative">
          {isLoggedIn ? (
            <button className="relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 bg-red-500 hover:bg-white hover:text-red-500 hover:shadow-lg" onClick={() => setIsLoggedIn(false)}>Logout</button>
          ) : (
            <Link className={`relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-blue-500 hover:shadow-lg ${pathname === '/auth' ? 'bg-white text-blue-500' : 'bg-transparent border border-white'}`} href="/auth">Dashboard</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
