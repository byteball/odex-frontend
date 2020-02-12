// @flow
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import type { AccountBalancesAction, AccountBalancesEvent, AccountBalancesState } from './accountBalances';
import type { OHLCVState } from './ohlcv';
import type { OrderBookState } from './orderBook';
//import type { TradeHistoryState } from './tradeHistory';
import type { OrderHistoryState } from './orderHistory';
import type { OrderFormState } from './orderForm';
import type { TokenState, TokenPairState, TokenEvent, TokenPairEvent } from './tokens';
import type { AccountState, AccountAction, AccountEvent } from './account';
import type { LoginPageState, LoginPageAction, LoginPageEvent } from './loginPage';
import type { LogoutPageAction } from './logoutPage';
import type { DepositFormAction, DepositFormEvent, DepositFormState } from './depositForm';
import type { SettingsAction, SettingsEvent, SettingsState } from './settings';
import type { NotificationState } from './notifications';

export type ReduxInitAction = { type: '@@INIT' };

export type Action =
  | ReduxInitAction
  | AccountBalancesAction
  | AccountAction
  | DepositFormAction
  | SettingsAction
  | LoginPageAction
  | LogoutPageAction

export type Event =
  | LoginPageEvent
  | TokenEvent
  | TokenPairEvent
  | AccountBalancesEvent
  | AccountEvent
  | DepositFormEvent
  | SettingsEvent

export type ActionHandler = Action => Event;

export type State = {
  loginPage: LoginPageState,
  accountBalances: AccountBalancesState,
  ohlcv: OHLCVState,
  orderBook: OrderBookState,
  //tradeHistory: TradeHistoryState,
  orderHistory: OrderHistoryState,
  orderForm: OrderFormState,
  tokens: TokenState,
  tokenPairs: TokenPairState,
  account: AccountState,
  depositForm: DepositFormState,
  settings: SettingsState,
  notifications: NotificationState,
};

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ExtraArgument = { socket: Object } & { api: Object } & { trading: Object } & { mixpanel: Object } & { provider: Object } & { txProvider: Object };
export type ThunkAction = (dispatch: Dispatch, getState: GetState, ExtraArgument) => any;
// export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
