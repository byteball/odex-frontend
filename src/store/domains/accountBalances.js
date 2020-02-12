// @flow
import type { AccountBalances, AccountBalancesState } from '../../types/accountBalances'
import { round, getExchangeRate } from '../../utils/helpers'
import { formatNumber } from 'accounting-js'
// eslint-disable-next-line
const initialState = {}


export function initialized() {
  const initialState = {}
  const event = (state: AccountBalancesState = initialState) => state

  return event
}

export function subscribed(symbol: string) {
  const event = (state: AccountBalancesState) => ({
    ...state,
    [symbol]: {
      balance: state[symbol] ? state[symbol].balance : null,
      symbol: symbol,
      subscribed: true
    }
  })
  return event
}

export function updated(accountBalances: AccountBalances) {
  const event = (state: AccountBalancesState) => {
    let newState = accountBalances.reduce((result, item) => {
      result[item.symbol] = {
        ...state[item.symbol],
        symbol: item.symbol,
        balance: item.balance,
        subscribed: state[item.symbol] ? state[item.symbol].subscribed : false
      }
      return result
    }, {})

    return {
      ...state,
      ...newState
    }
  }

  return event
}


export function unsubscribed(symbol: string) {
  const event = (state: AccountBalancesState) => ({
    ...state,
    [symbol]: {
      ...state[symbol],
      subscribed: false
    }
  })

  return event
}

export function cleared() {
  const event = (state: AccountBalancesState) => {}
  return event
}

export default function accountBalancesDomain(state: AccountBalancesState) {
  return {
    balances(): AccountBalancesState {
      return state
    },
    // we assume that account balances are loading as long as we have no GBYTE state.
    loading(): boolean {
      return state['GBYTE'] ? false : true
    },
    formattedBalances(): * {
      let keys = Object.keys(state)
      let formattedBalances = {}

      keys.forEach(key => {
        formattedBalances[key] = formatNumber(state[key].balance, { precision: 2 })
      })

      return formattedBalances
    },
    tokenChartBalances(): * {
      let keys = Object.keys(state)
      let numericBalances = []

      keys.forEach(key => {
        let value = round(state[key].balance)
        if (value !== 0) numericBalances.push({symbol: key, value })
      })

      return numericBalances
    },
    gbyteBalance(): ?number {
      return state['GBYTE'] ? state['GBYTE'].balance : null
    },
    formattedGbyteBalance(): ?string {
      return state['GBYTE'] ? formatNumber(state['GBYTE'].balance, { precision: 2 }) : null
    },
    tokenBalance(symbol: string): ?number {
      return state[symbol] ? state[symbol].balance : null
    },
    numericTokenBalance(symbol: string): ?number {
      return state[symbol] ? Number(state[symbol].balance) : null
    },
    formattedTokenBalance(symbol: string) {
      return state[symbol] ? formatNumber(state[symbol].balance, { precision: 2 }) : null
    },
    get(symbol: string): ?number {
      return state[symbol] ? state[symbol].balance : null
    },
    isSubscribed(symbol: string): boolean {
      return state[symbol] ? state[symbol].subscribed : false
    },
    getBalances(tokens: Array<Object>, currency: Object) {
      return (tokens: any).map(token => {        
        if (!state[token.symbol]) {
          return {
            ...token,
            balance: null,
            value: null
          }
        }

        let balance = state[token.symbol].balance
        let exchangeRate = getExchangeRate(currency.name, token)

        //In case the exchange rate is equal to 0 (meaning the token is not listed on the price feed, the value is set to null
        //In case the exchange rate is defined but the balance is empty, value is set to 0
        let value = exchangeRate ? balance * exchangeRate : null

        return {
          ...token,
          balance: balance,
          value: value,
        }
      })
    },
    getBalancesBySymbol(symbols: Array<string>) {
      return (symbols: any).map(symbol => {        
        if (!state[symbol]) {
          return {
            balance: null,
          }
        }

        let balance = state[symbol].balance

        return {
          balance: balance,
          
        }
      })
    },
    balancesArray() {
      return (Object.values(state): any).map(item => {
        return {
          symbol: item.symbol,
          balance: formatNumber(item.balance, { precision: 2 }),
        }
      })
    }
  }
}
