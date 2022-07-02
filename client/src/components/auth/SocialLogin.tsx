import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import { googleLogin } from "../../redux/actions/authAction";

const SocialLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = (credentialResponse: any) => {
    const id_token = credentialResponse.credential;
    dispatch(googleLogin(id_token));
  };

  return (
    <div className="my-2">
      <GoogleLogin
        onSuccess={onSuccess}
        state_cookie_domain="single_host_origin"
        width="345"
        theme="filled_blue"
      />
    </div>
  );
};

export default SocialLogin;
