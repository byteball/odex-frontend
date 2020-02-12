//@flow
export type TokenPairDataState = {
  +[string]: {
    +pair: string,
    +lastPrice: number,
    +change: string,
    +high: number,
    +low: number,
    +volume: number,
  },
};

export type TokenPairData = {
  pair: string,
  lastPrice: number,
  change: string,
  high: number,
  low: number,
  volume: number,
};

export type TokenPairDataArray = Array<TokenPairData>;
export type TokenPairDataMap = { [string]: TokenPairData };
export type TokenPairDataEvent = any => TokenPairDataState => TokenPairDataState;
