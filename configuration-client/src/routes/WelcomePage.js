import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class WelcomePage extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Configuration Settings Client</h1>
        <p className="lead">
          You can find both of frontend (React & Redux) SPA app and backend
          (Asp.Net Core 2.0) applications source codes on my github account:
          <a
            href="https://github.com/ghokai"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/ghokai
          </a>
        </p>
        <hr className="my-4" />
        <p>
          It is just a configuration manager client, which user can do crud
          operations on various applications configuration settings by using
          configuration server api.
        </p>
        <p>
          Operations of configuration settings are performed on database. (In
          this application we using mongo db but we can easily support other
          databases and structures too).
        </p>
        <p>
          Configuration settings are periodically fetched from database and
          published on rabbitmq with routing according to configuration setting
          appname by using configuration manager publisher.
        </p>
        <p>
          Published configuration settings are consumed by configuration manager
          listener which is used by other applications for accessing their
          configuration settings using their application names.
        </p>
        <Link className="btn btn-primary btn-lg" to="/list" role="button">
          Navigate to Configuration Setting List
        </Link>
      </div>
    );
  }
}
