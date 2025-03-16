'use client';
import { useEffect, useState } from "react";
import Advert from "../advert";

export default function Products() {
    const [productsByCategory, setProductsByCategory] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dayhawkm.github.io/sherlock2/products.json");
                const data = await response.json();

                // Group products by category
                const groupedProducts = data.products.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});

                setProductsByCategory(groupedProducts);
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="theme-spring">
            <h1 className="text-center text-3xl font-bold mb-6">Welcome to Our Products Page</h1>
            <p className="text-center mb-4">Find the best products for this season!</p>

            {Object.keys(productsByCategory).map((category) => (
                <div key={category} className="mb-8">
                    {/* 🔥 Category Banner */}
                    <div className="category-banner">
                        <h2 className="category-title">{category}</h2>
                    </div>

                    <div className="grid-container">
                        {productsByCategory[category].map((product) => (
                            <Advert
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
