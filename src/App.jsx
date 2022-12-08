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

const App = () => {
  const [chosenProducts, setChosenProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    productsService.getAllProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  return (
    <div className="container ml-20">
      <BrowserRouter>
        <Header
          chosenProducts={chosenProducts}
          open={open}
          setOpen={setOpen}
          setChosenProducts={setChosenProducts}
        />

        <Routes>
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
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />

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
