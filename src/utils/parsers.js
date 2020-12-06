// @flow

import { isFloat, isInteger, round, computeChange } from './helpers'

import type { TokenPair, APITokens, APIToken, Tokens } from '../types/tokens'
import type { Order } from '../types/orders'
import type { Trade } from '../types/trades'
import type { OrderBookData } from '../types/orderBook'
import type { Candles } from '../types/ohlcv'
import type { APIPairData } from '../types/api'

export const parseJSONData = (obj: Object) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      parseJSONData(obj[key])
    } else if (typeof obj[key] === typeof []) {
      obj[key].forEach(elem => parseJSONData(elem))
    } else {
      if (typeof obj[key] === 'string') {
        if (isFloat(obj[key])) {
          obj[key] = parseFloat(obj[key])
        } else if (isInteger(obj[key])) {
          obj[key] = parseInt(obj[key], 10)
        }
      }
    }
  }

  return obj
}

export const parseJSONToFixed = (obj: Object, decimals: number = 2) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      parseJSONToFixed(obj[key], decimals)
    } else if (typeof obj[key] === typeof []) {
      obj[key].forEach(elem => parseJSONToFixed(elem, decimals))
    } else if (typeof obj[key] === 'string') {
      if (isFloat(obj[key])) {
        obj[key] = round(obj[key], decimals)
      } else if (isInteger(obj[key])) {
        obj[key] = round(obj[key], decimals)
      }
    } else if (typeof obj[key] === 'number') {
      obj[key] = round(obj[key], decimals)
    }
  }

  return obj
}


export const parseToken = (token: APIToken) => {
  return {
    asset: token.asset,
    active: token.active,
    listed: token.listed,
    quote: token.quote,
    symbol: token.symbol,
    decimals: token.decimals,
    rank: token.rank,
  }
}

export const parseTokens = (tokens: APITokens) => {
  let parsedTokens = tokens.map((token) => {
    return {
      asset: token.asset,
      active: token.active,
      listed: token.listed,
      quote: token.quote,
      symbol: token.symbol,
      decimals: token.decimals,
      rank: token.rank,
    }
  })

  return parsedTokens  
}

export const parseTokenAmount = (amount: number, pair: TokenPair, precision: number = 2) => {
  if (!amount)
    return 0;
  if (typeof amount !== 'number')
    throw Error("amount is not a number: " + amount);
  let { baseTokenDecimals } = pair
  let precisionMultiplier = Math.pow(10, precision)
  let baseMultiplier = Math.pow(10, baseTokenDecimals)
  let bigAmount = amount * precisionMultiplier / baseMultiplier

  return Number(bigAmount) / Number(precisionMultiplier)
}


export const parsePricepoint = (pricepoint: number, pair: TokenPair, precision: number = 6) => {
  //return parseFloat(pricepoint);
  if (typeof pricepoint !== 'number')
    throw Error("price is not a number: " + pricepoint);
  let { quoteTokenDecimals, baseTokenDecimals } = pair
  let quoteMultiplier = Math.pow(10, quoteTokenDecimals)
  let baseMultiplier = Math.pow(10, baseTokenDecimals)
  return pricepoint * baseMultiplier / quoteMultiplier
}



export const parseOrder = (order: Order, pair: TokenPair, precision: number = 2) => {  
  return {
  time: order.createdAt,
  amount: parseTokenAmount(order.amount, pair, precision),
  filled: parseTokenAmount(order.filledAmount, pair, precision),
  price: parsePricepoint(order.price, pair, precision),
  hash: order.hash,
  side: order.side,
  pair: order.pairName,
  type: 'LIMIT',
  status: order.status
}}

export const parseOrders = (orders: Array<Order>, pairs: Object, precision: number = 2) => {
  let parsedOrders = []

  orders.forEach(order => {
    let pair = pairs[order.pairName]
    if (pair) {
      let amount = parseTokenAmount(order.amount, pair, precision)
      let filled = parseTokenAmount(order.filledAmount, pair, precision)
      let price = parsePricepoint(order.price, pair, precision)

      let newOrder = {
        time: order.createdAt,
        amount: amount,
        filled: filled,
        price: price,
        hash: order.hash,
        side: order.side,
        pair: order.pairName,
        type: 'LIMIT',
        status: order.status
      }

      parsedOrders.push(newOrder)
    }
  })

  return parsedOrders
}

