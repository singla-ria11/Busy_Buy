//
import { NavLink } from "react-router";
import style from "./auth.module.css";

export default function SignIn() {
  return (
    <>
      <div className={style.auth_cont}>
        <h1>SignIn</h1>
        <form>
          <input type="email" placeholder="Enter Email"></input>
          <input type="password" placeholder="Enter Password"></input>
          <button>Sign In</button>
        </form>

        <p>
          Not Registered? <NavLink to="/signup">SignUp</NavLink>
        </p>
      </div>
    </>
  );
}
