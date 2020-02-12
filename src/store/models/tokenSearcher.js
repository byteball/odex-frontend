// @flow
import type { 
  State, 
  ThunkAction 
} from '../../types'

import { 
  getTokenPairsDomain, 
  getAccountBalancesDomain,
  getOrdersDomain,
  getAccountDomain
} from '../domains'

import * as actionCreators from '../actions/tokenSearcher'

import { getQuoteToken, getBaseToken } from '../../utils/tokens'


export default function tokenSearcherSelector(state: State) {
  let domain = getTokenPairsDomain(state)
  let accountBalancesDomain = getAccountBalancesDomain(state)
  let accountDomain = getAccountDomain(state)
  let ordersDomain = getOrdersDomain(state)
  let tokenPairs = domain.getTokenPairsDataArray()
  let favoriteTokenPairs = domain.getFavoritePairs()
  let tokenPairsByQuoteToken = {}
  let quotes = ['USDC', 'GBYTE']

  for (let quote of quotes) {
    let rawQuote = quote

    //We look for pairs with the corresponding "quote".
    tokenPairsByQuoteToken[quote] = tokenPairs
      .filter(({ pair }) => getQuoteToken(pair) === rawQuote)
      .map(tokenPair => {
        let parsedPair = tokenPair.pair
        return {
          ...tokenPair,
          pair: parsedPair,
          base: getBaseToken(parsedPair),
          quote: getQuoteToken(parsedPair)
        }
      })
      .map(tokenPair => ({
        ...tokenPair,
        favorited: favoriteTokenPairs.indexOf(tokenPair.pair) > -1
      }))
  }

  let rawPair = domain.getCurrentPair()
  let currentAddress = accountDomain.address
  let baseTokenBalance = accountBalancesDomain.get(rawPair.baseTokenSymbol)
  let quoteTokenBalance = accountBalancesDomain.get(rawPair.quoteTokenSymbol)
  let baseTokenLockedBalance = ordersDomain.lockedBalanceByToken(rawPair.baseTokenSymbol, currentAddress)
  let quoteTokenLockedBalance = ordersDomain.lockedBalanceByToken(rawPair.quoteTokenSymbol, currentAddress)
  let baseTokenAvailableBalance = baseTokenBalance - baseTokenLockedBalance
  let quoteTokenAvailableBalance = quoteTokenBalance - quoteTokenLockedBalance

  let currentPairName = rawPair.pair
  let baseTokenSymbol = rawPair.baseTokenSymbol
  let quoteTokenSymbol = rawPair.quoteTokenSymbol
  let currentPair = { ...rawPair, pair: currentPairName, baseTokenSymbol, quoteTokenSymbol }

  return {
    tokenPairsByQuoteToken,
    currentPair,
    baseTokenBalance,
    quoteTokenBalance,
    baseTokenAvailableBalance,
    quoteTokenAvailableBalance
  }
}

export const updateCurrentPair = (newPairSymbol: string): ThunkAction => {
  return async (dispatch, getState, { socket, mixpanel }) => {
    mixpanel.track('trading-page/update-current-pair')

    try {
      socket.unsubscribeChart()
      socket.unsubscribeOrderBook()
      socket.unsubscribeTrades()

      let state = getState()
      dispatch(actionCreators.updateCurrentPair(newPairSymbol))

      let pairDomain = getTokenPairsDomain(state)
      let newPair = pairDomain.getPair(newPairSymbol)

      socket.subscribeTrades(newPair)
      socket.subscribeOrderBook(newPair)
      socket.subscribeChart(newPair, state.ohlcv.currentTimeSpan.label, state.ohlcv.currentDuration.label)
    } catch (e) {
      console.log(e)
    }
  }
}
