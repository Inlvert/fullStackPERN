import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header = (props) => {
  return (
    <header>
      <nav className="textRow">
        <ul>
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <Link to="/cart" className="link">
            <li>Cart</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
