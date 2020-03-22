import * as actionCreators from '../actions/layout'
import * as balanceActionCreators from '../actions/accountBalances';
import * as notifierActionCreators from '../actions/app'

import {
  getTokenDomain,
  getAccountDomain,
  getAccountBalancesDomain
 } from '../domains'

import { fiatCurrencies, pricedTokens } from '../../config'

export default function createSelector(state) {
  let { authenticated, address, referenceCurrency } = getAccountDomain(state)
  let accountBalancesDomain = getAccountBalancesDomain(state)

  let GBYTEBalance = accountBalancesDomain.gbyteBalance()
  let accountLoading = !(GBYTEBalance)
  let location = state.router.location.pathname

  let referenceCurrencies = fiatCurrencies.map((currency, i) => {
    return {
      rank: i,
      name: currency.name,
      symbol: currency.symbol
    }
  })

  let currentReferenceCurrency = referenceCurrencies.filter(currency => currency.name === referenceCurrency.name)[0]

  return {
    GBYTEBalance,
    authenticated,
    address,
    accountLoading,
    currentReferenceCurrency,
    referenceCurrencies,
    location
  };
}


export function queryAppData(): ThunkAction {
  return async (dispatch, getState, { api, provider }) => {
    const state = getState();
    let { address } = getAccountDomain(state)
    const tokensBySymbol = getTokenDomain(state).bySymbol()
    try {    
    let [ assocBalances, tokens, pairs ] = await Promise.all([
      address ? api.getBalances(address) : {},
      api.getTokens(),
      api.fetchPairs()
    ])

    let tokenSymbols = pricedTokens
    let currencySymbols = ['USD', 'EUR', 'JPY']
    let exchangeRates = await api.fetchExchangeRates(tokenSymbols, currencySymbols)

    tokens = tokens.map(token => {
      return {
        ...token,
        USDRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].USD : 0,
        EURRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].EUR : 0,
        JPYRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].JPY : 0,
      }
    })

    let balances = []
    for (var symbol in assocBalances)
      if (tokensBySymbol[symbol])
        balances.push({balance: assocBalances[symbol] / Math.pow(10, tokensBySymbol[symbol].decimals), symbol});

    dispatch(balanceActionCreators.updateBalances(balances));
    dispatch(actionCreators.updateAppData(tokens, pairs))
  } catch (e) {
    console.log(e)
    dispatch(notifierActionCreators.addErrorNotification({ message: e.message }))
  }
}
}
