//
import { NavLink, useNavigate } from "react-router";
import style from "./auth.module.css";
import {
  authSelector,
  signUpUserAsync,
} from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function SignUp() {
  const { authSuccess } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authSuccess) {
      navigate("/");
    }
  }, [authSuccess, navigate]);

  function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signUpUserAsync({ email, password }));
  }
  return (
    <>
      <div className={style.auth_cont}>
        <h1>SignUp</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            required
          ></input>
          <input type="email" placeholder="Enter Email" name="email"></input>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          ></input>
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already Registered? <NavLink to="/signin">SignIn</NavLink>
        </p>
      </div>
    </>
  );
}
