import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../state/actions";

class Header extends Component {
  navigateToPage = path => {
    this.props.setLastMessage("");
    this.props.history.push(path);
  };

  render() {
    return (
      <nav className=" gapbelow navbar navbar-expand-lg navbar-light bg-light">
        <span
          className="navbar-brand linkspan"
          onClick={() => this.navigateToPage("/")}
        >
          <span>Configuration Settings Client</span>
        </span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li
              className="nav-item linkspan"
              onClick={() => this.navigateToPage("/list")}
            >
              <span className="nav-link">Configuration Setting List</span>
            </li>
            <li
              className="nav-item "
              onClick={() => this.navigateToPage("/new")}
            >
              <span className="nav-link linkspan">
                New Configuration Setting
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(Header)
);