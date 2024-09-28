import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import CONSTANTS from "./constants";
import { useEffect, useState } from "react";
import { refresh } from "./redux/slice/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./components/ProductDetails";
import { ThemContext } from "./contexts";

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(CONSTANTS.THEMES.LIGHT_THEM);

  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }
  }, [dispatch]);

  const switchTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === CONSTANTS.THEMES.LIGHT_THEM
        ? CONSTANTS.THEMES.DARK_THEM
        : CONSTANTS.THEMES.LIGHT_THEM
    );
  };

  return (
    <ThemContext.Provider value={[theme, switchTheme]}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/products/:productId" component={ProductDetails} />
      </Switch>
    </ThemContext.Provider>
  );
}

export default App;
