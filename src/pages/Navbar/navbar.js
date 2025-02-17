//

import style from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav>
        <div className={style.navLeftCont}>
          <h2>Logo</h2>
          <h2>Busy-Buy</h2>
        </div>
        <div className={style.navLinks}>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/signIn">
            <p>SignIn</p>
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
