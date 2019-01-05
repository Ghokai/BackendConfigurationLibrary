import {
  CONFIGURATION_SETTINGS_SUCCESS,
  SELECTED_SETTING_SUCCESS,
  REQUEST_WAITING,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SET_LAST_MESSAGE
} from "../actions/types";

export default (
  state = {
    status: null,
    operationMessage: "",
    configurationSettingList: [],
    selectedItem: null,
    lastSuccessMessage: ""
  },
  action
) => {
  switch (action.type) {
    case REQUEST_WAITING:
      return {
        ...state,
        selectedItem: null,
        configurationSettingList: [],
        status: 0,
        operationMessage: action.payload
      };
    case REQUEST_ERROR:
      return { ...state, status: -1, operationMessage: action.payload };
    case REQUEST_SUCCESS:
      return {
        ...state,
        status: 1,
        operationMessage: action.payload,
        lastSuccessMessage: action.payload
      };
    case CONFIGURATION_SETTINGS_SUCCESS:
      return {
        ...state,
        configurationSettingList: action.payload,
        status: 1,
        operationMessage: ""
      };
    case SELECTED_SETTING_SUCCESS:
      return {
        ...state,
        selectedItem: action.payload,
        status: 1,
        operationMessage: ""
      };
    case SET_LAST_MESSAGE:
      return {
        ...state,
        lastSuccessMessage: action.payload
      };
    default:
      return state;
  }
};
