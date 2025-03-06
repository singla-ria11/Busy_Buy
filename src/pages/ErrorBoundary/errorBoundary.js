import { useRouteError, useNavigate } from "react-router-dom";

import style from "./errorBoundary.module.css";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Function to reload the page
  const handleRetry = () => {
    window.location.reload();
  };

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  console.error("Error caught by ErrorBoundary:", error); // Log the error (can be extended)
  console.error("Error Status:", error?.status); // Log the error (can be extended)

  return (
    <div className={style.error_container}>
      <div className={style.error_main_cont}>
        <h1>
          ⚠️
          <br />
          Oops!{" "}
          {error?.status === 404 ? "Page Not Found" : "Something went wrong."}
        </h1>
        <p>
          {error?.message ||
            "An unknown error occurred. Please try again later."}
        </p> 

        <div className={style.error_buttons}>
          <button onClick={handleGoBack} className={style.error_button}>
            🔙 Go Back
          </button>
          <button onClick={handleRetry} className={style.error_button}>
            🔄 Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
