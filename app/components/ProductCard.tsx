import React from 'react';

interface ProductProps {
  name: string;
  price: string;
  store: string;
}

const ProductCard: React.FC<ProductProps> = ({ name, price, store }) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">Price: ${price}</p>
      <p className="text-sm text-gray-500">Store: {store}</p>
    </div>
  );
};

export default ProductCard;
