// @flow
import { push } from 'connected-react-router'
import * as actionCreators from '../actions/walletPage'
import * as notifierActionCreators from '../actions/app'

import { 
  getAccountBalancesDomain, 
  getAccountDomain, 
  getTokenDomain,
} from '../domains'

//import { quoteTokens } from '../../config/quotes'
import { parseQueryAccountDataError } from '../../config/errors'
import { pricedTokens } from '../../config'
import { EXCHANGE_ADDRESS } from '../../config/environment.js'

import type { State, ThunkAction } from '../../types'

export default function walletPageSelector(state: State) {
  let accountBalancesDomain = getAccountBalancesDomain(state)
  let tokenDomain = getTokenDomain(state)
  let { authenticated, showHelpModal, referenceCurrency } = getAccountDomain(state)

  let tokens = tokenDomain.tokens()
  let quoteTokens = tokenDomain.quoteTokens()
  let baseTokens = tokenDomain.baseTokens()
  let tokenData = accountBalancesDomain.getBalances(tokens, referenceCurrency)

  return {
    balancesLoading: accountBalancesDomain.loading(),
    tokenData: tokenData,
    quoteTokens: quoteTokens,
    baseTokens: baseTokens,
    authenticated: authenticated,
    showHelpModal: showHelpModal,
    connected: true,
    referenceCurrency: referenceCurrency.symbol,
  }
}

export function queryAccountData(): ThunkAction {
  return async (dispatch, getState, { api, provider }) => {
    const state = getState()
    const { address: accountAddress } = getAccountDomain(state)
    const savedTokens = getTokenDomain(state).tokens()
    const tokensBySymbol = getTokenDomain(state).bySymbol()


    let balances = []

    try {
      let [
        tokens,
        pairs,
        //exchangeAddress,
        operatorAddress,
        assocBalances,
        //txs
      ] = await Promise.all([
        api.getTokens(),
        api.fetchPairs(),
        //api.getExchangeAddress(),
        api.getOperatorAddress(),
        api.getBalances(accountAddress),
        //provider.queryTransactionHistory(accountAddress)
      ])
      let exchangeAddress = EXCHANGE_ADDRESS;
      let txs = [];

      tokens = [ ...new Set([ ...savedTokens, ...tokens ])]
      // let tokenSymbols = tokens.map(token => token.symbol)
    
      let tokenSymbols = pricedTokens
      let currencySymbols = ['USD', 'EUR', 'JPY']
      let exchangeRates = await api.fetchExchangeRates(tokenSymbols, currencySymbols)

      tokens = tokens.map(token => {
        let symbol = token.symbol.replace(/_.*$/, '') // strip the expiry date if any
        return {
          ...token,
          USDRate: exchangeRates[symbol] ? exchangeRates[symbol].USD : 0,
          EURRate: exchangeRates[symbol] ? exchangeRates[symbol].EUR : 0,
          JPYRate: exchangeRates[symbol] ? exchangeRates[symbol].JPY : 0,
        }
      })

      dispatch(actionCreators.updateWalletPageData(tokens, pairs, exchangeAddress, operatorAddress, txs))

      for (var symbol in assocBalances)
        if (tokensBySymbol[symbol])
          balances.push({balance: assocBalances[symbol] / Math.pow(10, tokensBySymbol[symbol].decimals), symbol});
      
      // TODO handle unsubscriptions
      /*
      provider.subscribeTokenBalances(accountAddress, tokens, balance =>
        dispatch(actionCreators.updateBalance(balance)))
      */

    } catch (e) {
      console.log(e)
      let message = parseQueryAccountDataError(e)
      dispatch(notifierActionCreators.addErrorNotification({ message }))
    } finally {
      dispatch(actionCreators.updateBalances(balances))
    }
  }
}

export function redirectToTradingPage(symbol: string): ThunkAction {
  return async (dispatch, getState, { mixpanel }) => {
    mixpanel.track('wallet-page/redirect-to-trading-page')

    const state = getState()
    const quoteTokens = getTokenDomain(state).quoteTokens()
    quoteTokens.sort((t1, t2) => t2.rank - t1.rank)
    let quoteTokenSymbols = quoteTokens.map(token => token.symbol)
    let quoteTokenIndex = quoteTokenSymbols.indexOf(symbol)
    let baseTokenSymbol, quoteTokenSymbol

    if (quoteTokenIndex === 0) {
      quoteTokenSymbol = quoteTokens[1].symbol
      baseTokenSymbol = quoteTokens[0].symbol
    } else {
      quoteTokenSymbol = quoteTokens[0].symbol
      baseTokenSymbol = symbol      
    }

    let pair = `${baseTokenSymbol}/${quoteTokenSymbol}`

    dispatch(actionCreators.updateCurrentPair(pair))
    dispatch(push('/trade'))
  }
}
