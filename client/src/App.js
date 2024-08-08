import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import CONSTANTS from "./constants";
import { useEffect } from "react";
import { refresh } from "./redux/slice/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }
  }, [dispatch]);

  return (
    <div className="wraperApp">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