export const parseTrade = (trade: Trade, pair: TokenPair, precision: number = 2) => {  
  return {
    time: trade.createdAt,
    price: parsePricepoint(trade.price, pair, precision),
    amount: parseTokenAmount(trade.amount, pair, precision),
    hash: trade.hash,
    orderHash: trade.orderHash,
    type: trade.type || 'LIMIT',
    side: trade.side,
    pair: trade.pairName,
    status: trade.status,
    maker: trade.maker,
    taker: trade.taker,
}}

export const parseTrades = (trades: Array<Trade>, pair: TokenPair, precision: number = 2) => {
  let parsed = (trades: any).map(trade => ({
    time: trade.createdAt,
    price: parsePricepoint(trade.price, pair, precision),
    amount: parseTokenAmount(trade.amount, pair, precision),
    hash: trade.hash,
    txHash: trade.txHash,
    orderHash: trade.orderHash,
    type: trade.type || 'LIMIT',
    side: trade.side,
    pair: trade.pairName,
    status: trade.status,
    maker: trade.maker,
    taker: trade.taker,
  }))

  return parsed
}

export const parseOrderBookData = (data: OrderBookData, pair: TokenPair, precision: number = 2) => {
  let { bids, asks } = data

  asks = asks.map(ask => ({
    matcher: ask.matcherAddress,
    price: parsePricepoint(ask.price, pair, precision),
    amount: parseTokenAmount(Number(ask.amount), pair, precision),
    matcher_fee_rate: ask.matcherFeeRate,
  }))

  bids = bids.map(bid => ({
    matcher: bid.matcherAddress,
    price: parsePricepoint(bid.price, pair, precision),
    amount: parseTokenAmount(Number(bid.amount), pair, precision),
    matcher_fee_rate: bid.matcherFeeRate,
  }))

  return { asks, bids }
}

export const parseExactTokenPairData = (data: APIPairData, pairs: Object) => {
  let result = []

  data.forEach(datum => {
    let pair = pairs[datum.pair.pairName]

    if (pair) {
      result.push({
        pair: pair.pair,
        price: datum.price ? parsePricepoint(datum.price, pair) : null,
        lastPrice: datum.close ? parsePricepoint(datum.close, pair) : null,
        change: datum.open ? computeChange(datum.open, datum.close) : null,
        high: datum.high ? parsePricepoint(datum.high, pair) : null,
        low: datum.low ? parsePricepoint(datum.low, pair) : null,
        volume: datum.volume ? parseTokenAmount(datum.volume, pair, 2) : null,
        orderVolume: datum.orderVolume ? parseTokenAmount(datum.orderVolume, pair, 2) : null,
        orderCount: datum.orderCount ? datum.orderCount : null,
      })
    }
  })
    
  return result
}

export const parseTokenPairsData = (data: APIPairData, pairs: Object) => {
  let result = []

  data.forEach(datum => {
    let pair = pairs[datum.pair.pairName]

    if (pair) {
      result.push({
        pair: pair.pair,
        price: datum.price ? datum.price : null,
        lastPrice: datum.close ? parsePricepoint(datum.close, pair) : null,
        change: datum.open ? (datum.open - datum.close) / datum.open : null,
        high: datum.high ? parsePricepoint(datum.high, pair) : null,
        low: datum.low ? parsePricepoint(datum.low, pair) : null,
        open: datum.open ? parsePricepoint(datum.open, pair) : null,
        close: datum.close ? parsePricepoint(datum.close, pair) : null,
        volume: datum.volume ? parseTokenAmount(datum.volume, pair) : null,
        orderVolume: datum.orderVolume ? parseTokenAmount(datum.orderVolume, pair) : null,
        orderCount: datum.orderCount ? datum.orderCount : null,
        tradeCount: datum.tradeCount ? datum.tradeCount : null,
        averageOrderAmount: datum.averageOrderAmount ? parseTokenAmount(datum.averageOrderAmount, pair) : null,
        averageTradeAmount: datum.averageTradeAmount ? parseTokenAmount(datum.averageTradeAmount, pair) : null
      })
    }
  })

  return result
}

export const parseOHLCV = (data: Candles, pair: TokenPair) => {
  let parsed = (data: Candles).map(datum => {
    return {
      date: new Date(datum.timestamp),
      open: parsePricepoint(datum.open, pair),
      high: parsePricepoint(datum.high, pair),
      low: parsePricepoint(datum.low, pair),
      close: parsePricepoint(datum.close, pair),
      volume: parseTokenAmount(Number(datum.volume), pair, 2)
    }
  })

  return parsed
}