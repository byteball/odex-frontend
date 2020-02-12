// @flow
import type {
  UpdateMarketPageDataAction
} from '../../types/marketsPage'

import type {
  TradingStats
} from '../../types/stats'

import type { TokenPairData } from '../../types/tokens'

const actionTypes = {
  updateMarketPageData: 'marketsPage/UPDATE_MARKET_PAGE_DATA'
}

export function updateMarketPageData(tokenPairData: Array<TokenPairData>, tradingStats: TradingStats): UpdateMarketPageDataAction {
  return {
    type: actionTypes.updateMarketPageData,
    payload: { tokenPairData, tradingStats }
  }
}

export default actionTypes;
