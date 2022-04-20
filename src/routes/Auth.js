import React from "react";
import { authService } from "fbase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

function Auth() {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon icon={faTwitter} className="logo" />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} className="icon" />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github
          <FontAwesomeIcon icon={faGithub} className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Auth;
