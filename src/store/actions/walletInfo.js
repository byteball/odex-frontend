// @flow

import type {
    AddTokenAction,
    RegisterTokenAction,
    UpdateBrowserWalletAction
} from '../../types/walletInfo'

import type { 
    Token,
    TokenPairs    
} from '../../types/tokens'

import type {
    BrowserWallet
} from '../../types/account'

const actionTypes = {
    addToken: 'walletInfo/ADD_TOKEN',
    registerToken: 'walletInfo/REGISTER_TOKEN',
    updateBrowserWallet: 'walletInfo/UPDATE_BROWSER_WALLET',
    updatePassphrase: 'walletInfo/UPDATE_PASSPHRASE'
}

export function addToken(token: Token, pairs: TokenPairs): AddTokenAction {
    return {
        type: actionTypes.addToken,
        payload: { token, pairs },
    }
}

export function registerToken(pairs: TokenPairs): RegisterTokenAction {
    return {
        type: actionTypes.registerToken,
        payload: { pairs }
    }
}

export function updateBrowserWallet(browserWallet: BrowserWallet): UpdateBrowserWalletAction {
    return {
        type: actionTypes.updateBrowserWallet,
        payload: { browserWallet }
    }
}

export function updatePassphrase(passphrase: string): UpdatePassphraseAction {
    return {
        type: actionTypes.updatePassphrase,
        payload: { passphrase }
    }
}

export default actionTypes