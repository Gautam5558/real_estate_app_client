import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message") || null;

  const { state, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setLoginData((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      dispatch({ type: "LOGIN_FAILURE", payload: "email or password missing" });
      return;
    }

    async function loginRequest() {
      try {
        dispatch({ type: "LOGIN_START" });
        const res = await axios.post(
          import.meta.env.VITE_BASE_URL + "api/auth/login",
          loginData,
          { withCredentials: true }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        console.log(state.user);
        navigate("/");
      } catch (err) {
        console.log(err);
        dispatch({ type: "LOGIN_FAILURE", payload: "something went wrong" });
      }
    }
    loginRequest();
  };
  console.log(state.user);
  return (
    <div className="login">
      <div className="lWrapper">
        <form
          className="lForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2 className="signin primaryText">Signin</h2>
          <div className="entry">
            <label className="lLabel orangeText">Email</label>
            <input
              type="email"
              placeholder="@bob.com"
              className="lInput"
              value={loginData.email}
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="entry">
            <label className="lLabel orangeText">Password</label>
            <input
              type="password"
              className="lnput"
              name="password"
              value={loginData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <button disabled={state.loading} className="lButton">
            {state.loading ? "logging in" : "signup"}
          </button>
          {state.error && <span className="error">{state.error}!</span>}
          {message && <span className="error">{message}!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
