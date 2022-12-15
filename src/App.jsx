import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import FooterBottom from './components/FooterBottom';
import productsService from './services/products';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Message from './components/message';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Completion from './components/Completion';
import PrivateRoute from './utils/PrivateRoute';
import Address from './components/Address';
const App = () => {
  const [chosenProducts, setChosenProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [setCssClass, setSetCssClass] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('ecomUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    productsService.getAllProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header
          user={user}
          setUser={setUser}
          chosenProducts={chosenProducts}
          open={open}
          setOpen={setOpen}
          setChosenProducts={setChosenProducts}
        />
        {showAlert && <Message classN={setCssClass} message={message} />}

        <Routes>
          {/* <Route element={<PrivateRoute user={user} />}> */}

          <Route exact path="/completion" element={<Completion />} />
          <Route exact path="/address" element={<Address />} />
          <Route
            exact
            path="/payment"
            element={<Payment chosenProducts={chosenProducts} user={user} />}
          />
          {/* </Route> */}
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/products"
            element={
              <div className="content">
                <SideBar />
                <MainContent products={products} />
              </div>
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <Login
                setMessage={setMessage}
                setSetCssClass={setSetCssClass}
                setShowAlert={setShowAlert}
                setUser={setUser}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <SignUp
                setMessage={setMessage}
                setSetCssClass={setSetCssClass}
                setShowAlert={setShowAlert}
              />
            }
          />
          <Route exact path="/order" element={<OrderSummary />} />

          <Route
            exact
            path="/products/:id"
            element={
              <ProductDetails
                setOpen={setOpen}
                chosenProducts={chosenProducts}
                setChosenProducts={setChosenProducts}
              />
            }
          ></Route>
        </Routes>

        <FooterBottom />
      </BrowserRouter>
    </div>
  );
};

export default App;
