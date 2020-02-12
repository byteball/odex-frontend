//@flow
import type {
  LoginErrorAction,
  loginWithAppAction,
  RequestLoginAction,
} from '../../types/loginPage';

const actionTypes = {
  requestLogin: 'loginPage/REQUEST_LOGIN',
  loginWithApp: 'loginPage/LOGIN_WITH_APP',
  loginError: 'loginPage/LOGIN_ERROR',
};


export function loginWithApp(address: string): loginWithAppAction {
  return {
    type: actionTypes.loginWithApp,
    payload: { address },
  };
}



export function loginError(error: string): LoginErrorAction {
  return {
    type: actionTypes.loginError,
    payload: { error },
  };
}

export function requestLogin(): RequestLoginAction {
  return {
    type: actionTypes.requestLogin,
  };
}

export default actionTypes;
