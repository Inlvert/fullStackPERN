import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Svg from "./shopping-cart.svg";
import { logout } from "../../redux/slice/authSlice";
import { clearTokens } from "../../api";

const Header = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hendleLogout = () => {
    clearTokens();
    dispatch(logout());
  };

  return (
    <header>
      <nav className="textRow">
        <ul>
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <Link to="/login" className="link">
            <li>Login</li>
          </Link>
          <li>
            <text style={{ color: 'white'}}>Hello  {user ? `${user.name}` : "guest"}</text>
            <button onClick={hendleLogout}>logout</button>
          </li>
          <Link to="/cart" className="link">
            <li>
              <img src={Svg} alt="cart" />
              Cart
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
