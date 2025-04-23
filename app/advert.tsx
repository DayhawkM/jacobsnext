import Image from "next/image";

interface AdvertProps {
    name: string;
    description: string;
    image: string;
    price: number;
    discountPrice?: number;
    isOnSale: boolean;
    breed?: string;
    season: string;
}

export default function Advert({
    name,
    description,
    image,
    price,
    discountPrice,
    isOnSale,
    breed,
    season
}: AdvertProps) {
    return (
        <div className={`advert-card ${season}-advert ${isOnSale ? `${season}-sale` : ""}`}>
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={256}
                    className="advert-image rounded-md w-full object-cover"
                    priority
                />
            </div>
            <h3 className="advert-title">{name}</h3>
            <p className="advert-description">{description}</p>

            {breed ? (
                <p className="advert-breed"><strong>Breed:</strong> {breed}</p>
            ) : (
                <p className="advert-price">
                    {isOnSale ? (
                        <>
                            <span className="line-through">£{price}</span> <strong>£{discountPrice}</strong>
                            <span className="sale-badge">End of Line</span>
                        </>
                    ) : (
                        <strong>£{price}</strong>
                    )}
                </p>
            )}
        </div>
    );
}
