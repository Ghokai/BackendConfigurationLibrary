import axios from "axios";

import {
  CONFIGURATION_SETTINGS_SUCCESS,
  SELECTED_SETTING_SUCCESS,
  REQUEST_WAITING,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SET_LAST_MESSAGE
} from "../actions/types";

import { BACKEND_URI } from "../../backendUri";

export const setLastMessage = msg => {
  return {
    type: SET_LAST_MESSAGE,
    payload: msg
  };
};

export const loadSelectedSetting = id => {
  return async dispatch => {
    dispatch({
      type: REQUEST_WAITING,
      payload: "Selected Setting is fetching..."
    });

    try {
      const response = await axios.get(
        BACKEND_URI + "/api/configurationsettings/" + id
      );

      dispatch({
        type: SELECTED_SETTING_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: REQUEST_ERROR,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const loadConfigurationSettings = () => {
  return async dispatch => {
    dispatch({
      type: REQUEST_WAITING,
      payload: "Configuration Setting are loading..."
    });

    try {
      const response = await axios.get(
        BACKEND_URI + "/api/configurationsettings"
      );

      dispatch({
        type: CONFIGURATION_SETTINGS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: REQUEST_ERROR,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const deleteConfigurationSetting = (id, history) => {
  return async dispatch => {
    dispatch({
      type: REQUEST_WAITING,
      payload: "Configuration Setting is deleting..."
    });

    try {
      await axios.delete(BACKEND_URI + "/api/configurationsettings/" + id);
      dispatch({
        type: REQUEST_SUCCESS,
        payload: "Delete operation is successfully completed"
      });
      history.push("/list");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: REQUEST_ERROR,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const updateConfigurationSetting = (id, item, history) => {
  return async dispatch => {
    dispatch({
      type: REQUEST_WAITING,
      payload: "Configuration Setting is updating..."
    });

    try {
      await axios.put(BACKEND_URI + "/api/configurationsettings/" + id, item);
      dispatch({
        type: REQUEST_SUCCESS,
        payload: "Update operation is successfully completed"
      });
      history.push("/list");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: REQUEST_ERROR,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const addConfigurationSetting = (history, item) => {
  return async dispatch => {
    dispatch({
      type: REQUEST_WAITING,
      payload: "Configuration Setting is adding..."
    });

    try {
      await axios.post(BACKEND_URI + "/api/configurationsettings/", item);
      dispatch({
        type: REQUEST_SUCCESS,
        payload: "New configuration setting is successfully added"
      });

      history.push("/list");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: REQUEST_ERROR,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};
