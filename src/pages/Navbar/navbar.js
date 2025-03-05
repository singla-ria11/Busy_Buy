//

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { FaXmark } from "react-icons/fa6";
import { FaBars, FaAngleUp } from "react-icons/fa";

import style from "./navbar.module.css";
import online_store from "../../Images/online-store.png";
import home1 from "../../Images/home (1).png";
import shopping_cart_1 from "../../Images/shopping-cart (1).png";
import orders_basket from "../../Images/basket.png";
import login from "../../Images/log-in.png";
import logout1 from "../../Images/logout (1).png";

import { authSelector, signOutAsync } from "../../redux/reducers/authReducer";
import {
  productsActions,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { cartSelector } from "../../redux/reducers/cartReducer";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { authSuccess } = useSelector(authSelector);
  const { filteredCriteria } = useSelector(productsSelector);
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav>
        <NavLink to="/" className={style.navLeftCont}>
          <img src={online_store} className={style.app_logo} alt="app-logo" />
          {/* <h2>Logo</h2> */}
          <h2 className={style.app_name}>Busy-Buy</h2>
        </NavLink>

        <div className={style.search_cont}>
          {location.pathname === "/" && (
            <input
              // type="text"
              type="search"
              placeholder="Search..."
              className={style.search_input}
              value={filteredCriteria.searchQuery}
              autoFocus
              onChange={(e) => {
                console.log(e.target.value);

                dispatch(
                  productsActions.setSearchQuery({ query: e.target.value })
                );
              }}
            />
          )}

          {/* {filteredCriteria.searchQuery && (
            <FaXmark
              className={style.clear_search_icon}
              onClick={() =>
                dispatch(productsActions.setSearchQuery({ query: "" }))
              }
            />
          )} */}
        </div>

        {/* Hamburger Menu */}
        <div className={style.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaAngleUp className={style.icon} />
          ) : (
            <FaBars className={style.icon} />
          )}
        </div>

        <div
          className={`${style.navLinks} ${
            menuOpen ? style.showMenu : style.hideMenu
          }`}
        >
          <div className={style.linkCont}>
            <NavLink to="/" className={style.linkCont}>
              <img
                src={home1}
                alt="home"
                className={style.navLinks_icon}
                style={{ width: "26px", height: "23px" }}
              />
              <p>Home</p>
            </NavLink>
          </div>
          {authSuccess ? (
            <>
              <div className={style.linkCont}>
                <NavLink to="/myorders" className={style.linkCont}>
                  <img
                    src={orders_basket}
                    alt="orders"
                    className={style.navLinks_icon}
                    style={{ width: "25px", height: "24px" }}
                  />
                  <p>Orders</p>
                </NavLink>
              </div>
              <div className={style.linkCont} id={style.cartLinkCont}>
                <NavLink to="/cart" className={style.linkCont}>
                  <img
                    src={shopping_cart_1}
                    alt="cart"
                    className={style.cart_icon + " " + style.navLinks_icon}
                    style={{ width: "28px", height: "29px" }}
                  />
                  <p>Cart</p>
                  <div className={style.cartCount}>
                    {/* <p>{databaseCart.length}</p> */}
                    <p>{cartItems.length}</p>
                  </div>
                </NavLink>
              </div>
              <div
                className={style.linkCont}
                onClick={() => {
                  // dispatch(authActions.handleLogout());
                  dispatch(signOutAsync());
                }}
              >
                <NavLink className={style.linkCont}>
                  <img
                    src={logout1}
                    alt="logout"
                    className={style.navLinks_icon}
                    style={{ width: "26px", height: "28px" }}
                  />
                  <p>Logout</p>
                </NavLink>
              </div>
            </>
          ) : (
            <div className={style.linkCont}>
              <NavLink to="/signin" className={style.linkCont}>
                <img
                  src={login}
                  alt="login"
                  className={style.navLinks_icon}
                  style={{ width: "26px", height: "27px" }}
                />
                <p>SignIn</p>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
