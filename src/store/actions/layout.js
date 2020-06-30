// @flow
import type { UpdateAppDataAction, UpdateReferenceCurrencyAction, UpdateDisplayModeAction } from '../../types/layout'
import type { Tokens, TokenPairs } from '../../types/tokens'

const actionTypes = {
    updateAppData: 'layout/UPDATE_APP_DATA',
    updateReferenceCurrency: 'layout/UPDATE_REFERENCE_CURRENCY',
    updateDisplayMode: 'layout/UPDATE_DISPLAY_MODE'
}

export function updateAppData(tokens: Array<Tokens>, pairs: Array<TokenPairs>): UpdateAppDataAction {
    return {
        type: actionTypes.updateAppData,
        payload: { tokens, pairs }
    }
}

export function updateReferenceCurrency(referenceCurrency: string): UpdateReferenceCurrencyAction {
    return {
        type: actionTypes.updateReferenceCurrency,
        payload: { referenceCurrency },
    }
}

export function updateDisplayMode(displayMode: Object): UpdateDisplayModeAction {
    return {
        type: actionTypes.updateDisplayMode,
        payload: { displayMode }
    }
}

export default actionTypes