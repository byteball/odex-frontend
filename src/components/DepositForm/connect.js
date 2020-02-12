// @flow
import { connect } from 'react-redux';
import getDepositFormSelector, {
  queryBalances,
} from '../../store/models/depositForm';

import type { State } from '../../types'

export const mapStateToProps = (state: State, ownProps: Object) => {
  const depositFormSelector = getDepositFormSelector(state);

  return {
    token: ownProps.token,
    tokens: depositFormSelector.rankedTokens(),
    balances: depositFormSelector.balances(),
    address: depositFormSelector.accountAddress(),
    exchangeAddress: depositFormSelector.exchangeAddress(),
    step: depositFormSelector.getStep(),
  };
};

export const mapDispatchToProps = {
  queryBalances,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
