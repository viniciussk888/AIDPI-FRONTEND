const INITIAL_STATE = {
  token: '',
  id: '',
  username: '',
  name: '',
  office: '',
  serviceStation: '',
  aidpi: '',
  admin: '',
  active: '',
  auth: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        token: action.token,
        id: action.id,
        username: action.username,
        name: action.name,
        office: action.office,
        serviceStation: action.serviceStation,
        aidpi: action.aidpi,
        admin: action.admin,
        active: action.active,
        auth: 1
      };
    case 'LOG_OUT':
      return {
        ...state,
        token: null,
        id: null,
        username: null,
        name: null,
        office: null,
        serviceStation: null,
        aidpi: null,
        admin: null,
        active: null,
        auth: 0
      };
    default:
      return state;
  }
}

export default userReducer;