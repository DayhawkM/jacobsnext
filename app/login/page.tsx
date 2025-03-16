"use client";


import { useState } from "react";

import { auth } from "@/lib/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "next/navigation";

import Link from "next/link";


export default function Login() {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [error, setError] = useState<string | null>(null);

const router = useRouter();


const handleLogin = async (e: React.FormEvent) => {

e.preventDefault();

setError(null);


try {

await signInWithEmailAndPassword(auth, email, password);

router.push("/dashboard");

} catch (err: any) {

setError(err.message);

}

};


return (

<div className="flex justify-center items-center min-h-screen bg-gray-100">

<div className="bg-white p-6 rounded-lg shadow-md w-96">

<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>


{error && <p className="text-red-500 text-sm mb-4">{error}</p>}


<form onSubmit={handleLogin} className="flex flex-col">

<label className="mb-2 font-medium">Email</label>

<input type="email" value={email} onChange={(e) => setEmail(e.target.value)}

className="p-2 border border-gray-300 rounded-md mb-3" required />


<label className="mb-2 font-medium">Password</label>

<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}

className="p-2 border border-gray-300 rounded-md mb-3" required />


<button type="submit"

className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">

Login </button>

</form>


<p className="mt-4 text-sm text-center">Don't have an account?{" "}

<Link href="/signup" className="text-blue-500 hover:underline">

Sign Up

</Link>

</p>

</div>

</div>

);

}