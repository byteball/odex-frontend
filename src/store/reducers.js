// @flow
import createReducer from './createReducer'
import accountBalancesActionTypes from './actions/accountBalances'
import ohlcvActionTypes from './actions/ohlcv'
import tokenSearcherActionTypes from './actions/tokenSearcher'
import tokensActionTypes from './actions/tokens'
import accountActionTypes from './actions/account'
import depositFormActionTypes from './actions/depositForm'
//import settingsActionTypes from './actions/settings'
import walletPageActionTypes from './actions/walletPage'
import tradingPageActionTypes from './actions/tradingPage'
import socketControllerActionTypes from './actions/socketController'
import loginPageActionTypes from './actions/loginPage'
import logoutPageActionTypes from './actions/logoutPage'
import marketsPageActionTypes from './actions/marketsPage'
import appActionTypes from './actions/app'
import orderBookActionTypes from './actions/orderBook';
import marketsTableActionTypes from './actions/marketsTable';
import walletInfoActionTypes from './actions/walletInfo'
import layoutActionTypes from './actions/layout'

import * as accountBalancesEvents from './domains/accountBalances'
import * as loginPageEvents from './domains/loginPage'
import * as orderBookEvents from './domains/orderBook'
import * as tradeEvents from './domains/trades'
import * as orderEvents from './domains/orders'
import * as ohlcvEvents from './domains/ohlcv'
import * as tokensEvents from './domains/tokens'
import * as accountEvents from './domains/account'
import * as depositFormEvents from './domains/depositForm'
//import * as settingsEvents from './domains/settings'
import * as tokenPairsEvents from './domains/tokenPairs'
import * as notificationEvents from './domains/notifications'
import * as connectionEvents from './domains/connection'
import * as transactionEvents from './domains/transactions'
import * as statsEvents from './domains/stats'
import * as walletInfoEvents from './domains/walletInfo'

export const loginPage = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case loginPageActionTypes.requestLogin:
      return loginPageEvents.loginRequested()
    case loginPageActionTypes.loginError:
      return loginPageEvents.loginFailed(payload.error)
    case loginPageActionTypes.loginWithApp:
      return loginPageEvents.authenticated()
    default:
      return loginPageEvents.initialized()
  }
})

export const accountBalances = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case accountBalancesActionTypes.subscribeBalance:
      return accountBalancesEvents.subscribed(payload.symbol)
    case accountBalancesActionTypes.unsubscribeBalance:
      return accountBalancesEvents.unsubscribed(payload.symbol)
    case accountBalancesActionTypes.updateBalance:
      return accountBalancesEvents.updated([{ symbol: payload.symbol, balance: payload.balance }])
    case accountBalancesActionTypes.updateBalances:
      return accountBalancesEvents.updated(payload.balances)
    case accountBalancesActionTypes.clearBalances:
      return accountBalancesEvents.cleared()
    case depositFormActionTypes.subscribeBalance:
      return accountBalancesEvents.subscribed(payload.symbol)
    case depositFormActionTypes.unsubscribeBalance:
      return accountBalancesEvents.unsubscribed(payload.symbol)
    case depositFormActionTypes.updateBalance:
      return accountBalancesEvents.updated([{ symbol: payload.symbol, balance: payload.balance }])
    case depositFormActionTypes.updateBalances:
      return accountBalancesEvents.updated(payload.balances)
    case walletPageActionTypes.updateBalances:
      return accountBalancesEvents.updated(payload.balances)
    case walletPageActionTypes.updateBalance:
      return accountBalancesEvents.updated([{ symbol: payload.symbol, balance: payload.balance }])
    default:
      return accountBalancesEvents.initialized()
  }
})

export const transactions = createReducer(action => {
  const { type, payload } = action
  switch (type) {

    case walletPageActionTypes.updateWalletPageData:
      return transactionEvents.txsUpdated(payload.transactions)
    default:
      return transactionEvents.initialized()
  }
})


