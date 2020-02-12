// @flow
import {
  getAccountBalancesDomain,
  getAccountDomain,
} from '../domains';

import { push } from 'connected-react-router'

import type { State, ThunkAction } from '../../types';

export default function getStartedModalSelector(state: State) {
  let { address } = getAccountDomain(state);
  let accountBalancesDomain = getAccountBalancesDomain(state);

  return {
    address: () => address,
    GBYTEBalance: () => accountBalancesDomain.gbyteBalance(),
  };
}


export const redirectToTradingPage = (): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(push('/trade'))
  }
}

export const redirectToFAQPage = (): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(push('/faq'))
  }
}

