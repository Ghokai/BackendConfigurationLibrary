import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import ConfigurationSettingListPage from "../routes/ConfigurationSettingListPage";
import ConfigurationSettingDetailPage from "../routes/ConfigurationSettingDetailPage";
import ConfigurationSettingNewPage from "../routes/ConfigurationSettingNewPage";
import WelcomePage from "../routes/WelcomePage";
import OperationMessage from "./OperationMessage";

export default class Main extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <OperationMessage />

        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/list" component={ConfigurationSettingListPage} />
          <Route
            path="/detail/:id"
            component={ConfigurationSettingDetailPage}
          />
          <Route path="/new" component={ConfigurationSettingNewPage} />
        </Switch>
      </div>
    );
  }
}
