import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation({ userObj }) {
  return (
    <nav>
      <ul>
        <li className="homeBtn">
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </Link>
        </li>
        <li className="profileBtn">
          <Link to="/profile" >
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>{userObj.displayName ? `${userObj.displayName}` : "Profile"}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
