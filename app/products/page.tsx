'use client';
import { useEffect, useState } from "react";
import Advert from "../advert";

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    discountPrice: number;
    seasonalSale: string[];
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
          const response = await fetch("https://dayhawkm.github.io/sherlock2/products.json");
          const data = await response.json();
      
          const getSeasonalTheme = () => {
            const month = new Date().getMonth();
            if (month >= 2 && month <= 4) return "spring";
            if (month >= 5 && month <= 7) return "summer";
            if (month >= 8 && month <= 10) return "autumn";
            return "winter";
          };
      
          const currentSeason = getSeasonalTheme();
          setSeason(currentSeason);
      
          const groupedProducts = data.products.reduce((acc: ProductsByCategory, product: Product) => {
            const isOnSale = product.seasonalSale?.includes(currentSeason);
            const finalPrice = isOnSale ? product.discountPrice : product.price;
      
            const updatedProduct: Product = {
              ...product,
              isOnSale,
              finalPrice,
            };
      
            if (!acc[product.category]) {
              acc[product.category] = [];
            }
      
            acc[product.category].push(updatedProduct);
            return acc;
          }, {});
      
          setProductsByCategory(groupedProducts);
        };
      
        fetchData();
      }, []);
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
