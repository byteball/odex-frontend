import { connect } from 'react-redux';
import walletInfoSelector, { detectToken, addToken, registerToken } from '../../store/models/walletInfo';
import getTransferTokensFormSelector from '../../store/models/transferTokensForm';

const mapStateToProps = (state: State) => {
  const transferTokensFormSelector = getTransferTokensFormSelector(state);
  let selector = walletInfoSelector(state);
  return {
    ...selector,
    exchangeAddress: transferTokensFormSelector.exchangeAddress(),
  };
};

const mapDispatchToProps = {
  detectToken,
  addToken,
  registerToken,
};

export default connect(mapStateToProps, mapDispatchToProps);
