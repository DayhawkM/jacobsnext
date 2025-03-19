'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';





interface NavProps {
  season: string;
}

export default function Nav({ season }: NavProps) {
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
    <nav className={`sticky top-0 shadow-lg p-3 ${season}-nav`}>
      <ul className="list-none flex justify-center gap-6">
        <li>
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
        </li>
        <li>
          <Link className={`nav-link ${pathname === '/products' ? 'active' : ''}`} href="/products">Products</Link>
        </li>
        <li>
          <Link className={`nav-link ${pathname === '/dogs' ? 'active' : ''}`} href="/dogs">Dogs</Link>
        </li>
        <li>
          {user ? (
            <button className="nav-link logout" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">Dashboard</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
