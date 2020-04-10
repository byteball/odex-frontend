// @flow
import { ENGINE_HTTP_URL } from '../../../config/urls'

import { parseToken,
  parseTokens, 
  parseOrders, 
  parseTrades, 
  parseOrderBookData 
} from '../../../utils/parsers'

import fetch from 'isomorphic-fetch'

import type { Orders } from '../../../types/orders'
import type { Trades } from '../../../types/trades'
import type { TokenPair, Tokens } from '../../../types/tokens'

const request = (endpoint, options) => {
  return fetch(`${ENGINE_HTTP_URL}${endpoint}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    ...options
  })
}

export const createPairs = async (asset: string) => {
  const response = await request(`/pairs/create`, {
    body: JSON.stringify({ asset: asset }),
    method: 'POST'
  })

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  const { data } = await response.json()
  return data
}

export const fetchInfo = async () => {
  const response = await request(`/info`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchFees = async () => {
  const response = await request('/fees')

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchTokens = async () => {
  const response = await request(`/tokens?listed=true`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchToken = async (assetOrSymbol: string) => {
  const response = await request(`/tokens/${encodeURIComponent(assetOrSymbol)}`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchPairs = async () => {
  const response = await request(`/pairs?listed=true`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchPair = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/pair?baseToken=${encodeURIComponent(baseToken)}&quoteToken=${encodeURIComponent(quoteToken)}`)


  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchBalance = async (address: string) => {
  const response = await request(`/balances/${address}`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchOrders = async (address: string) => {
  const response = await request(`/orders?address=${address}`)


  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}

export const fetchOrderHistory = async (address: string) => {
  const response = await request(`/orders/history?address=${address}`)

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}

export const fetchCurrentOrders = async (address: string) => {
  const response = await request(`/orders/current?address=${address}`)

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}

export const fetchTokenPairTrades = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/trades/pair?baseToken=${encodeURIComponent(baseToken)}&quoteToken=${encodeURIComponent(quoteToken)}`)
  const data = await response.json()

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server Error')
  }

  return data
}

export const fetchAddressTrades = async (address: string) => {
  const response = await request(`/trades?address=${address}`)
  const data = await response.json()

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server Error')
  }

  return data
}

export const fetchOrderBook = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/orderbook?baseToken=${encodeURIComponent(baseToken)}&quoteToken=${encodeURIComponent(quoteToken)}`)

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchRawOrderBook = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/orderbook/raw?baseToken=${encodeURIComponent(baseToken)}&quoteToken=${encodeURIComponent(quoteToken)}`)

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchTokenPairData = async () => {
  const response = await request('/pairs/data')

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}

export const fetchTradingStats = async () => {
  const response = await request('/stats/trading')

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  const { data } = await response.json()
  return data
}

export const createAccount = async (address: string) => {
  const response = await request(`/account/create?address=${address}`, { method: 'post'})

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}

export const getBalances = async (address: string) => {
  const response = await request(`/account/balances/${address}`)

  if (response.status === 400) {
    const { error } = await response.json()
    throw new Error(error)
  }

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const { data } = await response.json()
  return data
}


export const getToken = async(assetOrSymbol: string) => {
  let tokens = await fetchToken(assetOrSymbol)
  let parsedToken

  if (tokens) parsedToken = parseToken(tokens)
  
  return parsedToken
}

export const checkToken = async(assetOrSymbol: string) => {
  const response = await request(`/tokens/check/${encodeURIComponent(assetOrSymbol)}`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  let parsedToken

  if (data) parsedToken = parseToken(data)
  
  return parsedToken
}

export const getTokens = async() => {
  let tokens = await fetchTokens()
  let parsedTokens = []

  if (tokens) parsedTokens = parseTokens(tokens)

  return parsedTokens
}

export const getOrders = async (userAddress: string, pairs: Object): Orders => {
  let orders = await fetchOrders(userAddress)
  let parsedOrders

  if (orders) parsedOrders = parseOrders(orders, pairs)

  return parsedOrders
}

export const getTrades = async (pair: TokenPair): Trades => {
  let { baseAsset, quoteAsset } = pair
  let trades = await fetchTokenPairTrades(baseAsset, quoteAsset)
  let parsedTrades = parseTrades(trades, pair)

  return parsedTrades
}

export const getOrderBookData = async (pair: TokenPair) => {
  let { baseAsset, quoteAsset } = pair
  let orderbook = await fetchOrderBook(baseAsset, quoteAsset)
  let { asks, bids } = parseOrderBookData(orderbook, pair)

  return { asks, bids }
}

export const getExchangeAddress = async () => {
  let data = await fetchInfo()
  let exchangeAddress = data.exchangeAddress

  return exchangeAddress
}

export const getOperatorAddress = async () => {
  let data = await fetchInfo()
  let operatorAddress = data.operatorAddress

  return operatorAddress
}


