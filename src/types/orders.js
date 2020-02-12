export type NewOrderParams = {
  userAddress: string,
  exchangeAddress: string,
  pair: TokenPair,
  amount: number,
  price: number,
  side: 'BUY' | 'SELL'
}

export type RawOrder = {
  exchangeAddress: string,
  userAddress: string,
  baseToken: string,
  quoteToken: string,
  amount: number,
  price: string,
  side: 'BUY' | 'SELL',
  nonce: string,
  status: string,
  hash: string,
}

export type Order = {
  time: number,
  amount: number,
  filled: number,
  price: number,
  hash: string,
  side: 'BUY' | 'SELL',
  pair: string,
  type: 'MARKET' | 'LIMIT',
  status: 'NEW' | 'OPEN' | 'CANCELLED' | 'AUTO_CANCELLED' | 'FILLED' | 'PARTIAL_FILLED'
}

// eslint-disable-next-line
type Orders = Array<Order>

// eslint-disable-next-line
type OrdersState = {
  byHash: { number: Order }
}
