"use client";
import { useEffect, useState } from "react";
import Advert from "./advert";
import Image from "next/image";
import Head from "next/head";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  isOnSale: boolean;
  breed?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [season, setSeason] = useState<string>("");

  useEffect(() => {
    const determineSeason = () => {
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

    setSeason(determineSeason());

    const fetchData = async () => {
      try {
        const response = await fetch("https://dayhawkm.github.io/sherlock2/products.json");
        const data = await response.json();
        setProducts(data.products);

        const shuffled = [...data.products].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchData();
  }, []);

  const bannerImages: { [key: string]: string } = {
    spring: "/images/spring-banner.webp",
    summer: "/images/summer-banner.webp",
    autumn: "/images/autumn-banner.webp",
    winter: "/images/winter-banner.webp",
  };

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={bannerImages[season]} />
      </Head>

      <div className={`theme-${season}`}>
        <h1 className="text-center text-3xl font-bold mb-6">Welcome to Jacob's Pet Shop</h1>
        <p className="text-center mb-4">Discover top-quality pet products while supporting a great cause!</p>

        <div className="w-full flex justify-center mb-6">
          {season && bannerImages[season] && (
            <Image
              src={bannerImages[season]}
              alt={`${season} Sale Banner`}
              width={1200}
              height={400}
              priority
              layout="responsive"
              className="w-full max-w-4xl rounded-lg shadow-lg"
            />
          )}
        </div>

        <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">
            {season === "winter"
              ? "Urgent! Help Pets Stay Warm This Winter"
              : season === "spring"
                ? "New Beginnings: Help Rescue Pets This Spring!"
                : season === "summer"
                  ? "Keep Pets Safe This Summer!"
                  : "Give Pets a Cozy Autumn Home!"}
          </h2>
          <p>
            {season === "winter" ? (
              <>
                Winter is approaching, and our furry friends need your help. This holiday season, Jacob's Pet Shop is doubling its efforts to support Sherlock Rescue Center.
                <br />
                <strong>We need your help!</strong> A portion of all sales during winter goes directly to supporting rescue efforts.
              </>
            ) : season === "spring" ? (
              <>
                Spring is here! A time of new beginnings. Jacob's Pet Shop is committed to helping local rescues find homes for animals.
                <br />
                <strong>Support local rescue efforts!</strong> Your purchases contribute to food, vaccinations, and adoption programs.
              </>
            ) : season === "summer" ? (
              <>
                Summer can be tough for pets with high temperatures. <br />
                <strong>Keep pets hydrated!</strong> Every purchase comes with a free portable water bowl to ensure pets stay cool.
              </>
            ) : (
              <>
                Autumn leaves are falling, but many pets still need food and shelter. <br />
                <strong>We need your help!</strong> Jacob's Pet Shop supports local rescue efforts, making sure no pets are left in the cold.
              </>
            )}
          </p>
        </section>

        <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">
            {season === "winter"
              ? "Winter Sale - Keep Your Pets Cozy!"
              : season === "spring"
                ? "Spring Sale - Fresh Deals for Happy Pets!"
                : season === "summer"
                  ? "Summer Sale - Hot Deals for Cool Pets!"
                  : "Autumn Sale - Cozy Savings for Your Furry Friends!"}
          </h2>
          <p>
            {season === "winter" ? (
              <>
                As temperatures drop, keep your pets warm with our <strong>Winter Sale</strong> on heated beds and insulated jackets!
                <br />
                <strong>Limited-time stock—get yours now!</strong>
              </>
            ) : season === "spring" ? (
              <>
                Refresh your pet’s essentials this spring!
                <br />
                <strong>Spring Sale:</strong> Discounts on grooming kits, healthy treats, and outdoor toys!
              </>
            ) : season === "summer" ? (
              <>
                Keep your pets cool with <strong>Summer Sale</strong> deals on cooling mats and travel water bottles.
                <br />
                <strong>Stock up while supplies last!</strong>
              </>
            ) : (
              <>
                Get ready for cozy nights with our <strong>Autumn Sale</strong> on warm pet blankets and seasonal treats!
                <br />
                <strong>Grab your autumn essentials today!</strong>
              </>
            )}
          </p>
        </section>

        <section className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <p>Here are three top products picked just for you:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {randomProducts.map((product) => (
              <Advert
                key={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                discountPrice={product.discountPrice}
                isOnSale={product.isOnSale}
                breed={product.breed}
                season={season}
              />
            ))}
          </div>
        </section>


        <section className="mb-6 p-4 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-semibold">Get Your Discount Voucher!</h2>
          <p>Register today and receive an exclusive discount voucher for your first purchase.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
            Register Now
          </button>
        </section>
      </div>
    </>
  );
}
