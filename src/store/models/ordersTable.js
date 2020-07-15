// @flow
import * as notifierActionCreators from '../actions/app'
import { getOrdersDomain, getAccountDomain, getWalletInfoDomain } from '../domains';
import type { State, ThunkAction } from '../../types'

import { parseCancelOrderError } from '../../config/errors'

export default function ordersTableSelector(state: State) {
  let { authenticated, address, displayMode, browserWallet } = getAccountDomain(state)
  let ordersDomain = getOrdersDomain(state)
  let { passphrase } = getWalletInfoDomain(state)

  return {
    orders: ordersDomain.lastOrders(50),
    address,
    authenticated,
    displayMode,
    browserWallet,
    passphrase
  };
}

export const cancelOrder = (signedCancel: string): ThunkAction => {
  return async (dispatch, getState, { socket, mixpanel }) => {
    mixpanel.track('trading-page/cancel-order');

    try {
      dispatch(notifierActionCreators.addSuccessNotification({ message: `Cancelling order ...` }))
      socket.sendNewOrderCancelMessage(signedCancel)
    } catch (error) {
      let message = parseCancelOrderError(error)
      return dispatch(notifierActionCreators.addErrorNotification({ message }))
    }
  }
}
