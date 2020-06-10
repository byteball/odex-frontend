import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@blueprintjs/core'
import { EXPLORER_URL } from '../../config/urls';
import { Loading, Colors, CenteredMessage, SmallText, FlexRow, Box } from '../Common';
import type { TokenData } from '../../types/tokens';
import { relativeDate } from '../../utils/helpers';

type Props = {
  accountAddress: string,
  transactions: Array,
  exchangeAddress: string,
  tokenData: Array<TokenData>,
};

const TransactionsTable = (props: Props) => {
  const { transactions, tokenData, exchangeAddress, accountAddress } = props;

  if (!transactions) return <Loading />;
  if (transactions.length === 0) return <NoTransactionsMessage>No recent transactions</NoTransactionsMessage>;

  return (
    <div>
      {transactions.map(({ unit: { authors, messages, unit, timestamp } }, tIndex) => {
        const authorAddresses = authors.map(author => author.address);
        const isDeposit = authorAddresses.indexOf(accountAddress) >= 0;
        if (!isDeposit && authorAddresses.indexOf(exchangeAddress) < 0) {
          // not deposit/withdraw
          return null;
        }
        const destAddress = isDeposit ? exchangeAddress : accountAddress
        if (messages.length === 0) return null;
        const tRows = messages.map(({payload: {outputs, asset = 'base'}}) => {
          if (outputs.map(output => output.address).indexOf(destAddress) < 0) {
            // not deposit/withdraw
            return null
          }
          
          let amount
          if (outputs.length === 1) {
            ({amount} = outputs[0]);
          } else {
            if (isDeposit) {
              amount = outputs.find(output => output.address !== accountAddress).amount;
            } else {
              amount = outputs.find(output => output.address === accountAddress).amount;
            }
          }
          
          const tokenInfo = tokenData.find(tokenElement => tokenElement.asset === asset);
          if (asset === 'base' && amount <= 10000) return null;
          const symbol = tokenInfo ? tokenInfo.symbol : String(asset).slice(0, 4)
          const decimals = tokenInfo ? tokenInfo.decimals : 0
  
          return (
            <TransactionRow key={unit}>
              <TransactionLink href={`${EXPLORER_URL}#${unit}`} target="_blank">
                <InfoRow>
                  <span>
                    {isDeposit ? 'Deposit' : 'Withdraw'}&nbsp;
                    {amount / Math.pow(10, decimals)}
                    &nbsp;
                    {symbol}
                  </span>
                  &nbsp;
                  <Tooltip position="top" content={new Date(timestamp * 1000).toLocaleString()}>
                    <span>{relativeDate(timestamp * 1000)}</span>
                  </Tooltip>
                </InfoRow>
              </TransactionLink>
            </TransactionRow>
          );
        })
        return tRows;
      })}
    </div>
  );
};

const TransactionLink = styled.a`
  word-break: break-all;
`;

const InfoRow = styled.div`
  word-break: break-all;
  display: flex;
  justify-content: space-between;
  span: first-child {
    flex: 1;
  }
`;

const NoTransactionsMessage = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 150px;
  align-items: center;
  align-content: center;
`;

const TransactionRow = styled.div`
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  padding: 7px;
  border: 1px transparent;
  border-radius: 2px;
  box-shadow: inset 0px 1px 0 0 rgba(16, 22, 26, 0.15);
  &:hover {
    background-color: ${Colors.BLUE_MUTED};
  }
`;

export default TransactionsTable;
