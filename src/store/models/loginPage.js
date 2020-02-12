// @flow
import * as actionCreators from '../actions/loginPage'
import * as notifierActionCreators from '../actions/app'
import { getAccountDomain, getLoginPageDomain } from '../domains'

import type { State, ThunkAction } from '../../types'

export default function loginPageSelector(state: State) {
  let { authenticated, sessionId } = getAccountDomain(state)
  let { loading, error } = getLoginPageDomain(state)

  return {
    authenticated,
    sessionId,
    loading,
    error,
  };
}


export function loginWithApp(): ThunkAction {
  return async (dispatch, getState, { socket, mixpanel }) => {
    mixpanel.track('login-page/login-with-app');

    try {
      dispatch(actionCreators.requestLogin());

      let state = getState();
      let { sessionId } = getAccountDomain(state);
      socket.subscribeLogin(sessionId);
      //dispatch(actionCreators.loginWithApp(address));
      //dispatch(notifierActionCreators.addSuccessNotification({ message: 'Signed in with app' }));
    } catch (e) {
      dispatch(notifierActionCreators.addNotification({ message: 'Login error ' }));
      dispatch(actionCreators.loginError(e.message));
    }
  };
}


