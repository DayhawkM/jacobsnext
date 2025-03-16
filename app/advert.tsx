"use client";

type AdvertProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: number;
  breed?: string;
};

export default function Advert({ id, name, description, image, price, breed }: AdvertProps) {
  return (
    <div className="advert-card">
      <img src={image} alt={name} className="advert-image" />
      <h2 className="advert-title">{name}</h2>
      <p className="advert-description">{description}</p>
      {price !== undefined && <p className="advert-price">Price: £{price}</p>}
      {breed !== undefined && <p className="advert-breed">Breed: {breed}</p>}
    </div>
  );
}
