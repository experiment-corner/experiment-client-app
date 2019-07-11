import actions from './actions';

const login = (email, password) => (dispatch) => {
  dispatch(actions.login(email, password))
    .then((response) => {
      console.log(response);
    });
};

export default {
  login,
};
