import React from 'react';
import { Button, Navbar, Badge, Menu } from 'react-daisyui';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import { useNavigate } from 'react-router-dom';

const Header = ({
  chosenProducts,
  open,
  setOpen,
  setChosenProducts,
  user,
  setUser,
}) => {
  let navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('ecomUser');
    setUser(null);
    return navigate('/');
  };
  return (
    <div className="header">
      <div className="p-4">
        <Navbar>
          <Navbar.Start>
            <Link to="/">
              <Button color="ghost" className="normal-case text-xl">
                Famoshop
              </Button>
            </Link>
          </Navbar.Start>
          <Navbar.Center>
            <Link to="/products">
              <Menu horizontal className=" gap-2">
                <Menu.Item className="font-bold">
                  <span className="link link-hover"> Men</span>
                </Menu.Item>
                <Menu.Item className="font-bold">
                  <span className="link link-hover">Women</span>
                </Menu.Item>
                <Menu.Item className="font-bold">
                  <span className="link link-hover">Kids</span>
                </Menu.Item>
              </Menu>
            </Link>
          </Navbar.Center>
          <Navbar.End className="navbar-end gap-2">
            <SideDrawer
              user={user}
              open={open}
              chosenProducts={chosenProducts}
              setOpen={setOpen}
              setChosenProducts={setChosenProducts}
            />
            {user && (
              <button
                onClick={logout}
                className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-9 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </span>
                Logout
              </button>
            )}
            {!user && (
              <div>
                <Link to="/login">
                  <Button color="ghost" shape="circle" size="xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            )}
            <div className="indicator relative" style={{ marginLeft: 15 }}>
              <Badge size="xs" className="indicator-item ">
                {chosenProducts.length}
              </Badge>

              <Button
                color="ghost"
                shape="circle"
                size="xs"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Button>
            </div>
          </Navbar.End>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
