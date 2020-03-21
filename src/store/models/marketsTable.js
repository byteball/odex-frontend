// @flow
import { push } from 'connected-react-router'

import {
    getAccountDomain,
    getTokenPairsDomain,
    getAccountBalancesDomain,
    getTokenDomain
} from '../domains'

import * as actionCreators from '../actions/marketsTable'
import * as notifierActionCreators from '../actions/app'
//import { quoteTokenSymbols as rawQuoteTokens } from '../../config/quotes'
import type { State, ThunkAction } from '../../types'
import { parseTokenPairArray } from '../../utils/helpers'

export default function marketsTableSelector(state: State) {
    let { referenceCurrency } = getAccountDomain(state)
    let pairsDomain = getTokenPairsDomain(state)
    let tokenDomain = getTokenDomain(state)

    let rawPairs = pairsDomain.getTokenPairsWithDataArray()
    let pairs = parseTokenPairArray(rawPairs)

    let quoteTokens = tokenDomain.quoteTokens().map(token => token.symbol)

    return {
        pairs,
        quoteTokens,
        currentReferenceCurrency: referenceCurrency.symbol
    }
}

export function redirectToTradingPage(pairSymbol: string): ThunkAction {
  return async (dispatch, getState, { mixpanel }) => {
    mixpanel.track('market-page/redirect-to-trading-page')
    let rawPairSymbol = pairSymbol

    dispatch(actionCreators.updateCurrentPair(rawPairSymbol))
    dispatch(push('/trade'))
  }
}

