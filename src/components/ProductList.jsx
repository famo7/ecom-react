import React from 'react';

const ProductList = ({ chosenProducts }) => {
  let sum = 0;

  const calculateTotalPrice = () => {
    chosenProducts.forEach((i) => {
      sum += i.price * i.quantity;
    });
    return sum;
  };
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {chosenProducts.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="ml-4">{product.price} kr</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Size: {product.size}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-md font-light mt-4">
          Total price:{' '}
          <span className="font-bold">{calculateTotalPrice()}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductList;