export const ohlcv = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case socketControllerActionTypes.initOHLCV:
    case ohlcvActionTypes.saveData:
      return ohlcvEvents.savedOHLCVData(payload.data)
    case ohlcvActionTypes.saveDuration:
      return ohlcvEvents.savedDuration(payload.data)
    case ohlcvActionTypes.saveTimeSpan:
      return ohlcvEvents.savedTimeSpan(payload.data)
    case ohlcvActionTypes.saveNoOfCandles:
      return ohlcvEvents.savedNoOfCandles(payload)
    case tokenSearcherActionTypes.updateCurrentPair:
    case tradingPageActionTypes.updateCurrentPair:
      return ohlcvEvents.ohlcvReset()
    default:
      return ohlcvEvents.initialized()
  }
})

export const trades = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case socketControllerActionTypes.updateTradesTable:
    case tradingPageActionTypes.updateTradesTable:
    case tokenSearcherActionTypes.updateTradesTable:
      return tradeEvents.tradesUpdated(payload.trades)
    case socketControllerActionTypes.initTradesTable:
    case tradingPageActionTypes.initTradesTable:
    case tokenSearcherActionTypes.initTradesTable:
      return tradeEvents.tradesInitialized(payload.trades)
    case tradingPageActionTypes.updateCurrentPair:
    case tokenSearcherActionTypes.updateCurrentPair:
        return tradeEvents.tradesReset()
    default:
      return tradeEvents.initialized()
  }
})

export const orderBook = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case orderBookActionTypes.select:
      return orderBookEvents.selected(payload.order);
    case tradingPageActionTypes.updateOrderBook:
    case tokenSearcherActionTypes.updateOrderBook:
    case socketControllerActionTypes.updateOrderBook:
      return orderBookEvents.orderBookUpdated(payload.bids, payload.asks)
    case tradingPageActionTypes.initOrderBook:
      return orderBookEvents.orderBookInitialized(payload.bids, payload.asks)
    case tokenSearcherActionTypes.initOrderBook:
      return orderBookEvents.orderBookInitialized(payload.bids, payload.asks)
    case socketControllerActionTypes.initOrderBook:
      return orderBookEvents.orderBookInitialized(payload.bids, payload.asks)
    case tradingPageActionTypes.updateCurrentPair:
    case tokenSearcherActionTypes.updateCurrentPair:
      return orderBookEvents.orderBookReset()
    default:
      return orderBookEvents.initialized()
  }
})

export const orders = createReducer(action => {
  const { type, payload } = action
  
  switch (type) {
    case socketControllerActionTypes.updateOrdersTable:
      return orderEvents.ordersUpdated(payload.orders)
    case tradingPageActionTypes.updateTradingPageData:
      return orderEvents.ordersInitialized(payload.orders)
    default:
      return orderEvents.initialized()
  }
})

export const tokens = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case tokensActionTypes.updateTokens:
      return tokensEvents.tokensUpdated(payload.tokens)
    case walletPageActionTypes.updateWalletPageData:
      return tokensEvents.tokensUpdated(payload.tokens)
    case layoutActionTypes.updateAppData:
      return tokensEvents.tokensUpdated(payload.tokens)
    case walletInfoActionTypes.addToken:
      return tokensEvents.tokensUpdated([payload.token])
    default:
      return tokensEvents.initialized()
  }
})

