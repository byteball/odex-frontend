//@flow
import React from 'react';
import DepositFormRenderer from './DepositFormRenderer';

import type { Token } from '../../types/tokens';
import type { AccountBalance } from '../../types/accountBalances';

type Step = 'waiting' | 'convert' | 'confirm';

type Props = {
  step: Step,
  balances: { [string]: number },
  address: string,
  exchangeAddress: string,
  token: Token,
  tokens: Array<Token>,
  queryBalances: void => void,
};

type State = {
  token: Token,
  inputToken: ?Token,
  showTokenSuggest: boolean,
};

class DepositForm extends React.PureComponent<Props, State> {
  state = {
    token: this.props.token || this.props.tokens[0],
    inputToken: null,
    showTokenSuggest: false,
  };

  componentDidMount() {
    const { token } = this.state;
    this.props.queryBalances();
  }

  //TODO handle the case where the modal is closed but not unmounted which
  //TODO causes the unsubscribtion to not happen
  componentWillUnmount() {
    //this.unsubscribe();
  }



  handleChangeToken = (e: Object) => {
    this.setState({ inputToken: e });
  };

  handleSubmitChangeToken = async (e: SyntheticEvent<>) => {
    const newToken = this.state.inputToken || this.state.token;
    this.setState({ showTokenSuggest: false, token: newToken });
    // this.subscribe(newToken);
  };



  toggleTokenSuggest = () => {
    this.setState({ showTokenSuggest: !this.state.showTokenSuggest });
  };



  render() {
    const { step, balances, address, exchangeAddress, tokens } = this.props;
    const { inputToken, showTokenSuggest, token } = this.state;
    const balance = balances[token.symbol] || null;

    return (
      <DepositFormRenderer
        step={step}
        tokens={tokens}
        token={token}
        inputToken={inputToken}
        balance={balance}
        address={address}
        exchangeAddress={exchangeAddress}
        toggleTokenSuggest={this.toggleTokenSuggest}
        showTokenSuggest={showTokenSuggest}
        handleChangeToken={this.handleChangeToken}
        handleSubmitChangeToken={this.handleSubmitChangeToken}
      />
    );
  }
}

export default DepositForm;
