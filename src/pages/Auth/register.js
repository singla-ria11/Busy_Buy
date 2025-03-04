//
import { NavLink, useNavigate } from "react-router";
import style from "./auth.module.css";
import {
  authSelector,
  signUpAsync,
} from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function SignUp() {
  const { authSuccess, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authSuccess) {
      navigate("/");
    }
    console.log(currentUser);
  }, [authSuccess, navigate]);

  function handleSignUp(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signUpAsync({ name, email, password }));
  }
  return (
    <>
      <div className={style.auth_cont}>
        <div className={style.auth_main_cont}>
        <h1>SignUp</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            autoFocus
          ></input>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
          ></input>
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
      </div>
    </>
  );
}
