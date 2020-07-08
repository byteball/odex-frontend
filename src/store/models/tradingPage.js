// @flow
import { getTokenPairsDomain, getAccountDomain, getTokenDomain, getAccountBalancesDomain, getConnectionDomain } from '../domains'
import * as actionCreators from '../actions/tradingPage'
import * as notifierActionCreators from '../actions/app'

import type { State, ThunkAction } from '../../types'
import { parseOrders, parseTokenPairsData } from '../../utils/parsers'
import { displayModes } from '../../config'

// eslint-disable-next-line
export default function tradingPageSelector(state: State) {
  let accountBalancesDomain = getAccountBalancesDomain(state)
  let pairDomain = getTokenPairsDomain(state)
  let { isInitiated, isConnected } = getConnectionDomain(state);
  let { authenticated, displayMode } = getAccountDomain(state)

  let {
    pair,
    baseTokenSymbol,
    quoteTokenSymbol,
  } = pairDomain.getCurrentPair()

  let [ baseToken, quoteToken ] = accountBalancesDomain.getBalancesBySymbol([baseTokenSymbol, quoteTokenSymbol])
  
  let {
    balance: baseTokenBalance,
  } = baseToken

  let {
    balance: quoteTokenBalance,
  } = quoteToken


  return {
    authenticated,
    baseTokenBalance,
    baseTokenSymbol,
    isConnected,
    isInitiated,
    quoteTokenBalance,
    quoteTokenSymbol,
    pairName: pair,
    displayMode,
    displayModes
  }
}

export const queryTradingPageData = (): ThunkAction => {
  return async (dispatch, getState, { api, socket }) => {
    try {
      socket.unsubscribeChart()
      socket.unsubscribeOrderBook()
      socket.unsubscribeTrades()

      let state = getState()
      let pairDomain = getTokenPairsDomain(state)
      let { authenticated, address: userAddress } = getAccountDomain(state)
      let currentPair = pairDomain.getCurrentPair()
      let pairs = pairDomain.getPairsByCode()

      let tokenPairData = []
      let orders = []

      // in case the user is authenticated, we query orders/tokenPairData
      if (authenticated) {
        let promises = await Promise.all([
          api.fetchTokenPairData(),
          api.fetchOrders(userAddress)
        ])

        tokenPairData = promises[0]
        orders = promises[1]

      // in case the user is not authenticated, we only query the tokenPairData (no orders)
      } else {
        tokenPairData = await api.fetchTokenPairData()
      }
      
      let parsedTokenPairData = parseTokenPairsData(tokenPairData, pairs)
      let parsedOrders = parseOrders(orders, pairs)

      socket.subscribeTrades(currentPair)
      socket.subscribeOrderBook(currentPair)
      socket.subscribeChart(currentPair, state.ohlcv.currentTimeSpan.label, state.ohlcv.currentDuration.label)
      dispatch(actionCreators.updateTradingPageData(parsedTokenPairData, parsedOrders))
    } catch (e) {
      console.log(e)
    }
  }
}


// eslint-disable-next-line
export const updateCurrentPair = (pair: string): ThunkAction => {
  return async (dispatch, getState, { api, socket, mixpanel }) => {
    mixpanel.track('trading-page/update-current-pair')
    try {
      socket.unsubscribeChart()
      socket.unsubscribeOrderBook()
      socket.unsubscribeTrades()

      let state = getState()
      let pairDomain = getTokenPairsDomain(state)

      dispatch(actionCreators.updateCurrentPair(pair))
      let tokenPair = pairDomain.getPair(pair)

      socket.subscribeTrades(tokenPair)
      socket.subscribeOrderBook(tokenPair)
      socket.subscribeChart(tokenPair, state.ohlcv.currentTimeSpan.label, state.ohlcv.currentDuration.label)
    } catch (e) {
      console.log(e)
    }

  }
}