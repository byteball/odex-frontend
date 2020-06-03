import { connect } from 'react-redux'
import walletInfoSelector, { detectToken, addToken, registerToken } from '../../store/models/walletInfo'
import getTransferTokensFormSelector from '../../store/models/transferTokensForm'


const mapStateToProps = (state: State) => {
  let selector = walletInfoSelector(state)
  const transferTokensFormSelector = getTransferTokensFormSelector(state)

  return {
      ...selector,
      exchangeAddress: transferTokensFormSelector.exchangeAddress()
  }
}

const mapDispatchToProps = {
  detectToken,
  addToken,
  registerToken,
}

export default connect(mapStateToProps, mapDispatchToProps)
