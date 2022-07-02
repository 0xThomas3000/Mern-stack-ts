import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import SocialLogin from "../components/auth/SocialLogin";

import { RootStore } from "../utils/TypeScript";

const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useNavigate();

  const { auth } = useSelector((state: RootStore) => state);

  useEffect(() => {
    if (auth.access_token) history("/");
  }, [auth.access_token, history]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <SocialLogin />

        {sms ? <LoginSMS /> : <LoginPass />}

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password">Forgot password?</Link>
          </span>

          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          {`You don't have an account? `}
          <Link to={`/register`} style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
