// @flow
import type { TokenState, Tokens, TokenRates } from '../../types/tokens';
import { quoteTokensBySymbols } from '../../config/quotes';

const initialState = {
  bySymbol: quoteTokensBySymbols
};
for (let symbol in initialState.bySymbol)
  initialState.bySymbol[symbol].quote = true;

export const initialized = () => {
  const event = (state: TokenState = initialState) => state;
  return event;
};

export const tokensUpdated = (tokens: Tokens) => {
  const event = (state: TokenState) => {
    let bySymbol = tokens.reduce(
      (result, token) => {
        result[token.symbol] = {
          asset: token.asset,
          symbol: token.symbol,
          decimals: token.decimals,
          registered: token.registered ? token.registered : null,
          listed: token.listed ? token.listed : null,
          quote: token.quote ? token.quote : null,
          rank: token.rank ? token.rank : null,
          USDRate: token.USDRate ? token.USDRate : null,
          EURRate: token.EURRate ? token.EURRate : null,
          JPYRate: token.JPYRate ? token.JPYRate : null
        }

        return result
      },
      { }
    )

    return {
      ...state,
      bySymbol: {
        ...state.bySymbol,
        ...bySymbol,
      }
    }
  }

  return event
}

export const tokensReset = (tokens: Tokens) => {
  const event = (state: TokenState) => {
    let bySymbol = tokens.reduce(
      (result, token) => {
        result[token.symbol] = {
          asset: token.asset,
          symbol: token.symbol,
          decimals: token.decimals,
          registered: token.registered ? token.registered : null,
          listed: token.listed ? token.listed : null,
          quote: token.quote ? token.quote : null,
          rank: token.rank ? token.rank : null,
          USDRate: token.USDRate ? token.USDRate : null,
          EURRate: token.EURRate ? token.EURRate : null,
          JPYRate: token.JPYRate ? token.JPYRate : null
        }

        return result
      },
      { }
    )

    return {
      ...state,
      bySymbol
    }
  }

  return event
}

export const tokenRatesUpdated = (tokenRates: TokenRates) => {
  const event = (state: TokenState) => {
    let bySymbol = tokenRates.reduce(
      (result, tokenRate) => {
        result[tokenRate.symbol] = {
          ...state.bySymbol[tokenRate.symbol],
          USDRate: tokenRate.USD,
          EURRate: tokenRate.EUR,
          JPYRate: tokenRate.JPY
        }

        return result
      }, 
      {}
    )

    return {
      ...state,
      bySymbol: {
        ...state.bySymbol,
        ...bySymbol
      }
    }
  }

  return event
}

export default function getTokenDomain(state: TokenState) {
  return {
    bySymbol: () => state.bySymbol,
    symbols: (): any => Object.keys(state.bySymbol),
    token: (symbol: string) => state.bySymbol[symbol],
    tokens: () => Object.values(state.bySymbol),

    quoteTokens: (): any => {
      let tokens: any = Object.values(state.bySymbol)      
      let quoteTokens = tokens.filter(token => (token.quote === true))

      return quoteTokens
    },

    baseTokens: (): any => {
      let tokens: any = Object.values(state.bySymbol)      
      let baseTokens = tokens.filter(token => (token.quote === false))

      return baseTokens
    },

    assets: (): any => {
      let tokens: any = Object.values(state.bySymbol)
      let assets = tokens.map(token => token.assets)

      return assets
    },

    registeredTokens: (): any => {
      let tokens: any = Object.values(state.bySymbol)
      let registeredTokens = tokens.filter(token => (token.registered === true))


      return registeredTokens
    },

    listedTokens: (): any => {
      let tokens: any = Object.values(state.bySymbol)
      let listedTokens = tokens.filter(token => (token.listed === true))

      return listedTokens
    },

    listedAssets: (): any => {
      let tokens: any = Object.values(state.bySymbol)
      let listed = tokens.filter(token => (token.listed === true))
      let assets = listed.map(token => token.asset)
      
      return assets
    },

    registeredAssets: (): any => {
      let tokens: any = Object.values(state.bySymbol)
      let registered = tokens.filter((token => token.registered === true))
      let assets = registered.map(token => token.asset)

      return assets
    },

    exchangeRates: (): any => {
      let exchangeRates = Object.keys(state.bySymbol).reduce((result, symbol) => {
        result[symbol] = {
          USD: state.bySymbol[symbol].USDRate,
          EUR: state.bySymbol[symbol].EURRate,
          JPY: state.bySymbol[symbol].JPYRate
        }

        return result
      }, {})

      return exchangeRates
    },


    rankedTokens: () => (Object.values(state.bySymbol): any).map((m, index) => ({ ...m, rank: index + 1 })),
  };
}
