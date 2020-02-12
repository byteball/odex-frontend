// @flow
import React from 'react';
import RecentTxTableRenderer from './RecentTxTableRenderer';
//import type Trade from '../../types/trades';

import type { Tx } from '../../types/transactions';

import { EXPLORER_URL } from '../../config/urls'

type Props = {
  transactions: Array<Tx>,
};

class RecentTxTable extends React.PureComponent<Props> {

  openExplorerLink = (txHash: string) => {
    if (txHash !== "") window.open(`${EXPLORER_URL}#${txHash}`)
  }

  render() {
    const {
      props: { transactions },
      openExplorerLink
    } = this;

    return (
      <RecentTxTableRenderer
        transactions={transactions}
        openExplorerLink={openExplorerLink}
      />
    );
  }
}

export default RecentTxTable