export const tokenPairs = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case tradingPageActionTypes.updateCurrentPair:
      return tokenPairsEvents.currentPairUpdated(payload.pair)
    case walletPageActionTypes.updateCurrentPair:
      return tokenPairsEvents.currentPairUpdated(payload.pair)
    case marketsTableActionTypes.updateCurrentPair:
      return tokenPairsEvents.currentPairUpdated(payload.pair)
    case tokensActionTypes.removeTokens:
      return tokenPairsEvents.tokenPairRemoved(payload)
    case tokenSearcherActionTypes.updateFavorite:
      return tokenPairsEvents.tokenPairFavorited(payload.code, payload.favorite)
    case tokenSearcherActionTypes.updateCurrentPair:
      return tokenPairsEvents.currentPairUpdated(payload.pair)
    case tradingPageActionTypes.updateTradingPageData:
      return tokenPairsEvents.tokenPairDataUpdated(payload.tokenPairData)
    case marketsPageActionTypes.updateMarketPageData:
      return tokenPairsEvents.tokenPairDataUpdated(payload.tokenPairData)
    case walletPageActionTypes.updateWalletPageData:
      return tokenPairsEvents.tokenPairsUpdated(payload.pairs)
    case layoutActionTypes.updateAppData:
      return tokenPairsEvents.tokenPairsUpdated(payload.pairs)
    case walletInfoActionTypes.addToken:
      return tokenPairsEvents.tokenPairsUpdated(payload.pairs)
    case walletInfoActionTypes.registerToken:
      return tokenPairsEvents.tokenPairsUpdated(payload.pairs)
    default:
      return tokenPairsEvents.initialized()
  }
})

export const account = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case layoutActionTypes.updateAppData:
      return accountEvents.accountLoaded(true)
    case accountActionTypes.updateAccount:
      return accountEvents.accountUpdated(payload.address)
    case loginPageActionTypes.loginWithApp:
      return accountEvents.accountUpdated(payload.address)
    case socketControllerActionTypes.login:
      return accountEvents.accountUpdated(payload.address)
    case walletPageActionTypes.updateShowHelpModal:
      return accountEvents.showHelpModalUpdated(payload.showHelpModal)
    case walletPageActionTypes.updateWalletPageData:
      return accountEvents.updated({ exchangeAddress: payload.exchangeAddress, operatorAddress: payload.operatorAddress })
    case layoutActionTypes.updateReferenceCurrency:
      return accountEvents.referenceCurrencyUpdated(payload.referenceCurrency)
    case layoutActionTypes.updateDisplayMode:
    case tradingPageActionTypes.updateDisplayMode:
      return accountEvents.displayModeUpdated(payload.displayMode)
    case walletInfoActionTypes.updateBrowserWallet:
      return accountEvents.browserWalletUpdated(payload.browserWallet)
    case layoutActionTypes.updateAuthorizations:
      return accountEvents.authorizationsUpdated(payload.authorizations)
    case logoutPageActionTypes.logout:
      return accountEvents.accountRemoved()
    default:
      return accountEvents.initialized()
  }
})

export const stats = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case marketsPageActionTypes.updateMarketPageData:
      return statsEvents.updated(payload.tradingStats)
    default:
      return statsEvents.initialized()
  }
})

export const depositForm = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case depositFormActionTypes.deposit:
      return depositFormEvents.deposited()
    case depositFormActionTypes.confirm:
      return depositFormEvents.confirmed()
    default:
      return depositFormEvents.initialized()
  }
})

export const walletInfo = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case walletInfoActionTypes.updatePassphrase:
      return walletInfoEvents.passphraseUpdated(payload.passphrase)
    default:
      return walletInfoEvents.initialized()
  }
})

/*
export const settings = createReducer(action => {
  const { type } = action
  switch (type) {
    default:
      return settingsEvents.initialized()
  }
})
*/

export const notifications = createReducer(action => {
  const { type, payload } = action
  switch (type) {
    case appActionTypes.addNotification:
      return notificationEvents.notificationAdded(payload.notificationType, payload.options)
    case appActionTypes.addSuccessNotification:
      return notificationEvents.notificationAdded(payload.notificationType, payload.options)
    case appActionTypes.addErrorNotification:
      return notificationEvents.notificationAdded(payload.notificationType, payload.options)
    case appActionTypes.removeNotification:
      return notificationEvents.notificationRemoved(payload.id)
    default:
      return notificationEvents.initialized()
  }
})

export const connection = createReducer(({ type }) => {
  switch (type) {
    case socketControllerActionTypes.createConnection:
      return connectionEvents.initiated()
    case socketControllerActionTypes.closeConnection:
    case socketControllerActionTypes.connectionError:
      return connectionEvents.closed()
    case socketControllerActionTypes.openConnection:
      return connectionEvents.opened()
    default:
      return connectionEvents.initialized()
  }
});
