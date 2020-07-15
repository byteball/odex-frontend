// @flow
import type { WalletInfoState } from '../../types/walletInfo'

const initialState = {
    passphrase: ''
}

export const initialized = () => {
    const event = (state: WalletInfoState = initialState) => state
    return event
}

export const passphraseUpdated = (passphrase: string) => {
    const event = (state: WalletInfoState) => ({
        ...state,
        passphrase
    })
    return event;
}


export default function walletInfoDomain(state: WalletInfoState) {
    return {
        passphrase: state.passphrase
    }
}

