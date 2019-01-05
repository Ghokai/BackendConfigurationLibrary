import React from "react";
import { connect } from "react-redux";

const OperationMessage = ({ status, operationMessage, lastSuccessMessage }) => {
  if (operationMessage.length === 0 && lastSuccessMessage.length === 0) {
    return null;
  }

  if (
    operationMessage.length === 0 &&
    lastSuccessMessage.length > 0 &&
    status === 1
  ) {
    return (
      <div className="row gapbelow">
        <div className="col-lg-12">
          <div className="alert alert-success">
            <p className="nmb">
              <span className="oi mr5 oi-check" />
              <span>{lastSuccessMessage}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row gapbelow">
      <div className="col-lg-12">
        <div
          className={
            " alert " +
            (status === 0 ? "alert-warning " : " ") +
            (status === -1 ? "alert-danger " : " ") +
            (status === 1 ? "alert-success " : " ")
          }
        >
          <p className="nmb">
            <span
              className={
                " oi mr5 " +
                (status === 0 ? "oi-clock " : " ") +
                (status === -1 ? "oi-x " : " ") +
                (status === 1 ? "oi-check" : " ")
              }
            />
            <span>{operationMessage}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    configurationSettings: { status, operationMessage, lastSuccessMessage }
  } = state;

  return {
    status,
    operationMessage,
    lastSuccessMessage
  };
};

export default connect(mapStateToProps)(OperationMessage);
