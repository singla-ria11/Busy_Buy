//

import { useDispatch, useSelector } from "react-redux";
import style from "./navbar.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

import { authActions, authSelector } from "../../redux/reducers/authReducer";
import {
  productsActions,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { useEffect } from "react";
import { cartSelector } from "../../redux/reducers/cartReducer";

export default function Navbar() {
  const { authSuccess } = useSelector(authSelector);
  const { filteredCriteria } = useSelector(productsSelector);
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const location = useLocation()

  // useEffect(() => {
  //   console.log(filteredCriteria.searchQuery);
  // }, [filteredCriteria]);

  return (
    <>
      <nav>
        <div className={style.navLeftCont}>
          <h2>Logo</h2>
          <h2>Busy-Buy</h2>
        </div>

        <div className={style.search_cont}>
          {location.pathname === "/" && (
            <input
              type="text"
              placeholder="Search"
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

          {/* <FaXmark
            className={style.clear_search_icon}
            onClick={() =>
              dispatch(productsActions.setSearchQuery({ query: "" }))
            }
          /> */}
          {filteredCriteria.searchQuery && (
            <FaXmark
              className={style.clear_search_icon}
              onClick={() =>
                dispatch(productsActions.setSearchQuery({ query: "" }))
              }
            />
          )}
        </div>

        <div className={style.navLinks}>
          <div className={style.linkCont}>
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
          </div>
          {authSuccess ? (
            <>
              <div className={style.linkCont}>
                <NavLink to="/myorders">
                  <p>My Orders</p>
                </NavLink>
              </div>
              <div className={style.linkCont} id={style.cartLinkCont}>
                <NavLink to="/cart">
                  <p>Cart</p>
                  <div className={style.cartCount}>
                    <p>{cartItems.length}</p>
                  </div>
                </NavLink>
              </div>
              <div
                className={style.linkCont}
                onClick={() => dispatch(authActions.handleLogout())}
              >
                <NavLink>
                  <p>Logout</p>
                </NavLink>
              </div>
            </>
          ) : (
            <div className={style.linkCont}>
              <NavLink to="/signin">
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
