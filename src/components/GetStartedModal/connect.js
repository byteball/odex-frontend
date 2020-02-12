// @flow
import { connect } from 'react-redux';

import getGetStartedModalSelector, { 
  redirectToTradingPage,
  redirectToFAQPage,
} from '../../store/models/getStartedModal'
import getDepositFormSelector from '../../store/models/depositForm';

import type { State } from '../../types';

export const mapStateToProps = (state: State, ownProps: Object) => {
  const selector = getGetStartedModalSelector(state)
  const depositFormSelector = getDepositFormSelector(state);

  return {
    tokens: depositFormSelector.rankedTokens(),
    balances: depositFormSelector.balances(),
    GBYTEBalance: selector.GBYTEBalance(),
    address: selector.address(),
    closeModal: ownProps.closeHelpModal,
  }
}

const mapDispatchToProps = {
  redirectToTradingPage,
  redirectToFAQPage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
