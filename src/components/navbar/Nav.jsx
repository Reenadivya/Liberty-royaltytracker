import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from "../../assets/libert-logo.svg";

function Nav() {
  return (
    <nav>
      <div className="navbar__container">
        <div className="navbar__container--right">
          <Link to="/">
            <img className="navbar__logo" src={Logo} alt="" />
          </Link>
        </div>
        <div className="navbar__container--left">
          <ul className="navbar__list">
            <li className="navbar__list-item link__hover">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar__list-item link__hover">
              <Link to="/royalty">Royalty</Link>
            </li>
            <li className="navbar__list-item link__hover">
              <Link to="/nftcollection">NFT Collection</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
