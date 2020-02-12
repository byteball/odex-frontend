// @flow

import type { AccountBalance, AccountBalances } from './accountBalances';
import type { TokenPairs, Tokens, TokenRates } from './tokens'
import type { Tx } from './transactions'

export type UpdateWalletPageDataAction = {
  type: 'walletPage/UPDATE_WALLET_PAGE_DATA',
  payload: {  tokens: Tokens, pairs: TokenPairs, exchangeAddress: string, operatorAddress: string, transactions:  Array<Tx>}
}

export type UpdateAccountBalanceAction = {
  type: 'walletPage/UPDATE_BALANCE',
  payload: AccountBalance,
};

export type UnsubscribeAccountBalanceAction = {
  type: 'walletPage/UNSUBSCRIBE_BALANCE',
  payload: { symbol: string },
};

export type UpdateAccountBalancesAction = {
  type: 'walletPage/UPDATE_BALANCES',
  payload: { balances: AccountBalances },
};

export type UpdateCurrentPairAction = {
  type: 'walletPage/UPDATE_CURRENT_PAIR',
  payload: { pair: string },
};

export type ClearAccountBalancesAction = {
  type: 'walletPage/CLEAR_BALANCES',
};

export type WalletPageActions =
  | UpdateCurrentPairAction
  | UpdateAccountBalanceAction
  | UpdateAccountBalancesAction
  | UnsubscribeAccountBalanceAction
  | UpdateWalletPageDataAction
