import { AccountBalance, AccountBalances } from './accountBalances';

export type DepositFormState = {
  +step: 'waiting' | 'convert' | 'confirm',
};

export type DepositAction = {
  type: 'depositForm/DEPOSIT',
};

export type ConfirmAction = {
  type: 'depositForm/CONFIRM',
};
export type SubscribeBalanceAction = {
  type: 'depositForm/SUBSCRIBE_BALANCE',
  payload: { symbol: string },
};

export type UpdateBalanceAction = {
  type: 'depositForm/UPDATE_BALANCE',
  payload: AccountBalance,
};

export type UnsubscribeBalanceAction = {
  type: 'depositForm/UNSUBSCRIBE_BALANCE',
  payload: { symbol: string },
};

export type UpdateBalancesAction = {
  type: 'depositForm/UPDATE_BALANCES',
  payload: { balances: AccountBalances },
};

export type DepositFormEvent = any => DepositFormState => DepositFormState;

export type DepositFormAction =
  | DepositAction
  | ConfirmAction
