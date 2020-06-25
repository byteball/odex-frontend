// @flow
import * as notifierActionCreators from '../actions/app'
import { getOrdersDomain, getAccountDomain } from '../domains';
import type { State, ThunkAction } from '../../types'

import { parseCancelOrderError } from '../../config/errors'

export default function ordersTableSelector(state: State) {
  let { authenticated, address, referenceDisplayMode } = getAccountDomain(state)
  let ordersDomain = getOrdersDomain(state)

  return {
    orders: ordersDomain.lastOrders(50),
    address,
    authenticated,
    referenceDisplayMode
  };
}

export const cancelOrder = (hash: string): ThunkAction => {
  return async (dispatch, getState, { socket, mixpanel }) => {
    mixpanel.track('trading-page/cancel-order');

    try {
      let { sessionId } = getAccountDomain(getState())
      let orderCancelPayload = {orderHash: hash, sessionId}

      dispatch(notifierActionCreators.addSuccessNotification({ message: `Cancelling order ...` }))
      socket.sendNewOrderCancelMessage(orderCancelPayload)
    } catch (error) {

      let message = parseCancelOrderError(error)
      return dispatch(notifierActionCreators.addErrorNotification({ message }))
    }
  }
}
