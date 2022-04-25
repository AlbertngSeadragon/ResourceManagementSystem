import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Account from "./Account";
import Settings from "./Settings";
import Charts from "./Charts";
import Signup from "./Signup";
import Login from "./Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar></Navbar>
          <Switch>
            <PrivateRoute path="/" exact component={Charts}></PrivateRoute>
            <PrivateRoute path="/charts" component={Charts}></PrivateRoute>
            <PrivateRoute path="/account" component={Account}></PrivateRoute>
            <PrivateRoute path="/settings" component={Settings}></PrivateRoute>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
