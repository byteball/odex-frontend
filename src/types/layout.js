export type UpdateAppDataAction = {
  type: 'layout/UPDATE_APP_DATA',
  payload: { tokens: Array<Tokens>, pairs: Array<TokenPairs> }
}

export type UpdateReferenceCurrencyAction = {
  type: 'walletPage/UPDATE_REFERENCE_CURRENCY',
  payload: { referenceCurrency: string },
};

export type UpdateDisplayModeAction = {
  type: 'walletPage/UPDATE_DISPLAY_MODE',
  payload: { displayMode: DisplayMode },
};

export type LayoutAction =
  | UpdateAppDataAction
  | UpdateReferenceCurrencyAction
  | UpdateDisplayModeAction