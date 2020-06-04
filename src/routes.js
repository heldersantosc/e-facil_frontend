import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeLogin from "./pages/EmployeeLogin";
import SplashScreen from "./pages/SplashScreen";
import SelectUnit from "./pages/Unit";
import CheckAccess from "./pages/CheckAccess";
import SelectFloor from "./pages/SelectFloor";
import SelectVacancy from "./pages/SelectVacancy";
import SelectedVacancy from "./pages/SelectedVacancy";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={SplashScreen} exact />
        <Route path="/splashscreen" component={SplashScreen} />
        <Route path="/selectunit" component={SelectUnit} />
        <Route path="/login" component={Login} />
        <Route path="/employee-login" component={EmployeeLogin} />
        <Route path="/checkaccess" component={CheckAccess} />
        <Route path="/selectfloor" component={SelectFloor} />
        <Route path="/selectvacancy" component={SelectVacancy} />
        <Route path="/selectedvacancy" component={SelectedVacancy} />
      </Switch>
    </Router>
  );
}
