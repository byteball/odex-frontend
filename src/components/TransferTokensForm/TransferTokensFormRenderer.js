// @flow
import React from 'react';
import styled from 'styled-components';
import { Button, ControlGroup, InputGroup, Label, Callout } from '@blueprintjs/core';
import ReactGA from 'react-ga'
import TokenSelect from '../TokenSelect';
import { ModalBody } from '../Common'
import { PROTOCOL } from '../../config/urls'

type Props = {
  tokens: Array<Object>,
  token: Object,
  amount: number,
  address: string,
  exchangeAddress: string,
  base64data: string,
  handleChange: (SyntheticInputEvent<>) => void,
  handleTokenChange: (SyntheticEvent<>) => void,
};

const TransferTokensFormRenderer = (props: Props) => {
  const {
    tokens,
    token,
    amount,
    address,
    handleChange,
    handleTokenChange,
    exchangeAddress,
    base64data
  } = props;

  const withdrawGA = (symbol) => {
    ReactGA.event({
      category: 'ODEX',
      action: 'Withdraw',
      label: symbol
    });
  }

  return (
    <ModalBody>
      <Label helpertext="(in token decimals)" text="Amount to withdraw">
        <ControlGroup fill vertical={false}>
          <InputGroup
            //icon="filter"
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
          <TokenSelect token={token} tokens={tokens} onChange={handleTokenChange} />
        </ControlGroup>
      </Label>
      <br />
      <WithdrawLinkBox>
        <a onClick={()=>{withdrawGA(token.symbol)}} href={PROTOCOL + exchangeAddress + "?amount=10000&base64data=" + encodeURIComponent(base64data) + "&from_address=" + address}>Withdraw {amount} {token.symbol}</a>
      </WithdrawLinkBox>
      {/*<Button text="Withdraw" intent="primary" large type="submit" fill onClick={handleSubmit} />*/}
    </ModalBody>
  );
};



const WithdrawLinkBox = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const TxNotificationBox = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default TransferTokensFormRenderer;
