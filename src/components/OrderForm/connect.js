// @flow
import { connect } from 'react-redux'
import orderFormSelector from '../../store/models/orderForm'
import type { State } from '../../types'

type Props = {
  onCollapse: string => void
}

export const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    ...orderFormSelector(state),
    ...ownProps
  }
}

export const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
