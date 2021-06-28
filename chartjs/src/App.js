import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Account from "./Account";
import Settings from "./Settings";
import Charts from "./Charts";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/charts" component={Charts}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/settings" component={Settings}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
