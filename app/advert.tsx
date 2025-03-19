export default function Advert({ id, name, description, image, price, discountPrice, isOnSale, breed, season }) {
  return (
      <div className={`advert-card ${season}-advert ${isOnSale ? `${season}-sale` : ""}`}>
          <img src={image} alt={name} className="advert-image" />
          <h3 className="advert-title">{name}</h3>
          <p className="advert-description">{description}</p>

          {/* Rescue Dogs: Show breed */}
          {breed ? (
              <p className="advert-breed"><strong>Breed:</strong> {breed}</p>
          ) : (
              /* Products: Show price & discount */
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
