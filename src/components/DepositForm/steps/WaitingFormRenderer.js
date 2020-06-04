import React from 'react';
import styled from 'styled-components';
import { ControlGroup, InputGroup, Label, Text } from '@blueprintjs/core';
import ReactGA from 'react-ga';
import { ModalBody } from '../../Common'
import { PROTOCOL } from '../../../config/urls'
import TokenSelect from '../../TokenSelect';

const WaitingFormRenderer = (props: Props) => {
  const {
    tokens,
    token,
    amount,
    address,
    handleChange,
    handleTokenChange,
    exchangeAddress,
    balance
  } = props;
  const depositGA = (symbol) => {
    ReactGA.event({
      category: 'ODEX',
      action: 'Deposit',
      label: symbol
    });
  }

  const amountInSmallestUnits = parseFloat(amount || 0) * Math.pow(10, token.decimals);

  return (
    <ModalBody>
      <Text muted>Click the link below to send {token.symbol} to the Autonomous Agent of the exchange. The link will open your Obyte wallet. This form will update once your account balance is changed.</Text>
      <br />
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
      <DepositLinkBox>
        <a onClick={() => depositGA(token.symbol)} href={PROTOCOL+exchangeAddress + "?asset=" + encodeURIComponent(token.asset) + "&amount=" + amountInSmallestUnits + "&from_address=" + address}>Deposit {amount} {token.symbol}</a>
      </DepositLinkBox>
      <CurrentBalanceBox>
        (Your current balance is {balance} {token.symbol})
      </CurrentBalanceBox>
    </ModalBody>
  );
};

const DepositLinkBox = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const CurrentBalanceBox = styled.div`
  padding-top: 4px;
  text-align: center;
`;

export default WaitingFormRenderer;
