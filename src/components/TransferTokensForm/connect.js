// @flow
import { connect } from 'react-redux';
import getTransferTokensFormSelector from '../../store/models/transferTokensForm';

import type { State } from '../../types';
import type { Token } from '../../types/tokens';

type Props = {
  token: Token,
};

export const mapStateToProps = (state: State, ownProps: Props) => {
  const transferTokensFormSelector = getTransferTokensFormSelector(state);

  return {
    token: ownProps.token,
    tokens: transferTokensFormSelector.tokens(),
    exchangeAddress: transferTokensFormSelector.exchangeAddress(),
    address: transferTokensFormSelector.address(),
  };
};

export const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
