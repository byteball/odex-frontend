//@flow
const actionTypes = {
  updateTokens: 'tokens/UPDATE_TOKENS',
  removeTokens: 'tokens/REMOVE_TOKENS',
};

//deprecated
export function updateTokens(asset: string, symbol: string) {
  return {
    type: actionTypes.updateTokens,
    payload: { asset, symbol },
  };
}

//deprecated
export function removeTokens(symbol: string) {
  return {
    type: actionTypes.removeTokens,
    payload: { symbol },
  };
}

export default actionTypes;
