// @flow
import { connect } from 'react-redux';
import getWalletPageSelector, {
  queryAccountData,
  redirectToTradingPage,
} from '../../store/models/walletPage';

import { removeNotification } from '../../store/actions/app';
import { closeHelpModal } from '../../store/actions/walletPage'

import type { State } from '../../types'


export function mapStateToProps(state: State ) {
  let walletPageSelector = getWalletPageSelector(state)

  return {
    ...walletPageSelector
  }
}

export const mapDispatchToProps = {
  queryAccountData,
  removeNotification,
  redirectToTradingPage,
  closeHelpModal
};

export default connect(mapStateToProps, mapDispatchToProps)
