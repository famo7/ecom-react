import './App.css';
import React, { useEffect, useState } from 'react';
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
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState(0);
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
  let onSort = products;

  switch (sortBy) {
    case 1:
      onSort = products.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case 2:
      onSort = products.sort(function (a, b) {
        return b.price - a.price;
      });
    case 3:
      onSort = products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 4:
      onSort = products.sort((a, b) => b.name.localeCompare(a.name));
    default:
      break;
  }
  onSort = products.sort(
    (a, b) => category.indexOf(b.category) - category.indexOf(a.category)
  );
  console.log(onSort);
  console.log(category);

  return (
    <div className="h-screen mx-32">
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
          <Route element={<PrivateRoute user={user} />}>
            <Route exact path="/completion" element={<Completion />} />
            <Route
              exact
              path="/address"
              element={<Address chosenProducts={chosenProducts} />}
            />
            <Route
              exact
              path="/payment"
              element={<Payment chosenProducts={chosenProducts} user={user} />}
            />
          </Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/products"
            element={
              <div className="content">
                <SideBar
                  setSortBy={setSortBy}
                  setCategory={setCategory}
                  category={category}
                />
                <MainContent products={onSort} />
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
