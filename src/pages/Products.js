import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import '../styles/Products.css';
import API_URL from "../config";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from Spring Boot backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      

      const response = await  fetch(`${API_URL}/product/getAllProducts`, {
       
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      // Map the backend field names to your component field names
      const mappedProducts = data.map(product => ({
        id: product.id,
        name: product.productName,
        description: product.productDescription,
        image: product.productImage,
        price: product.price || '12,999',
        oldPrice: product.oldPrice,
        rating: product.rating || 4.5,
        type: product.productType || 'Executive Chair'
      }));
      setProducts(mappedProducts);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Group products by type
  const groupProductsByType = () => {
    const grouped = {};
    products.forEach(product => {
      const type = product.type || 'Other Chairs';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(product);
    });
    return grouped;
  };

  const groupedProducts = groupProductsByType();
  const productTypes = Object.keys(groupedProducts);

  if (loading) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={fetchProducts} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">

      {products.length === 0 ? (
        <div className="no-products">
          <i className="fas fa-box-open"></i>
          <p>No products available. Check back soon!</p>
        </div>
      ) : (
        <>
          {productTypes.map((type) => (
            <div key={type} className="product-category-section">
              <div className="category-header">
                <div className="category-icon">
                  <i className="fas fa-chair"></i>
                </div>
                <h2 className="category-title">{type}</h2>
                <div className="category-line"></div>
              </div>
              <div className="products-grid">
                {groupedProducts[type].map((item) => (
                  <ProductCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                     
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

     
    </div>
  );
}

export default Products;