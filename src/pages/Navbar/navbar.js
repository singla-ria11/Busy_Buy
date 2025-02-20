//

import { useDispatch, useSelector } from "react-redux";
import style from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { authActions, authSelector } from "../../redux/reducers/authReducer";

export default function Navbar() {
  const { authSuccess } = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <>
      <nav>
        <div className={style.navLeftCont}>
          <h2>Logo</h2>
          <h2>Busy-Buy</h2>
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
                    <p>0</p>
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
