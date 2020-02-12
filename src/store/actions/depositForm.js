//@flow
import type {
  ConfirmAction,
  DepositAction,
  SubscribeBalanceAction,
  UnsubscribeBalanceAction,
  UpdateBalanceAction,
  UpdateBalancesAction,
} from '../../types/depositForm';

import type { AccountBalances } from '../../types/accountBalances';

const actionTypes = {
  deposit: 'depositForm/DEPOSIT',
  confirm: 'depositForm/CONFIRM',
  subscribeBalance: 'depositForm/SUBSCRIBE_BALANCE',
  updateBalance: 'depositForm/UPDATE_BALANCE',
  updateBalances: 'depositForm/UPDATE_BALANCES',
  unsubscribeBalance: 'depositForm/UNSUBSCRIBE_BALANCE',
};

export function deposit(): DepositAction {
  return {
    type: actionTypes.deposit,
  };
}

export function confirm(): ConfirmAction {
  return {
    type: actionTypes.confirm,
  };
}



export function subscribeBalance(symbol: string): SubscribeBalanceAction {
  return {
    type: actionTypes.subscribeBalance,
    payload: { symbol },
  };
}

export function updateBalance(symbol: string, balance: number): UpdateBalanceAction {
  return {
    type: actionTypes.updateBalance,
    payload: { symbol, balance },
  };
}

export function updateBalances(balances: AccountBalances): UpdateBalancesAction {
  return {
    type: actionTypes.updateBalances,
    payload: { balances },
  };
}


export function unsubscribeBalance(symbol: string): UnsubscribeBalanceAction {
  return {
    type: actionTypes.unsubscribeBalance,
    payload: { symbol },
  };
}

export default actionTypes;
