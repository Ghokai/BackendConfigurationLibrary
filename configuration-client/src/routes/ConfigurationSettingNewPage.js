import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../state/actions";
import ConfigurationSettingForm from "../components/ConfigurationSettingForm";

class ConfigurationSettingNewPage extends Component {
  addItem = item => {
    const history = this.props.history;
    this.props.addConfigurationSetting(history, item);
  };

  render() {
    return (
      <div>
        <p className="h6">
          <u>New Configuration Setting </u>
        </p>
        <ConfigurationSettingForm
          status={this.props.status}
          item={null}
          onAddItem={this.addItem}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    configurationSettings: { status }
  } = state;

  return {
    status
  };
};

export default connect(
  mapStateToProps,
  actions
)(ConfigurationSettingNewPage);
