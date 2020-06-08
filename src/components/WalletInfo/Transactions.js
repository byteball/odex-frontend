import React from 'react';
import styled from 'styled-components';
import { formatNumber } from 'accounting-js';

import { EXPLORER_URL } from '../../config/urls';
import { Loading, Colors, CenteredMessage, SmallText, FlexRow, Box } from '../Common';
import { getTimeBeforeString } from '../../helpers/utils';
import type { TokenData } from '../../types/tokens';

type Props = {
  accountAddress: string,
  transactions: Array,
  exchangeAddress: string,
  tokenData: Array<TokenData>,
};

const TransactionsTable = (props: Props) => {
  const { accountAddress, transactions, tokenData } = props;
  const openExplorerLink = (txHash: string) => {
    if (txHash !== '') window.open(`${EXPLORER_URL}#${txHash}`);
  };

  if (!transactions) return <Loading />;
  if (transactions.length === 0) return <NoTransactionsMessage>No recent transactions</NoTransactionsMessage>;

  return (
    <div>
      {transactions.map(({ unit: { authors, messages, unit, timestamp } }) => {
        const isDeposit = authors.map(ele => ele.address).indexOf(accountAddress) >= 0;
        if (messages.length === 0) return null;
        const { outputs, asset = 'base' } = messages[0].payload;
        let amount = outputs.find(ele => ele.address === accountAddress).amount;
        if (isDeposit) {
          amount = outputs.find(ele => ele.address !== accountAddress).amount;
        }
        const tokenInfo = tokenData.find(tEle => tEle.asset === asset);

        return (
          <TransactionRow key={unit}>
            <TransactionLink href={`${EXPLORER_URL}#${unit}`} target="_blank">
              <InfoRow>
                <span>
                  {isDeposit ? 'Deposit' : 'Withdraw'}&nbsp;
                  {amount / Math.pow(10, tokenInfo.decimals)}
                  &nbsp;
                  {tokenInfo.symbol}
                </span>
                <span>{getTimeBeforeString(timestamp)}</span>
              </InfoRow>
            </TransactionLink>
          </TransactionRow>
        );
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
