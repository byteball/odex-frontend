//@flow

import type { TokenPair } from './tokens'

export type OHLCVState = {
  +ohlcvData: ?Array<Object>,
  +currentTimeSpan: Object,
  +currentDuration: Object,
  +noOfCandles: number,
};

export type Candle = {
  open: number,
  high: number,
  close: number,
  low: number,
  volume: number,
  timestamp: number,
  pair: TokenPair
}

export type Candles = Array<Candle>