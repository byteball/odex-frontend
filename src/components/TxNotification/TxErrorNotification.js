// @flow
import React from 'react';
import { Callout, Intent, Button } from '@blueprintjs/core';
import TxReceipt from '../TxReceipt';
import { EXPLORER_URL } from '../../config/urls'

import styled from 'styled-components'

type Props = {
  error: string,
  receipt: Object,
  title: ?string,
};

const TxErrorNotification = ({ error, receipt, title }: Props) => (
  <Callout title="Transaction Failed" icon="info-sign" intent={Intent.DANGER}>
    {/* <p>{error}</p> */}
    <Button minimal interactive>
      <ExplorerLink href={`${EXPLORER_URL}#${receipt.hash}`} target="_blank">
        View on explorer
      </ExplorerLink>
    </Button>
    {receipt && <TxReceipt receipt={receipt} />}
  </Callout>
);

TxErrorNotification.defaultProps = {
  title: 'Transaction Failed',
};

const ExplorerLink = styled.a`
  color: white !important;
`

export default TxErrorNotification;
