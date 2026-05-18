function ProductCard({ image, name, description, onClick }) {
  return (

    <div className="product-card" onClick={onClick}>

      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p>{description}</p>

    </div>
  );
}

export default ProductCard;