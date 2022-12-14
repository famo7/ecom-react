import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
const SideDrawer = ({
  chosenProducts,
  setOpen,
  open,
  setChosenProducts,
  user,
}) => {
  let navigate = useNavigate();
  let sum = 0;

  const calculateTotalPrice = () => {
    chosenProducts.forEach((i) => {
      sum += i.price * i.quantity;
    });
    return sum;
  };

  const deleteChoseProduct = (id) => {
    let product = chosenProducts.find((i) => i.id === id);
    if (product.quantity === 1) {
      deleteP(id);
    } else {
      decrementQuantity(id);
    }
  };
  const decrementQuantity = (id) => {
    setChosenProducts(
      chosenProducts.map((obj) => {
        if (obj.id === id) {
          return { ...obj, quantity: obj.quantity - 1 };
        }
        return obj;
      })
    );
  };
  const incrementQuantity = (id) => {
    setChosenProducts(
      chosenProducts.map((obj) => {
        if (obj.id === id) {
          return { ...obj, quantity: obj.quantity + 1 };
        }
        return obj;
      })
    );
  };
  const deleteP = (id) => {
    setChosenProducts(chosenProducts.filter((i) => i.id !== id));
  };
  const checkOut = (e) => {
    setOpen(false);
    if (chosenProducts.length === 0) {
      return navigate('/products');
    }
    if (user) {
      return navigate('/address');
    }
    return navigate('/login');
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
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
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          {product.price} kr
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.category}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Size: {product.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center text-black">
                                        <button
                                          className="text-2xl mr-4"
                                          onClick={() =>
                                            incrementQuantity(product.id)
                                          }
                                        >
                                          +
                                        </button>
                                        <span className="">
                                          {product.quantity}
                                        </span>
                                        <button
                                          className="text-2xl ml-4 "
                                          onClick={() =>
                                            deleteChoseProduct(product.id)
                                          }
                                        >
                                          -
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => deleteP(product.id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{calculateTotalPrice()} kr</p>
                        </div>

                        <div className="mt-6">
                          <Button onClick={checkOut} text="Checkout" />
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SideDrawer;
