// @flow
import type { AccountState, AccountParams, ReferenceCurrency, DisplayMode, BrowserWallet } from '../../types/account'
import { displayModes } from '../../config'

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

// generateRandomString :: Integer -> String
function generateRandomString(len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

const initialState = {
  loaded: false,
  sessionId: generateRandomString(),
  address: null,
  showHelpModal: true,
  exchangeAddress: '',
  operatorAddress: '',
  referenceCurrency: { name: 'USD', symbol: '$'},
  displayMode: { name: 'Price', priceAlias: 'PRICE', amountAlias: 'AMOUNT' },
  browserWallet: { phrase: '', address: '', authorized: false, encrypted: false, requestConfirm: false },
  authorizations: []
}

export const initialized = () => {
  const event = (state: AccountState = initialState) => state
  return event
}

export const updated = (newAccountState: AccountParams) => {
  const event = (state: AccountState = initialState) => ({
    ...state,
    ...newAccountState
  })
  
  return event
}

export const accountLoaded = (loaded: boolean) => {
  const event = (state: AccountState) => ({
    ...state,
    loaded
  })

  return event
}

export const accountUpdated = (address: string) => {
  const event = (state: AccountState) => ({
    ...state,
    address,
  })
  return event
}

export const accountRemoved = () => {
  const event = (state: AccountState) => ({
    ...state,
    address: null,
  })

  return event
}


export const showHelpModalUpdated = (showHelpModal: boolean) => {
  const event = (state: AccountState) => ({
    ...state,
    showHelpModal
  })

  return event
}

export const exchangeAddressUpdated = (exchangeAddress: string) => {
  const event = (state: AccountState) => ({
    ...state,
    exchangeAddress
  })

  return event
}

export const referenceCurrencyUpdated = (referenceCurrency: ReferenceCurrency) => {
  const event = (state: AccountState) => ({
    ...state,
    referenceCurrency: {
      name: referenceCurrency.name,
      symbol: referenceCurrency.symbol
    }
  })

  return event
}

export const displayModeUpdated = (displayMode: DisplayMode) => {
  const event = (state: AccountState) => ({
    ...state,
    displayMode
  })

  return event
}

export const browserWalletUpdated = (browserWallet: BrowserWallet) => {
  const event = (state: AccountState) => ({
    ...state,
    browserWallet
  })

  return event
}

export const authorizationsUpdated = (authorizations: string[]) => {
  const event = (state: AccountState) => ({
    ...state,
    authorizations
  })

  return event
}

export default function accountDomain(state: AccountState) {
  return {
    appIsLoaded: state.loaded,
    sessionId: state.sessionId,
    authenticated: state.address !== null,
    address: state.address,
    showHelpModal: state.showHelpModal,
    exchangeAddress: state.exchangeAddress,
    operatorAddress: state.operatorAddress,
    referenceCurrency: state.referenceCurrency,
    referenceCurrencyName: state.referenceCurrency.name,
    displayMode: state.displayMode ? state.displayMode : displayModes[0],
    browserWallet: state.browserWallet || {},
    authorizations: state.authorizations || []
  };
}