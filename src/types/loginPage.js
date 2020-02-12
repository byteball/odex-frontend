//@flow
export type LoginPageState = {
  +loading: boolean,
  +error: string,
};


export type LoginPageEvent = any => LoginPageState => LoginPageState;

export type loginWithAppAction = {
  type: 'loginPage/LOGIN_WITH_APP',
  payload: { address: string },
};

export type LoginErrorAction = {
  type: 'loginPage/LOGIN_ERROR',
  payload: { error: string },
};

export type RequestLoginAction = {
  type: 'loginPage/REQUEST_LOGIN',
};

export type LoginPageAction =
  | LoginErrorAction
  | RequestLoginAction
  | loginWithAppAction
