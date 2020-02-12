// @flow

export type UpdateCurrentPairAction = {
  type: 'marketsTable/UPDATE_CURRENT_PAIR',
  payload: { pair: string },
};

export type MarketsTableActions =
  | UpdateCurrentPairAction
