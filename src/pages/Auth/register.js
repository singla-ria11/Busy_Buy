//
import { NavLink } from "react-router";
import style from "./auth.module.css";

export default function SignUp() {
  return (
    <>
      <div className={style.auth_cont}>
        <h1>SignUp</h1>
        <form>
          <input type="text" placeholder="Enter Name"></input>
          <input type="email" placeholder="Enter Email"></input>
          <input type="password" placeholder="Enter Password"></input>
          <button>Sign Up</button>
        </form>

        <p>
          Already Registered? <NavLink to="/signin">SignIn</NavLink>
        </p>
      </div>
    </>
  );
}
