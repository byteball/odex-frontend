// @flow
import {
  getAccountBalancesDomain,
  getAccountDomain,
  getDepositFormDomain,
  getTokenDomain,
} from '../domains';

import * as actionCreators from '../actions/accountBalances';

import type { State, ThunkAction } from '../../types';

export default function depositFormSelector(state: State) {
  let accountDomain = getAccountDomain(state);
  let tokenDomain = getTokenDomain(state);
  let accountBalancesDomain = getAccountBalancesDomain(state);
  let depositFormDomain = getDepositFormDomain(state);

  return {
    accountAddress: () => accountDomain.address,
    exchangeAddress: () => accountDomain.exchangeAddress,
    tokens: () => tokenDomain.tokens(),
    rankedTokens: () => tokenDomain.rankedTokens(),
    symbols: () => tokenDomain.symbols(),
    tokenIsSubscribed: (symbol: string) => accountBalancesDomain.isSubscribed(symbol),
    balances: () => accountBalancesDomain.formattedBalances(),
    getStep: () => depositFormDomain.getStep(),
  };
}

export function queryBalances(): ThunkAction {
  return async (dispatch, getState, { api, provider }) => {
    try {
      const state = getState();
      const accountAddress = depositFormSelector(state).accountAddress();
      let tokens = depositFormSelector(state).tokens();
      const tokensBySymbol = getTokenDomain(state).bySymbol()
      
      if (!accountAddress) throw new Error('Account address is not set');
      let assocBalances = await api.getBalances(accountAddress)
      let balances = []
      for (var symbol in assocBalances)
        balances.push({balance: assocBalances[symbol] / Math.pow(10, tokensBySymbol[symbol].decimals), symbol});
      dispatch(actionCreators.updateBalances(balances));
    } catch (error) {
      console.log('queryBalances', error.message);
    }
  };
}
