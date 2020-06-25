// @flow
import type { UpdateAppDataAction, UpdateReferenceCurrencyAction, UpdateReferenceDisplayModeAction } from '../../types/layout'
import type { Tokens, TokenPairs } from '../../types/tokens'

const actionTypes = {
    updateAppData: 'layout/UPDATE_APP_DATA',
    updateReferenceCurrency: 'layout/UPDATE_REFERENCE_CURRENCY',
    updateReferenceDisplayMode: 'layout/UPDATE_REFERENCE_TRADING_MODE'
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

export function updateReferenceDisplayMode(referenceDisplayMode: Object): UpdateReferenceDisplayModeAction {
    return {
        type: actionTypes.updateReferenceDisplayMode,
        payload: { referenceDisplayMode }
    }
}

export default actionTypes