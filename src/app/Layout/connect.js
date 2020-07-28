//@flow
import { connect } from 'react-redux';
import layoutSelector, { queryAppData, 
  updateBrowserWalletAuthorization, 
  subscribeAA, 
  watchAaNotifications,
  updateAuthorizedAddresses
 } from '../../store/models/layout';
import { updateReferenceCurrency, updateDisplayMode } from '../../store/actions/layout'
import { updatePassphrase } from '../../store/actions/walletInfo'
import type { State } from '../../types'

export function mapStateToProps(state: State, props: Object) {
  const selectorData = layoutSelector(state);

  return {
    ...selectorData,
    locale: 'en',
    messages: 'TODO',
  };
}

const mapDispatchToProps = {
  updateReferenceCurrency,
  updateDisplayMode,
  queryAppData,
  updatePassphrase,
  updateBrowserWalletAuthorization,
  subscribeAA,
  watchAaNotifications,
  updateAuthorizedAddresses
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
