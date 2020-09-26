//@flow
import { DEFAULT_NETWORK_ID } from '../../config/environment'
import { quoteTokens } from '../../config/quotes'
import { tokens } from '../../config/tokens'
import { generateTokenPairs, getPairSymbol, getBaseToken } from '../../utils/tokens'
import type { Token, TokenPair, TokenPairs, TokenPairState, TokenPairData } from '../../types/tokens'
import { getQuoteToken } from '../../utils/helpers'

const defaultTokenPairs = generateTokenPairs(quoteTokens, tokens)

const defaultInitialState = {
  byPair: defaultTokenPairs,
  data: {},
  favorites: [],
  currentPair: (DEFAULT_NETWORK_ID === 'testnet') ? 'GBYTE/USDC' : 'GBYTE/OUSD',
  sortedPairs: [],
}

//By default the application is started with a default create from tokens in a configuration file. To
//create a tokenpair domain with less tokens, the initialized function can be called with a custom initial
//token pair state (that can be created with the createInitialState function).
export const initialized = (customInitialState?: Object) => {
  let initialState = customInitialState || defaultInitialState
  const event = (state: TokenPairState = initialState) => state
  return event
}

export const currentPairUpdated = (pair: string) => {
  const event = (state: TokenPairState) => ({
    ...state,
    currentPair: pair
  })

  return event
}

export const tokenPairsUpdated = (pairs: TokenPairs) => {
  const event = (state: TokenPairState) => {
    let byPair = pairs.reduce(
      (result, pair) => {
        let pairSymbol = getPairSymbol(pair.baseTokenSymbol, pair.quoteTokenSymbol)
        result[pairSymbol] = {
          pair: pairSymbol,
          baseTokenSymbol: pair.baseTokenSymbol,
          quoteTokenSymbol: pair.quoteTokenSymbol,
          baseAsset: pair.baseAsset,
          quoteAsset: pair.quoteAsset,
          baseTokenDecimals: pair.baseTokenDecimals,
          quoteTokenDecimals: pair.quoteTokenDecimals,
          listed: pair.listed,
          active: pair.active,
          rank: pair.rank
        }

        return result
      },
      { }
    )

    let sortedPairs = pairs.map(pair => {
      let pairSymbol = getPairSymbol(pair.baseTokenSymbol, pair.quoteTokenSymbol)
      return pairSymbol
    })

    return {
      ...state,
      byPair: {
        ...state.byPair,
        ...byPair
      },
      sortedPairs: [ ...new Set([ ...state.sortedPairs, ...sortedPairs ])]
    }
  }

  return event
}


export const tokenPairsReset = (pairs: TokenPairs) => {
  const event = (state: TokenPairState) => {
    let byPair = pairs.reduce(
      (result, pair) => {
        let pairSymbol = getPairSymbol(pair.baseTokenSymbol, pair.quoteTokenSymbol)
        result[pairSymbol] = {
          pair: pairSymbol,
          baseTokenSymbol: pair.baseTokenSymbol,
          quoteTokenSymbol: pair.quoteTokenSymbol,
          baseAsset: pair.baseAsset,
          quoteAsset: pair.quoteAsset,
          baseTokenDecimals: pair.baseTokenDecimals,
          quoteTokenDecimals: pair.quoteTokenDecimals,
          listed: pair.listed,
          active: pair.active,
          rank: pair.rank
        }

        return result
      },
      { }
    )

    let sortedPairs = pairs.map(pair => {
      let pairSymbol = getPairSymbol(pair.baseTokenSymbol, pair.quoteTokenSymbol)
      return pairSymbol
    })

    return {
      ...state,
      byPair,
      sortedPairs: [ ...new Set([ ...sortedPairs ])]
    }
  }

  return event
}

export const tokenPairRemoved = (baseToken: Token) => {
  const event = (state: TokenPairState) => {
    let newByPair = Object.keys(state.byPair)
      .filter(key => getBaseToken(key) !== baseToken.symbol)
      .reduce((result, current) => {
        result[current] = state.byPair[current]
        return result
      }, {})

    return {
      byPair: newByPair
    }
  }

  return event
}

