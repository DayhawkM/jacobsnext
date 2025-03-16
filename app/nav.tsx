'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

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
          {user ? (
            <button className="relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 bg-red-500 hover:bg-white hover:text-red-500 hover:shadow-lg" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className={`relative px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-blue-500 hover:shadow-lg ${pathname === '/dashboard' ? 'bg-white text-blue-500' : 'bg-transparent border border-white'}`} href="/dashboard">Dashboard</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
