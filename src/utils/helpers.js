//@flow

import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import type { Token, TokenPair, TokenPairData } from '../types/tokens'

export const rand = (min: number, max: number, decimals: number = 4) => {
  return (Math.random() * (max - min) + min).toFixed(decimals)
}

export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const relativeDate = (time: number) => {
  let formattedDate = distanceInWordsStrict(time, new Date()) + ' ago'
  return capitalizeFirstLetter(formattedDate)
}

export const isFloat = (n: *) => parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0

export const isInteger = (n: *) => /^\+?\d+$/.test(n)

// silence-error: silence number/string conversion error
export const round = (n: *, decimals: number = 2) => Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)


export const replace =(arr: Array<any>, element: any, newElement: any) => {
  let index = arr.indexOf(element)
  if (index !== -1) {
    arr[index] = newElement
  }

  return arr
}


export const convertPricepointToPrice = (n: any, pricePointMultiplier: number = 1, decimals: number = 6) =>
  Math.round((n / pricePointMultiplier) * Math.pow(10, decimals)) / Math.pow(10, decimals)

export const sortTable = (table: *, column: *, order: string = 'asc') => {
  // silence-error: unknown Issue
  let sortedTable = table.sort((a, b) => compare(a[column], b[column]))
  return order === 'asc' ? sortedTable : sortedTable.reverse()
}

export const compare = (a: *, b: *, order: string = 'asc') => {
  if (typeof a === 'string') {
    a = a.toUpperCase()
    b = b.toUpperCase()
  }

  return a < b ? -1 : 1
}

export const isJson = (text: *) => {
  return /^[\],:{}\s]*$/.test(
    text // silence-error: unknown Issue
      .replace(/\\["\\\/bfnrtu]/g, '@') // eslint-disable-next-line
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  )
}

export const isNotNull = (elem: *) => {
  return (elem !== null && !isNaN(elem))
}

export const arrayIsNotEmpty = (arr: *) => {
  return (
    typeof arr !== "undefined"
    && arr != null
    && arr.length != null
    && arr.length > 0)
}





export const computeChange = ( open: number, close: number ) => {
  if (open === close) return 0
  return (close - open) / open
}



export const minOrderAmount = (makeFee: string, takeFee: string) => {
  
  return 0
}

export const getExchangeRate = (currency: string, token: Token) => {
  switch (currency) {
    case "USD":
      return token ? token.USDRate : null
    case "EUR":
      return token ? token.EURRate : null
    case "JPY":
      return token ? token.JPYRate : null
    default:
      return null
  }
}




export const parseTokenPairArray = (data: Array<TokenPair & TokenPairData>) => {
  return data.map(rawPair => {
    let pair = rawPair.pair
    let baseTokenSymbol = rawPair.baseTokenSymbol
    let quoteTokenSymbol = rawPair.quoteTokenSymbol
    
    return {
      ...rawPair,
      pair,
      baseTokenSymbol,
      quoteTokenSymbol
    }
  })
}




export const getPairSymbol = (baseTokenSymbol: string, quoteTokenSymbol: string) => {
  return `${baseTokenSymbol}/${quoteTokenSymbol}`;
};

export const getBaseToken = (pairSymbol: string) => {
  return pairSymbol.split('/')[0];
};

export const getQuoteToken = (pairSymbol: string) => {
  return pairSymbol.split('/')[1];
};