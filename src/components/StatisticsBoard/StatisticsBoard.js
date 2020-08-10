//@flow
import React from 'react'
import StatisticsBoardRenderer from './StatisticsBoardRenderer'

type Props = {
    tradeCountsByPair: Array<Object>,
    orderCountsByPair: Array<Object>,
    tradeValuesByPair: Array<Object>,
    orderValuesByPair: Array<Object>,
    orderCountsByToken: Array<Object>,
    tradeCountsByToken: Array<Object>,
    orderValuesByToken: Array<Object>,
    tradeValuesByToken: Array<Object>,
    mostTradedToken: string,
    mostTradedPair: string,
    tradeSuccessRatio: number,
    totalBuyAmount: number,
    totalSellAmount: number,
    totalBuyValue: number,
    totalSellValue: number,
    numberOfTrades: number,
    numberOfOrders: number,
    numberOfBuys: number,
    numberOfSells: number,
    toggleMarketStatistics: void => void
}

type State = {}

export default class StatisticsBoard extends React.PureComponent<Props, State> {

    render() {
        return (
            <StatisticsBoardRenderer {...this.props}/>
        )
    }
}