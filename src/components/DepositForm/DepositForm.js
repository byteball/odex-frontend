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
    amount: 0,
  };

  componentDidMount() {
    this.props.queryBalances();
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { value, name } = e.target;

    this.setState({ [name]: value }, () => {
    });
  };

  handleTokenChange = (token: Object) => {
    this.setState({ token: token }, () => {

    });
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
    const { tokens, exchangeAddress, address, step,balances } = this.props;
    const { token, amount } = this.state;
    const balance = balances[token.symbol] || null;

    return (
      <DepositFormRenderer
        step={step}
        balance={balance}
        handleChange={this.handleChange}
        handleTokenChange={this.handleTokenChange}
        tokens={tokens}
        token={token}
        amount={amount}
        address={address}
        exchangeAddress={exchangeAddress}
      />
    );
  }
}

export default DepositForm;
