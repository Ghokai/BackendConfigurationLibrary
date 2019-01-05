import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../state/actions";
import ConfigurationSettingForm from "../components/ConfigurationSettingForm";

class ConfigurationSettingDetailPage extends Component {
  constructor(props) {
    super(props);

    const id = this.props.match.params.id;
    this.props.loadSelectedSetting(id);
  }

  deleteItem = () => {
    const id = this.props.match.params.id;
    const history = this.props.history;
    this.props.deleteConfigurationSetting(id, history);
  };

  updateItem = item => {
    const id = this.props.match.params.id;
    const history = this.props.history;
    this.props.updateConfigurationSetting(id, item, history);
  };

  render() {
    const { selectedItem, status } = this.props;
    if (selectedItem == null) {
      return null;
    }

    return (
      <div>
        <p className="h6">
          <u>Configuration Setting Detail</u>
        </p>
        <ConfigurationSettingForm
          status={status}
          item={selectedItem}
          onDeleteItem={this.deleteItem}
          onUpdateItem={this.updateItem}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    configurationSettings: { selectedItem, status }
  } = state;

  return {
    selectedItem,
    status
  };
};

export default connect(
  mapStateToProps,
  actions
)(ConfigurationSettingDetailPage);
