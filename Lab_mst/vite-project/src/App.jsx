import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const ProductCard = ({ name, price, description, inStock }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div>
        <span>${price}</span>
        <span>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <button disabled={!inStock}>
        Add to cart
      </button>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const products = [
    {
      name: 'Modern Smartwatch',
      price: 199.99,
      description: 'stylish smartwatch with all the latest features.',
      inStock: true,
    },
    {
      name: 'Wireless Headphones',
      price: 89.50,
      description: 'Sound with good base and comfortable.',
      inStock: false,
    },
     {
      name: 'Mouse',
      price: 45.00,
      description: 'Designed for comfort and long hours of use without strain.',
      inStock: true,
    },
  ];

  return (
    <div>
       <h1>Featured Products</h1>
      <div>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            description={product.description}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  )
}

export default App


