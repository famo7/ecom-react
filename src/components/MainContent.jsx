import React from 'react';
import { Card } from 'react-daisyui';
import { Link } from 'react-router-dom';
const MainContent = ({ products }) => {
  return (
    <div className="main">
      {products.map((product) => {
        return (
          <div key={product.id} className="w-full">
            <Link to={`/products/${product.id}`}>
              <Card>
                <Card.Image src={product.img} alt="Shoes" />
                <Card.Body>
                  <Card.Title tag="h2">
                    <p className="name">{product.name}</p>
                    <p className="price">{product.price} kr</p>
                  </Card.Title>
                  <p>{product.category}</p>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MainContent;