export const tokenPairDataUpdated = (tokenPairData: Array<TokenPairData>) => {
  const event = (state: TokenPairState) => {

    let data = tokenPairData.reduce((result, item) => {
      return {
        ...result,
        [item.pair]: {
          ...state.data[item.pair],
          ...item
        }
      }
    }, {})
    
    let newState = {
      ...state,
      data: {
        ...state.data,
        ...data
      },
    }

    return newState
  }
  return event
}

export const tokenPairFavorited = (tokenPair: string, favorited: boolean) => {
  const event = (state: TokenPairState) => {
    let newState

    favorited
      ? (newState = [...state.favorites, tokenPair])
      : (newState = state.favorites.filter(elem => elem !== tokenPair))

    return {
      ...state,
      favorites: newState
    }
  }

  return event
}

export default function getTokenPairsDomain(state: TokenPairState) {
  return {
    getPairs: (): any => Object.keys(state.byPair),
    getPair: (code: string): any => state.byPair[code],
    getPairsByCode: () => state.byPair,
    getTokenPairsData: () => state.data,
    getTokenPairsDataArray: () => Object.values(state.data),
    getFavoritePairs: () => state.favorites,
    getCurrentPair: (): TokenPair => state.byPair[state.currentPair],
    getListedPairs: (): TokenPair => {
      let pairs: any = Object.values(state.byPair)
      let listedPairs = pairs.filter(pair => pair.listed === true)

      return listedPairs
    },

    //Merge token pair properties and data
    getTokenPairsWithDataObject: () => {
      let symbols = Object.keys(state.byPair)
      return symbols.reduce((
        (result, pairSymbol) => {
          if (state.data[pairSymbol] && state.byPair[pairSymbol]) {
            result[pairSymbol] = {
            ...state.data[pairSymbol],
            ...state.byPair[pairSymbol]
            }
          }
          
          return result
        }
      ), {})      
    },

    getTokenPairsWithDataArray: () => {
      let tokenPairData = []
      let symbols = state.sortedPairs

      symbols.forEach(pairSymbol => {
        if (state.data[pairSymbol] && state.byPair[pairSymbol]) {
          tokenPairData.push({
            ...state.data[pairSymbol],
            ...state.byPair[pairSymbol]
          })
        }
      })

      return tokenPairData
    },

    orderCountsByPair: () => {
      let pairSymbols = Object.keys(state.data)
      let orderCounts = []

      pairSymbols.forEach(pairSymbol => {
        let value = state.data[pairSymbol].orderCount
        if (value) orderCounts.push({ symbol: pairSymbol, value, unit: 'orders' })
      })
      
      return orderCounts
    },

    orderCountsByToken: (quoteTokens) => {
      let pairSymbols = Object.keys(state.data)
      let orderCounts = []

      quoteTokens.forEach(token => {
        pairSymbols.forEach(pairSymbol => {
          let value = state.data[pairSymbol].orderCount
          let countIndex = orderCounts.findIndex(item => item.symbol === token.symbol);
          if (getQuoteToken(pairSymbol) === token.symbol && value > 0) {
            if (countIndex === -1) {
              orderCounts.push({
                symbol: token.symbol,
                value,
                unit: 'orders'
              })
            } else {
              orderCounts[countIndex].value += value;
            }
          }
        })
      })

      return orderCounts
    },

    tradeCountsByPair: () => {
      let pairSymbols = Object.keys(state.data)
      let tradeCounts = []

      pairSymbols.forEach(pairSymbol => {
        let value = state.data[pairSymbol].tradeCount
        if (value) tradeCounts.push({ symbol: pairSymbol, value, unit: 'trades' })
      })

      return tradeCounts
    },
    
    tradeCountsByToken: (quoteTokens) => {
      let pairSymbols = Object.keys(state.data)
      let tradeCounts = []

      quoteTokens.forEach(token => {
        pairSymbols.forEach(pairSymbol => {
          let value = state.data[pairSymbol].tradeCount
          let countIndex = tradeCounts.findIndex(item => item.symbol === token.symbol);
          if (getQuoteToken(pairSymbol) === token.symbol && value > 0) {
            if (countIndex === -1) {
              tradeCounts.push({
                symbol: token.symbol,
                value,
                unit: 'trades'
              })
            } else {
              tradeCounts[countIndex].value += value;
            }
          }
        })
      })
      
      return tradeCounts
    },

    orderBookVolumeByPair: (exchangeRates: *, currency: string) => {
      let pairSymbols = Object.keys(state.data)
      let volumes = []

      pairSymbols.forEach(pairSymbol => {
        let volume = state.data[pairSymbol].orderVolume

        if (volume) {
          let baseTokenSymbol = getBaseToken(pairSymbol)
          let exchangeRate = exchangeRates[baseTokenSymbol] && exchangeRates[baseTokenSymbol][currency]
          if (exchangeRate) {
            let value = volume * exchangeRate
            volumes.push({ symbol: pairSymbol, value, unit: '$' })
          } 
        }
      })

      return volumes
    },

    orderBookVolumeByToken: (quoteTokens, exchangeRates: *, currency: string) => {
      let pairSymbols = Object.keys(state.data)
      let volumes = []
      
      quoteTokens.forEach(token => {
        pairSymbols.forEach(pairSymbol => {
          let volume = state.data[pairSymbol].orderVolume
          let volumeIndex = volumes.findIndex(item => item.symbol === token.symbol);

          if (getQuoteToken(pairSymbol) === token.symbol && volume > 0) {
            let baseTokenSymbol = getBaseToken(pairSymbol)
            let exchangeRate = exchangeRates[baseTokenSymbol] && exchangeRates[baseTokenSymbol][currency]
            if (exchangeRate) {
              let value = volume * exchangeRate
              if (volumeIndex === -1) {
                volumes.push({
                  symbol: token.symbol,
                  value,
                  unit: '$'
                })
              } else {
                volumes[volumeIndex].value += value;
              }
            } 
          }
        })
      })

      return volumes
    },

    tradeVolumeByPair: (exchangeRates: *, currency: string) => {
      let pairSymbols = Object.keys(state.data)
      let volumes = []

      pairSymbols.forEach(pairSymbol => {
        let volume = state.data[pairSymbol].tradeVolume

        if (volume) {
          let baseTokenSymbol = getBaseToken(pairSymbol)
          let exchangeRate = exchangeRates[baseTokenSymbol] && exchangeRates[baseTokenSymbol][currency]
          if (exchangeRate) {
            let value = volume * exchangeRate
            volumes.push({ symbol: pairSymbol, value, unit: '$' })
          }
        }
      })

      return volumes
    },

    tradeVolumeByToken: (quoteTokens, exchangeRates: *, currency: string) => {
      let pairSymbols = Object.keys(state.data)
      let volumes = []

      quoteTokens.forEach(token => {
        pairSymbols.forEach(pairSymbol => {
          let volume = state.data[pairSymbol].tradeVolume
          let volumeIndex = volumes.findIndex(item => item.symbol === token.symbol);

          if (getQuoteToken(pairSymbol) === token.symbol && volume > 0) {
            let baseTokenSymbol = getBaseToken(pairSymbol)
            let exchangeRate = exchangeRates[baseTokenSymbol] && exchangeRates[baseTokenSymbol][currency]
            if (exchangeRate) {
              let value = volume * exchangeRate
              if (volumeIndex === -1) {
                volumes.push({
                  symbol: token.symbol,
                  value,
                  unit: '$'
                })
              } else {
                volumes[volumeIndex].value += value;
              }
            } 
          }
        })
      })

      return volumes
    },
  }
}
