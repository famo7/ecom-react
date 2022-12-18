import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Completion = () => {
  return (
    <div className="mt-40 h-screen flex items-center flex-col space-y-2">
      <h1 className="text-4xl font-black">Thank you for your order!</h1>
      <h3 className="text-2xl font-semibold">
        We will make sure that it arrives fast and safe.
      </h3>
      <p className="text-xl font-light">
        All details has been sent to your email.
      </p>

      <Link to="/">
        <Button text="Home" />
      </Link>
    </div>
  );
};

export default Completion;
