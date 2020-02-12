// @flow
import type {
  UpdateCurrentPairAction,
} from '../../types/marketsTable';

const actionTypes = {
  updateBalance: 'marketsTable/UPDATE_BALANCE',
  updateBalances: 'marketsTable/UPDATE_BALANCES',
  updateCurrentPair: 'marketsTable/UPDATE_CURRENT_PAIR',
  updateTokenPairs: 'marketsTable/UPDATE_TOKEN_PAIRS',
  updateShowHelpModal: 'marketsTable/UPDATE_SHOW_HELP_MODAL',
  updateExchangeAddress: 'marketsTable/UPDATE_EXCHANGE_ADDRESS'
};

export function updateCurrentPair(pair: string): UpdateCurrentPairAction {
  return {
    type: actionTypes.updateCurrentPair,
    payload: { pair },
  };
}

export default actionTypes;
