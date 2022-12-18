import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = ({ products }) => {
  return (
    <div className="main">
      {products.map((product) => {
        return (
          <div key={product.id} className="w-full">
            <Link to={`/products/${product.id}`}>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={product.img}
                    className="transform transition duration-500 hover:scale-110"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <p>{product.name}</p>
                    <div className="card-actions justify-end">
                      <p>{product.price} kr</p>
                    </div>
                  </h2>
                  <p>{product.category}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MainContent;
