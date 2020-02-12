import React from 'react';
import styled from 'styled-components';
import { Button, Callout, ControlGroup, Spinner, InputGroup } from '@blueprintjs/core';
import { ModalBody, ModalFooter } from '../../Common'
import TokenSuggest from '../../TokenSuggest';
import { PROTOCOL } from '../../../config/urls'

class WaitingFormRenderer extends React.PureComponent<Props, State> {

state = {
  amount: '',
};

handleAmountInputChange = (e: SyntheticInputEvent<>) => {
  this.setState({ amount: e.target.value });
};

render() {
  const {
    tokens,
    token,
    address,
    exchangeAddress,
    balance,
    handleChangeToken,
    handleSubmitChangeToken,
    toggleTokenSuggest,
    showTokenSuggest,
  } = this.props;

  let amountInSmallestUnits = parseFloat(this.state.amount || 0) * Math.pow(10, token.decimals);

  return (
    <ModalBody>
        Click the link below to send {token.symbol} to the Autonomous Agent of the exchange. The link will open your Obyte wallet. This form will update once your account balance is changed.
      <WaitingFormBox>
        {/*<Spinner intent="primary" large />*/}
        {/*<Address>{address}</Address>*/}
        <AmountBox>
          <InputGroup
            type="number"
            placeholder="Amount"
            rightElement={<TokenNameBox>{token.symbol}</TokenNameBox>}
            value={this.state.amount}
            onChange={this.handleAmountInputChange}
          />
        </AmountBox>
        <a href={PROTOCOL+exchangeAddress + "?asset=" + encodeURIComponent(token.asset) + "&amount=" + amountInSmallestUnits + "&from_address=" + address}>Deposit {this.state.amount} {token.symbol}</a>
        <CurrentBalanceBox>
          (Your current balance is {balance} {token.symbol})
        </CurrentBalanceBox>
      </WaitingFormBox>
      <ModalFooter>
        {showTokenSuggest ? (
          <ControlGroup>
            <Button onClick={toggleTokenSuggest} text="Cancel" minimal />
            <TokenSuggest tokens={tokens} token={token} onChange={handleChangeToken} />
            <Button intent="primary" text="Confirm" onClick={handleSubmitChangeToken} />
          </ControlGroup>
        ) : (
          <ControlGroup>
            <Button onClick={toggleTokenSuggest} text="Deposit another token" />
          </ControlGroup>
        )}
      </ModalFooter>
    </ModalBody>
  );
};
}

const WaitingFormBox = styled.div`
  margin: auto;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const CurrentBalanceBox = styled.div`
  padding-top: 4px;
`;

const Address = styled.div`
  padding-top: 40px;
  font-weight: bold;
`;

const AmountBox = styled.div`
  padding-bottom: 20px;
`;

const TokenNameBox = styled.div`
  padding-right: 5px;
  padding-top: 6px;
`;

export default WaitingFormRenderer;
