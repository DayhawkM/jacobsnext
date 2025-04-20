'use client';
import { useEffect, useState } from "react";
import Advert from "../advert";

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    discounted?: boolean;
    discountPrice?: number;
    seasonalSale?: string[]; // Array of seasons the product is on sale
    category: string;
    isOnSale: boolean;
    finalPrice: number;
}

interface ProductsByCategory {
    [category: string]: Product[];
}

export default function Products() {
    const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>({});
    const [season, setSeason] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dayhawkm.github.io/sherlock2/products.json");
                const data = await response.json();

               
                const getSeasonalTheme = () => {
                    const month = new Date().getMonth();

                
                    if (month >= 2 && month <= 4) {
                        return "spring";
                    } else if (month >= 5 && month <= 7) {
                        return "summer";
                    } else if (month >= 8 && month <= 10) {
                        return "autumn";
                    } else {
                        return "winter"; 
                    }
                };

        
                const currentSeason = getSeasonalTheme();
                setSeason(currentSeason);

               
                const groupedProducts = data.products.reduce((acc: ProductsByCategory, product: Product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }

                    const isOnSale = product.discounted || (product.seasonalSale && product.seasonalSale.includes(currentSeason));

                    acc[product.category].push({
                        ...product,
                        isOnSale, // Add isOnSale to product
                        finalPrice: isOnSale && product.discountPrice ? product.discountPrice : product.price
                    });

                    return acc;
                }, {});

                setProductsByCategory(groupedProducts);
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means it runs once on component mount

    return (
        <div className={`theme-${season}`}>
            <h1 className="text-center text-3xl font-bold mb-6">Welcome to Our Products Page</h1>
            <p className="text-center mb-4">Find the best products for this season!</p>

            {Object.keys(productsByCategory).map((category) => (
                <div key={category} className="mb-8">
                    <div className="category-banner">
                        <h2 className="category-title">{category}</h2>
                    </div>

                    <div className="grid-container">
                        {productsByCategory[category].map((product) => (
                            <Advert
                                key={product.id}
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                                discountPrice={product.isOnSale ? product.discountPrice : undefined}
                                isOnSale={product.isOnSale}
                                season={season}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
