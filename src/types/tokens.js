//@flow
export type Symbol = string;

export type TokenPairState = {
  +byPair: {
    +[string]: {
      +pair: string,
      +baseTokenSymbol: string,
      +quoteTokenSymbol: string,
      +baseAsset: string,
      +quoteAsset: string,
      +baseTokenDecimals: number,
      +quoteTokenDecimals: number,
      +listed: bool,
      +active: bool,
      +rank: number,
    },
  },
  +data: {
    +[string]: {
      +pair: string,
      +lastPrice: number,
      +change: string,
      +high: number,
      +low: number,
      +volume: number,
    },
  },
  +favorites: Array<string>,
  +currentPair: string,
  +sortedPairs: Array<string>
};


// Token is the structure representing an ERC20 token that is stored in the redux store
export type Token = {
  asset: string,
  symbol: string,
  decimals: number,
  quote?: ?bool,
  registered?: ?bool,
  listed?: ?bool,
  USDRate?: ?number,
  EURRate?: ?number,
  JPYRate?: ?number,
  rank?: ?number,
};

// APIToken is the structure representing an ERC20 token that is fetched from an external API
export type APIToken = {
  asset: string, 
  symbol: string,
  decimals: number,
  quote?: ?bool,
  registered?: ?bool,
  listed?: ?bool,
  active?: ?bool,
  rank?: ?number,
}

export type Tokens = Array<Token>
export type APITokens = Array<APIToken>

// TokenPair is the structure representing a pair of ERC20 token stored in the redux store
export type TokenPair = {
  +pair: string,
  +baseTokenSymbol: string,
  +quoteTokenSymbol: string,
  +baseAsset: string,
  +baseTokenDecimals: number,
  +quoteTokenDecimals: number,
  +quoteAsset: string,
  +listed: bool,
  +active: bool,
  +rank: number,
};

// TokenPairData is the structure representing a pair of ERC20 token data (price, volume, etc.) stored
// in the redux store.
export type TokenPairData = {
  pair: string,
  lastPrice: number,
  price: number,
  change: number,
  high: number,
  open: number,
  close: number,
  low: number,
  volume: number,
  base: ?string,
  quote: ?string,
  favorited: ?string,
  orderCount: number, 
  orderVolume: number,
  active: boolean,
  averageOrderAmount: number,
  averageTradeAmount: number,
};


export type TokenData = {
  asset: string,
  symbol: string,
  balance: number,
};

// TokenRate is an object containing the different exchange rates between the 'symbol' token and the main 
// fiat quote currencies: USD, EUR, JPY
export type TokenRate = {
  symbol: string,
  USD: number,
  EUR: number,
  JPY: number,
}

export type TokenPairs = Array<TokenPair>

export type TokenRates = Array<TokenRate>

export type TokenPairDataArray = Array<TokenPairData>;
export type TokenPairDataMap = { [string]: TokenPairData };

export type TokenState = {
  +bySymbol: { [Symbol]: Token },
};

export type TokenEvent = any => TokenState => TokenState;
export type TokenPairEvent = any => TokenPairState => TokenPairState;


export type RankedToken = {
  asset: string,
  symbol: string,
  decimals: number,
  rank: number,
  registered?: bool,
  listed?: bool,
}