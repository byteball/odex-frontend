// @flow

import type { Token, TokenPairs } from './tokens'
import type { BrowserWallet } from './account'

export type WalletInfoState = {
    passphrase: string
}

export type AddTokenAction = {
    type: 'walletInfo/ADD_TOKEN',
    payload: { token: Token, pairs: TokenPairs }
}

export type RegisterTokenAction = {
    type: 'walletInfo/REGISTER_TOKEN',
    payload: { pairs: TokenPairs }
}

export type UpdateBrowserWalletAction = {
    type: 'walletInfo/UPDATE_BROWSER_WALLET',
    payload: { browserWallet: BrowserWallet }
}

export type UpdatePassphraseAction = {
    type: 'walletInfo/UPDATE_PASSPHRASE',
    payload: { passphrase: string }
}
