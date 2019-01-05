import { combineReducers } from "redux";
import configurationSettingsReducer from "./configurationSettingsReducer";

export default combineReducers({
  configurationSettings: configurationSettingsReducer
});
