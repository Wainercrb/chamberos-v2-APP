export const CONSTANTS = {
  // CONFIG
  LOCAL_STORAGE_KEY: "user",
  PASS_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,

  // STYLES
  LOADING_COLOR: "#00ff00",

  YUP: {
    USER: {
      FULL_NAME: {
        REQUIRED: "FullName is required",
      },
      USERNAME: {
        REQUIRED: "Username is required",
      },
      PASSWORD: {
        REQUIRED: "Password is required",
        MATCHED:
          "Password must contain at least one uppercase letter, one lowercase letter and one number",
      },
      EMAIL: {
        REQUIRED: "Email is required",
        FORMAT: "Invalid format",
      },
      PROFESSIONS: {
        MIN_1: "Please select min 1 profession",
      },
      ROLES: {
        MIN_1: "Please select min 1 role",
      },
      IS_ACTIVE: {
        REQUIRED: "Is Active is required",
      },
      LOCATION: {
        REQUIRED: "Location is required",
        X: {
          REQUIRED: "Location X is required",
        },
        Y: {
          REQUIRED: "Location Y is required",
        },
      },
    },
    PROFESSIONS: {
      REQUIRED: "Professions are required",
      NAME: {
        REQUIRED: "Profession Name is required",
      },
      DESCRIPTION: {
        REQUIRED: "Profession Role is required",
      },
    },
    ROLES: {
      REQUIRED: "Roles are required",
      NAME: {
        REQUIRED: "Role Name is required",
      },
      DESCRIPTION: {
        REQUIRED: "Role Description is required",
      },
    },
  },

  SCREENS: {
    SIGN_UP: {
      TITLE: "Register",
      LOADING_LOCATION_FEEDBACK:
        "Please wait, we are loading your current location",
      USER_NOT_FOUND: "User not found",
      BUTTON_SIGN_UP: "Register",
      BUTTON_LOG_OUT: "Log out",
    },
    SIGN_IN: {
      TITLE: "Log in",
      BUTTON_SIGN_IN: "Log in",
      BUTTON_GO_TO_SIGN_UP: "Register",
    },
    MAP: {
      TITLE: "Map view",
    },
    MAP_USER_DETAILS: {
      TITLE: "User Details",
      ERROR_GETTING_THE_USER_PROP: "Error loading the user :(",
    },
    SIGN_IN_USER_PROFILE: {
      TITLE: "My profile",
    },
  },

  COMPONENTS: {
    PROFESSIONAL_MODAL: {
      INPUT_LABEL: "Search by profession",
    },
    LOADING_BUTTON: {
      TEXT: "Loading",
    },
    ERROR_FEEDBACK: {
      ERROR_TITLE: "Error executing you requests!",
    },
  },

  ALERTS: {
    SUCCESS: {
      TITLE: "Successfully",
      DESCRIPTION: "Operation was executed correctly",
      BUTTON_OK: "ok",
    },
  },
};
