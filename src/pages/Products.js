import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import '../styles/Products.css';
import zh101 from '../assets/images/zh101.png';
import zh102 from '../assets/images/zh102.png';
import zh103 from '../assets/images/zh103.png';
import zh59 from '../assets/images/zh59.png';
import zh54 from '../assets/images/zh54.png';
import zh51 from '../assets/images/zh51.png'; 
import zh52 from '../assets/images/zh52.png';   
import zm31 from '../assets/images/zm31.png';            
import zm29 from '../assets/images/zm29.png';            
import zm28 from '../assets/images/zm28.png';            
import zm33 from '../assets/images/zm33.png';            
import zm24 from '../assets/images/zm24.png';            
import zm36 from '../assets/images/zm36.png';            
import zm38 from '../assets/images/zm36.png';            
import zm21 from '../assets/images/zm21.png';            
import zv31 from '../assets/images/zv31.png';            
import zv26 from '../assets/images/zv26.png';            
import zv24 from '../assets/images/zv24.png';            


function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      image: zh101,
      name: 'Executive Chair',
      description: 'Premium Upholstery Pufoam with Rexin  SEAT & BACK, Foam Padded Handle Premium Base with Pu Wheel Class 3 Gaslift Heavy Duty Machanisum ',
      price: '₹12,999'
    },
    {
      image: zh102,
      name: 'Executive Chair',
      description: 'Premium Upholstery Pufoam with Rexin  SEAT & BACK, Foam Padded Handle Premium Base with Pu Wheel Class 3 Gaslift Heavy Duty Machanisum ',
      price: '₹12,999'
    },
    {
      image: zh103,
      name: 'Executive Chair',
      description: 'Premium Upholstery Pufoam with Rexin  SEAT & BACK, Foam Padded Handle Premium Base with Pu Wheel Class 3 Gaslift Centre Tilt Machanisum ',
      price: '₹12,999'
    },
    {
      image: zh59,
      name: 'Executive Chair',
      description: 'Adustable Lumber Support Adustable Handrest Adustable Headrest Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base 3 lock Mechanisum  ',
      price: '₹12,999'
    },
    {
      image: zh54,
      name: 'Executive Chair',
      description: 'Adustable Lumber Support Adustable Headrest Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Compact Synchro Mechanisum ',
      price: '₹12,999'
    },
    {
      image: zh51,
      name: 'Executive Chair',
      description: 'Adustable Lumber Support Adustable Headrest Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Centre Tilt Mechanisum ',
      price: '₹12,999'
    },
    {
      image: zh52,
      name: 'Executive Chair',
      description: 'Adustable Lumber Support Adustable Headrest Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Compact Synchro Mechanisum  ',
      price: '₹12,999'
    },
    {
      image: zm31,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Centre Tilt Mechanisum ',
      price: '₹12,999'
    },
    {
      image: zm29,
      name: 'Executive Chair',
      description: 'Imported Medium Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Centre Tilt Mechanisum ',
      price: '₹12,999'
    },
    {
      image: zm28,
      name: 'Executive Chair',
      description: ' Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Centre Tilt Mechanisum  ',
      price: '₹12,999'
    },
    {
      image: zm33,
      name: 'Executive Chair',
      description: ' Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Compact Synchro Mechanisum  ',
      price: '₹12,999'
    },
    {
      image: zm24,
      name: 'Executive Chair',
      description: ' Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Centre Tilt Mechanisum  ',
      price: '₹12,999'
    },
   
    {
      image: zm36,
      name: 'Executive Chair',
      description: ' Imported Medium Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Compact Synchro Mechanisum   ',
      price: '₹12,999'
    },
    {
      image: zm38,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base Compact Synchro Mechanisum  ',
      price: '₹12,999'
    },
    {
      image: zm21,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Class 3 Gaslift Premium uphosltery Molded Foam Seat Nylone Base  Push Back Mechanisum ',
      price: '₹12,999'
    },
    {
      image: zv31,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Premium uphosltery Molded Foam Seat 14 G Powder Coated Frame ',
      price: '₹12,999'
    },
    {
      image: zv26,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Premium uphosltery Molded Foam Seat 14 G Powder Coated Frame  ',
      price: '₹12,999'
    },
    {
      image: zv24,
      name: 'Executive Chair',
      description: 'Beathing Mesh Back Premium uphosltery Molded Foam Seat 14 G Powder Coated Frame ',
      price: '₹12,999'
    }

   
  ];

  return (
  <div className="products-page">

    <h1>Our Products</h1>

    <div className="products-grid">

      {
        products.map((item, index) => (

          <ProductCard
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            onClick={() => setSelectedProduct(item)}
          />

        ))
      }

    </div>
   

    {
      selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <h2>{selectedProduct.name}</h2>

            <p>{selectedProduct.description}</p>

            <button onClick={() => setSelectedProduct(null)}>
              Close
            </button>

          </div>

        </div>

      )
    }

  </div>
);
}

export default Products;