// @flow
import type { TokenPairData } from './tokens'
import type { TradingStats } from './stats'

export type UpdateMarketPageDataAction = {
  type: 'marketsPage/UPDATE_MARKET_PAGE_DATA',
  payload: { tokenPairData: Array<TokenPairData>, tradingStats: TradingStats }
}

export type MarketsPageActions = 
  | UpdateMarketPageDataAction