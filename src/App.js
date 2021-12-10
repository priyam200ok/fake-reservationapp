import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Register from "./Components/Registration";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import AuthProvider from "./Context/ContextStore";
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
