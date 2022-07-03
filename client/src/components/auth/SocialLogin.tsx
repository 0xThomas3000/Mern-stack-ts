import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import FacebookLogin from "@greatsumini/react-facebook-login";
import { googleLogin, facebookLogin } from "../../redux/actions/authAction";

import { ImFacebook2 } from "react-icons/im";

const SocialLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = (credentialResponse: any) => {
    const id_token = credentialResponse.credential;
    dispatch<any>(googleLogin(id_token));
  };

  const onFBSuccess = (credentialResponse: any) => {
    const { accessToken, userID } = credentialResponse;
    dispatch<any>(facebookLogin(accessToken, userID));
  };

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          onSuccess={onSuccess}
          state_cookie_domain="single_host_origin"
          width="345"
          theme="filled_blue"
        />
      </div>
      <div className="my-3">
        <FacebookLogin
          className="d-flex align-items-center btn btn-outline-primary p-1"
          appId="564806318457135"
          onSuccess={onFBSuccess}
          style={{
            fontSize: "16px",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <div>
            <ImFacebook2 size={25} />
          </div>
          <span className="mx-auto">Login with Facebook</span>
        </FacebookLogin>
      </div>
    </>
  );
};

export default SocialLogin;
