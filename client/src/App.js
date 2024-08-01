import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";

function App() {
  return (
    <div className="wraperApp">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={CartPage} />
      </Switch>
    </div>
  );
}

export default App;
