import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../state/actions";
import ConfigurationSettingList from "../components/ConfigurationSettingList";

class ConfigurationSettingListPage extends Component {
  constructor(props) {
    super(props);

    this.props.loadConfigurationSettings();
  }

  navigateToDetail = id => {
    this.props.setLastMessage("");
    this.props.history.push("/detail/" + id);
  };

  render() {
    const { configurationSettingList, status } = this.props;
    if (
      status === 0 &&
      (configurationSettingList == null ||
        configurationSettingList.length === 0)
    ) {
      return null;
    }

    if (status !== 0 && configurationSettingList.length === 0) {
      return <p>There is no configuration parameter exist!</p>;
    }

    return (
      <div>
        <p className="h6">
          <u>Configuration Setting List</u>
        </p>
        <ConfigurationSettingList
          configurationSettingItems={configurationSettingList}
          navigateToDetail={this.navigateToDetail}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { configurationSettings } = state;

  return {
    ...configurationSettings
  };
};

export default connect(
  mapStateToProps,
  actions
)(ConfigurationSettingListPage);
