// @flow
import React from 'react';
import TransferTokensFormRenderer from './TransferTokensFormRenderer';

import type { Token } from '../../types/tokens';

type State = {
  token: Token,
  amount: number,
};

type Props = {
  token: Token,
  tokens: Array<Token>,
  address: string,
  exchangeAddress: string,
};

class TransferTokensForm extends React.PureComponent<Props, State> {
  state = {
    token: this.props.token || this.props.tokens[0],
    amount: 0,
  };

  handleChange = (e: SyntheticInputEvent<>) => {
    const { value, name } = e.target;

    this.setState({ [name]: value }, () => {
    });
  };

  handleTokenChange = (token: Object) => {
    this.setState({ token: token }, () => {

    });
  };


  render() {
    let { tokens, exchangeAddress, address } = this.props;
    let { token, amount } = this.state;
    let data = {
      withdraw: 1,
      asset: token.asset, 
      amount: amount * Math.pow(10, token.decimals),
    };
    let base64data = btoa(JSON.stringify(data));

    return (
      <TransferTokensFormRenderer
        handleChange={this.handleChange}
        handleTokenChange={this.handleTokenChange}
        tokens={tokens}
        token={token}
        amount={amount}
        address={address}
        exchangeAddress={exchangeAddress}
        base64data={base64data}
      />
    );
  }
}

export default TransferTokensForm;
