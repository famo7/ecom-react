import React, { useState } from 'react';
import Input from './Input';
import payment from '../services/payment';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

const Address = ({ chosenProducts }) => {
  let navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    email: '',
    phone: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    payment
      .sendDetails(userDetails)
      .then((id) => {
        console.log(id);
        return navigate('/payment', { state: id });
      })
      .catch((e) => console.log(e));
  };

  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="flex justify-around">
      <div>
        <div className="w-96">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Your details
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <Input
              handleChange={handleChange}
              id="name"
              label="name"
              type="name"
              placeHolder="name"
              val={userDetails.name}
            />
            <Input
              handleChange={handleChange}
              id="address"
              label="address"
              type="address"
              placeHolder="address"
              val={userDetails.address}
            />
            <Input
              handleChange={handleChange}
              id="city"
              label="city"
              type="city"
              placeHolder="city"
              val={userDetails.city}
            />

            <Input
              handleChange={handleChange}
              id="postCode"
              label="postCode"
              type="postCode"
              placeHolder="post code"
              val={userDetails.postCode}
            />
            <Input
              handleChange={handleChange}
              id="country"
              label="country"
              type="country"
              placeHolder="country"
              val={userDetails.country}
            />
            <Input
              handleChange={handleChange}
              id="email"
              label="email"
              type="email"
              placeHolder="email"
              val={userDetails.email}
            />

            <Input
              handleChange={handleChange}
              id="phone"
              label="phone"
              type="text"
              placeHolder="phone"
              val={userDetails.phone}
            />
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Product summary
        </h1>
        <ProductList chosenProducts={chosenProducts} />
      </div>
    </div>
  );
};

export default Address;
