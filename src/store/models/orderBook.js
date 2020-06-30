// @flow
import { getOrderBookDomain, getTokenPairsDomain, getAccountDomain } from '../domains';
import type { State } from '../../types';


export default function orderBookSelector(state: State) {
  let { bids, asks } = getOrderBookDomain(state).getOrderBookData(2500);
  let rawPair = getTokenPairsDomain(state).getCurrentPair();
  let { displayMode } = getAccountDomain(state)


  let currentPairName = rawPair.pair
  let baseTokenSymbol = rawPair.baseTokenSymbol
  let quoteTokenSymbol = rawPair.quoteTokenSymbol
  let currentPair = { ...rawPair, pair: currentPairName, baseTokenSymbol, quoteTokenSymbol }

  let midMarketPrice, spread

  if (bids[0] && asks[0]) {
    midMarketPrice = (bids[0].price + asks[0].price) / 2
    spread = (asks[0].price - bids[0].price) / asks[0].price * 100
  }

  return {
    bids,
    asks,
    currentPair,
    midMarketPrice,
    spread,
    displayMode
  };
}
