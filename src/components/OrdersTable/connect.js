// @flow
import { connect } from 'react-redux'
import ordersTableSelector, { cancelOrder } from '../../store/models/ordersTable'
import { addErrorNotification } from '../../store/actions/app'
import { updatePassphrase } from '../../store/actions/walletInfo'
import type { State } from '../../types'

type Props = {
  onCollapse: string => void
}

export const mapStateToProps = (state: State, ownProps: Props) => {
  let selector = ordersTableSelector(state)

  return {
    ...selector,
    ...ownProps
  }
}

export const mapDispatchToProps = { 
  cancelOrder, 
  updatePassphrase,
  addErrorNotification 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
