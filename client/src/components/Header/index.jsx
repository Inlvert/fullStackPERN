import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Svg from "./shopping-cart.svg";
import { logout } from "../../redux/slice/authSlice";
import { clearTokens } from "../../api";
import { ThemContext } from "../../contexts";
import classNames from "classnames";
import CONSTANTS from "../../constants";

const Header = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hendleLogout = () => {
    clearTokens();
    dispatch(logout());
  };

  

  return (
    <ThemContext.Consumer>
      {([theme, switchTheme]) => {
        const className = classNames({
          [style.lightTheme]: theme === CONSTANTS.THEMES.LIGHT_THEM,
          [style.darkTheme]: theme === CONSTANTS.THEMES.DARK_THEM,
        });
        return (
          <header className={className}>
            <nav>
              <ul>
                <Link to="/" className={style.link}>
                  <li>Home</li>
                </Link>
                <Link to="/login" className={style.link}>
                  <li>Login</li>
                </Link>
                <li>
                  <text style={{ color: "white" }}>
                    Hello {user ? `${user.name}` : "guest"}
                  </text>
                  <button onClick={hendleLogout}>logout</button>
                </li>
                <Link to="/cart" className={style.link}>
                  <li>
                    <img src={Svg} alt="cart" />
                    Cart
                  </li>
                </Link>
                <button onClick={switchTheme}>switchTheme</button>
                {/* <select>
                  <option value={"lightTheme"}>lightTheme</option>
                  <option value={"darkTheme"}>darkTheme</option>
                </select> */}
              </ul>
            </nav>
          </header>
        );
      }}
    </ThemContext.Consumer>
  );
};

export default Header;
