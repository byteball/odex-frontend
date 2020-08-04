//@flow

import { 
    getTokenPairsDomain,
    getAccountDomain,
    getTokenDomain,
    getStatsDomain
} from '../domains'
import type { State } from '../../types'

export default function statisticsBoardSelector(state: State) {
    let tokenPairsDomain = getTokenPairsDomain(state)
    let tokensDomain = getTokenDomain(state)
    let statsDomain = getStatsDomain(state)
    let { referenceCurrencyName } = getAccountDomain(state)

    let currency = referenceCurrencyName
    let exchangeRates = tokensDomain.exchangeRates(currency)
    let tradingStats = statsDomain.state

    let orderCountsByPair = tokenPairsDomain.orderCountsBySymbol()
    let tradeCountsByPair = tokenPairsDomain.tradeCountsBySymbol()
    let orderValuesByPair = tokenPairsDomain.orderBookVolumeBySymbol(exchangeRates, currency)
    let tradeValuesByPair = tokenPairsDomain.tradeVolumeBySymbol(exchangeRates, currency)
    
    let tradeCountsByToken;
    let orderCountsByToken;
    let tradeValuesByToken;
    let orderValuesByToken;
    let total24HVolume = statsDomain.totalVolume;
    let totalOrderVolume = statsDomain.totalOrderAmount;
    let numberOfTrades = statsDomain.totalTrades;
    let numberOfOrders = statsDomain.totalOrders;

    return {
        ...tradingStats,
        orderCountsByPair,
        orderValuesByPair,
        tradeCountsByPair,
        tradeValuesByPair,
        tradeCountsByToken,
        orderCountsByToken,
        tradeValuesByToken,
        orderValuesByToken,
        totalOrderVolume,
        total24HVolume,
        numberOfOrders,
        numberOfTrades,
        currency,
    }
}