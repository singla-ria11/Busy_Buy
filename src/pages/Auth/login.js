//
import { NavLink, useNavigate } from "react-router";
import style from "./auth.module.css";
import {
  authSelector,
  signInUserAsync,
} from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function SignIn() {
  const { authSuccess } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authSuccess) {
      navigate("/");
    }
  }, [authSuccess, navigate]);

  function handleSignIn(e) {
    e.preventDefault();
    console.log(e.target);

    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signInUserAsync({ email, password }));
  }

  return (
    <>
      <div className={style.auth_cont}>
        <h1>SignIn</h1>
        <form onSubmit={handleSignIn}>
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
          <button type="submit">Sign In</button>
        </form>

        <p>
          Not Registered? <NavLink to="/signup">SignUp</NavLink>
        </p>
      </div>
    </>
  );
}
