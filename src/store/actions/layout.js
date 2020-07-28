// @flow
import type { UpdateAppDataAction, UpdateReferenceCurrencyAction, UpdateDisplayModeAction, UpdateAuthorizationsAction } from '../../types/layout'
import type { Tokens, TokenPairs } from '../../types/tokens'
import type { DisplayMode } from '../../types/account'

const actionTypes = {
    updateAppData: 'layout/UPDATE_APP_DATA',
    updateReferenceCurrency: 'layout/UPDATE_REFERENCE_CURRENCY',
    updateDisplayMode: 'layout/UPDATE_DISPLAY_MODE',
    updateAuthorizations: 'layout/UPDATE_AUTHORIZATIONS'
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

export function updateDisplayMode(displayMode: DisplayMode): UpdateDisplayModeAction {
    return {
        type: actionTypes.updateDisplayMode,
        payload: { displayMode }
    }
}

export function updateAuthorizations(authorizations: string[]): UpdateAuthorizationsAction {
    return {
        type: actionTypes.updateAuthorizations,
        payload: { authorizations }
    }
}

export default actionTypes