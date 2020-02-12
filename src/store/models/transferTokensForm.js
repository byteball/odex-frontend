// @flow
import { getTokenDomain, getAccountDomain } from '../domains';

import type { State, ThunkAction } from '../../types';
import type { RankedToken } from '../../types/tokens'

export default function transferTokensFormSelector(state: State) {
  let tokenDomain = getTokenDomain(state);

  let tokens: Array<RankedToken> = tokenDomain.rankedTokens()

  return {
    tokens: () => tokens,
    exchangeAddress: () => getAccountDomain(state).exchangeAddress,
    address: () => getAccountDomain(state).address,
  };
}


