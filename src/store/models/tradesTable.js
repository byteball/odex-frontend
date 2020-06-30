// @flow
import { getTradesDomain, getTokenPairsDomain, getAccountDomain } from '../domains';
import type { State } from '../../types';


export default function tradesTableSelector(state: State) {
  let accountDomain = getAccountDomain(state)
  let tokenPairsDomain = getTokenPairsDomain(state)
  let tradesDomain = getTradesDomain(state)
  
  let { address, authenticated, displayMode } = accountDomain

  let trades = tradesDomain.marketTrades(50)
  let userTrades = tradesDomain.userTrades(address)
  
  let rawPair = tokenPairsDomain.getCurrentPair()
  let currentPairName = rawPair.pair
  let baseTokenSymbol = rawPair.baseTokenSymbol
  let quoteTokenSymbol = rawPair.quoteTokenSymbol
  let currentPair = { ...rawPair, pair: currentPairName, baseTokenSymbol, quoteTokenSymbol }

  return {
    authenticated,
    trades,
    userTrades,
    currentPair,
    displayMode
  };
}
