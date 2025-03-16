'use client';
import { useEffect, useState } from "react";
import Advert from "./advert";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dayhawkm.github.io/sherlock2/products.json");
        const data = await response.json();
        setProducts(data.products);
        
        // Select 3 random products
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="theme-spring">
      <h1 className="text-center text-3xl font-bold mb-6">Welcome to Our Seasonal Shop</h1>
      <p className="text-center mb-4">Discover top-quality pet products while supporting a great cause!</p>
      
      <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">🐶 Helping Dogs with Sherlock Rescue Centre</h2>
        <p>
          Our shop proudly collaborates with <strong>Sherlock Rescue Centre</strong> to help abandoned and rescued dogs find loving homes. 
          A portion of every purchase goes towards providing food, medical care, and shelter for these animals. 
          Together, we can make a difference! 🐾
        </p>
      </section>
      
      <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">🌸 Seasonal Sales Are Here! 🌟</h2>
        <p>
          Enjoy exclusive discounts on pet essentials during our seasonal sales. Check out our latest promotions 
          and find the best deals for your furry friends!
        </p>
      </section>
      
      <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">🎁 Featured Products</h2>
        <p>Here are three top products picked just for you:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {randomProducts.map((product) => (
            <Advert
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price} // Only for products
            />
          ))}
        </div>
      </section>
      
      <section className="mb-6 p-4 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-semibold">💰 Get Your Discount Voucher!</h2>
        <p>
          Register today and receive an exclusive discount voucher for your first purchase. 
          Don't miss out on amazing deals and special member-only offers!
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Register Now
        </button>
      </section>
    </div>
  );
}
