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
    let quoteTokens = tokensDomain.quoteTokens()
    let tradingStats = statsDomain.state

    let orderCountsByPair = tokenPairsDomain.orderCountsByPair()
    let tradeCountsByPair = tokenPairsDomain.tradeCountsByPair()
    let orderValuesByPair = tokenPairsDomain.orderBookVolumeByPair(exchangeRates, currency)
    let tradeValuesByPair = tokenPairsDomain.tradeVolumeByPair(exchangeRates, currency)

    let orderCountsByToken = tokenPairsDomain.orderCountsByToken(quoteTokens)
    let tradeCountsByToken = tokenPairsDomain.tradeCountsByToken(quoteTokens)
    let orderValuesByToken = tokenPairsDomain.orderBookVolumeByToken(quoteTokens, exchangeRates, currency)
    let tradeValuesByToken = tokenPairsDomain.tradeVolumeByToken(quoteTokens, exchangeRates, currency)
    
    let total24HVolume = statsDomain.totalVolume
    let totalOrderVolume = statsDomain.totalOrderAmount
    let numberOfTrades = statsDomain.totalTrades
    let numberOfOrders = statsDomain.totalOrders

    return {
        ...tradingStats,
        orderCountsByPair,
        orderValuesByPair,
        tradeCountsByPair,
        tradeValuesByPair,
        orderCountsByToken,
        tradeCountsByToken,
        orderValuesByToken,
        tradeValuesByToken,
        totalOrderVolume,
        total24HVolume,
        numberOfOrders,
        numberOfTrades,
        currency,
    }
}