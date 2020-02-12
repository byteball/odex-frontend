// @flow
import type {
  UpdateAccountBalancesAction,
  UpdateAccountBalanceAction,
  UpdateCurrentPairAction,
  UpdateWalletPageDataAction,
} from '../../types/walletPage';

import type { AccountBalances, AccountBalance } from '../../types/accountBalances';
import type { TokenPairs, Tokens, TokenRates } from '../../types/tokens'
import type { Tx } from '../../types/transactions'

const actionTypes = {
  updateBalance: 'walletPage/UPDATE_BALANCE',
  updateBalances: 'walletPage/UPDATE_BALANCES',
  updateCurrentPair: 'walletPage/UPDATE_CURRENT_PAIR',
  updateShowHelpModal: 'walletPage/UPDATE_SHOW_HELP_MODAL',
  updateWalletPageData: 'walletPage/UPDATE_WALLET_PAGE_DATA',
};

export function updateWalletPageData(tokens: Tokens, pairs: TokenPairs, exchangeAddress: string, operatorAddress: string, transactions: Array<Tx>): UpdateWalletPageDataAction {
  return {
    type: actionTypes.updateWalletPageData,
    payload: { tokens, pairs, exchangeAddress, operatorAddress, transactions }
  }
}

export function updateBalances(balances: AccountBalances): UpdateAccountBalancesAction {
  return {
    type: actionTypes.updateBalances,
    payload: { balances },
  };
}

export function updateBalance(balance: AccountBalance): UpdateAccountBalanceAction {
  return {
    type: actionTypes.updateBalance,
    payload: balance,
  };
}


export function updateCurrentPair(pair: string): UpdateCurrentPairAction {
  return {
    type: actionTypes.updateCurrentPair,
    payload: { pair },
  };
}

export function closeHelpModal(showHelpModal: boolean) {
  return {
    type: actionTypes.updateShowHelpModal,
    payload: { showHelpModal: showHelpModal }
  }
}

export default actionTypes;
