//
import { NavLink, useLocation, useNavigate } from "react-router";
import style from "./auth.module.css";
import { authSelector, signInAsync } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function SignIn() {
  const { authSuccess, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authSuccess) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    }
    console.log(currentUser);
  }, [authSuccess, navigate, location]);

  function handleSignIn(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signInAsync({ email, password }));
  }

  return (
    <>
      <div className={style.auth_cont}>
        <div className={style.auth_main_cont}>
          <h1>SignIn</h1>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              autoFocus
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
      </div>
    </>
  );
}
