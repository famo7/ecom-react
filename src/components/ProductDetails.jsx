import React, { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import { useParams } from 'react-router-dom';
import productsService from '../services/products';
import Select from 'react-select';
import uniqid from 'uniqid';

const ProductDetails = ({ chosenProducts, setChosenProducts, setOpen }) => {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState({ value: 30, label: 30 });
  const options = [
    { value: 30, label: 30 },
    { value: 40, label: 40 },
    { value: 42, label: 42 },
  ];
  const { id } = useParams();
  useEffect(() => {
    productsService.getproduct(id).then((p) => {
      setProduct(p);
    });
  }, []);

  const addToCart = () => {
    let target = chosenProducts.find((obj) => obj.name === product.name);

    if (!target) {
      setChosenProducts(
        chosenProducts.concat({
          ...product,
          id: uniqid(),
          quantity: 1,
          size: size.value,
        })
      );
    } else {
      let a = chosenProducts.find(
        (obj) => obj.name === product.name && size.value === obj.size
      );

      if (a) {
        setChosenProducts(
          chosenProducts.map((i) => {
            if (i.name === a.name && i.size === a.size) {
              return { ...i, quantity: i.quantity + 1 };
            }
            return i;
          })
        );
      } else {
        setChosenProducts(
          chosenProducts.concat({
            ...product,
            id: uniqid(),
            quantity: 1,
            size: size.value,
          })
        );
      }
    }

    setOpen(true);
  };

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <Select
                      required={true}
                      options={options}
                      onChange={(choice) => setSize(choice)}
                      value={size}
                    />
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price} kr
                </span>
                <div className="flex ml-auto">
                  <button
                    onClick={addToCart}
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
