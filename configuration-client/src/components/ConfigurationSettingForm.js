import React, { Component } from "react";
import Select from "react-select";

import { isInteger, isDouble, isBoolean } from "../helpers/validationHelper";

const typeOptions = [
  { value: "", label: "..." },
  { value: "Int", label: "Int" },
  { value: "String", label: "String" },
  { value: "Boolean", label: "Boolean" },
  { value: "Double", label: "Double" }
];

const isActiveOptions = [
  { value: -1, label: "..." },
  { value: 1, label: "Yes" },
  { value: 0, label: "No" }
];

export default class ConfigurationSettingForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.item) {
      this.state = {
        item: this.props.item,
        errorMsgs: {
          applicationNameErrMsg: "",
          isActiveErrMsg: "",
          nameErrMsg: "",
          typeErrMsg: "",
          valueErrMsg: ""
        },
        editMode: true
      };
    } else {
      this.state = {
        item: {
          applicationName: "",
          configurationSettingId: 0,
          id: "",
          isActive: 1,
          name: "",
          type: "",
          value: ""
        },
        errorMsgs: {
          applicationNameErrMsg: "",
          isActiveErrMsg: "",
          nameErrMsg: "",
          typeErrMsg: "",
          valueErrMsg: ""
        },
        editMode: false
      };
    }
  }

  handleChange = e => {
    const prevItem = this.state.item;
    const {
      target: { name, value }
    } = e;

    this.setState({
      item: {
        ...prevItem,
        [name]: value
      }
    });
  };

  handleTypeChange = selectedObj => {
    const prevItem = this.state.item;

    this.setState({
      item: {
        ...prevItem,
        type: selectedObj.value
      }
    });
  };

  handleIsActiveChange = selectedObj => {
    const prevItem = this.state.item;

    this.setState({
      item: {
        ...prevItem,
        isActive: selectedObj.value
      }
    });
  };

  onDeleteItem = e => {
    e.preventDefault();

    this.props.onDeleteItem();
  };

  onUpdateItem = e => {
    e.preventDefault();
    if (this.validateItem() === false) {
      return;
    }
    this.props.onUpdateItem(this.state.item);
  };

  onAddItem = e => {
    e.preventDefault();
    if (this.validateItem() === false) {
      return;
    }
    this.props.onAddItem(this.state.item);
  };

  validateItem = () => {
    const { applicationName, isActive, name, type, value } = this.state.item;
    let applicationNameErrMsg = "";
    let isActiveErrMsg = "";
    let nameErrMsg = "";
    let typeErrMsg = "";
    let valueErrMsg = "";

    let isValid = true;

    if (applicationName.length === 0) {
      applicationNameErrMsg =
        "Please enter configuration setting application name";
      isValid = false;
    }

    if (isActive === -1) {
      isActiveErrMsg = "Please choose configuration setting is active status";
      isValid = false;
    }

    if (name.length === 0) {
      nameErrMsg = "Please enter configuration setting name";
      isValid = false;
    }

    if (type.length === 0) {
      typeErrMsg = "Please choose configuration setting type";
      isValid = false;
    }

    if (value.length === 0) {
      valueErrMsg = "Please enter configuration setting value";
      isValid = false;
    }

    if (typeErrMsg === "" && valueErrMsg === "") {
      if (type === "String") {
      } else if (type === "Int") {
        if (!isInteger(value)) {
          valueErrMsg =
            "Please choose configuration setting value as correct integer";
          isValid = false;
        }
      } else if (type === "Boolean") {
        if (!isBoolean(value)) {
          valueErrMsg =
            "Please choose configuration setting value as correct boolean (True or False)";
          isValid = false;
        }
      } else if (type === "Double") {
        if (!isDouble(value)) {
          valueErrMsg =
            "Please choose configuration setting value as correct double";
          isValid = false;
        }
      } else {
        typeErrMsg = "Please choose configuration setting type correctly";
        isValid = false;
      }
    }

    this.setState({
      errorMsgs: {
        applicationNameErrMsg,
        isActiveErrMsg,
        nameErrMsg,
        typeErrMsg,
        valueErrMsg
      }
    });

    return isValid;
  };

  renderFormButtons = () => {
    if (this.props.status === 0) {
      return null;
    }

    if (this.props.item) {
      return (
        <button
          onClick={this.onUpdateItem}
          className="formbutton btn btn-success"
        >
          Update
        </button>
      );
    }

    return (
      <button onClick={this.onAddItem} className="formbutton btn btn-primary">
        Add
      </button>
    );
  };

  render() {
    const {
      item: {
        applicationName,
        configurationSettingId,
        id,
        isActive,
        name,
        type,
        value
      },
      errorMsgs: {
        applicationNameErrMsg,
        isActiveErrMsg,
        nameErrMsg,
        typeErrMsg,
        valueErrMsg
      },
      editMode
    } = this.state;
   
    const selectedTypeObject = typeOptions.find(x => x.value === type);
    const selectedIsActiveObject = isActiveOptions.find(
      x => x.value === isActive
    );

    return (
      <form>
        <div className="form-group">
          <label>Record Id</label>
          <input disabled className="form-control" type="text" value={id} />
        </div>
        <div className="form-group">
          <label>Configuration Setting Id</label>
          <input
            disabled
            className="form-control"
            type="text"
            value={configurationSettingId}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            type="text"
            value={name}
            onChange={e => this.handleChange(e)}
            disabled={editMode}
          />
          {nameErrMsg.length > 0 && (
            <span className="errorMsgStyle">
              <i>{nameErrMsg}</i>
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Type</label>
          <Select
            value={selectedTypeObject}
            onChange={value => this.handleTypeChange(value)}
            options={typeOptions}
            placeholder="<Select Type>"
          />
          {typeErrMsg.length > 0 && (
            <span className="errorMsgStyle">{typeErrMsg}</span>
          )}
        </div>
        <div className="form-group">
          <label>Value</label>
          <input
            className="form-control"
            name="value"
            type="text"
            value={value}
            onChange={e => this.handleChange(e)}
          />
          {valueErrMsg.length > 0 && (
            <span className="errorMsgStyle">{valueErrMsg}</span>
          )}
        </div>
        <div className="form-group">
          <label>Is Active</label>
          <Select
            value={selectedIsActiveObject}
            onChange={value => this.handleIsActiveChange(value)}
            options={isActiveOptions}
            placeholder="<Select is active>"
          />
          {isActiveErrMsg.length > 0 && (
            <span className="errorMsgStyle">{isActiveErrMsg}</span>
          )}
        </div>
        <div className="form-group">
          <label>Application Name</label>
          <input
            className="form-control"
            name="applicationName"
            type="text"
            value={applicationName}
            onChange={e => this.handleChange(e)}
            disabled={editMode}
          />
          {applicationNameErrMsg.length > 0 && (
            <span className="errorMsgStyle">{applicationNameErrMsg}</span>
          )}
        </div>

        <div className="form-group">{this.renderFormButtons()}</div>
      </form>
    );
  }
}
