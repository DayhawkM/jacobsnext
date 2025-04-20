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
            <img src={image} alt={name} className="advert-image" />
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
