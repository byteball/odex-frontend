// @flow
import React from 'react';
import WaitingFormRenderer from './steps/WaitingFormRenderer';

import type { TxReceipt } from '../../types/common';

type Props = {
  step: 'waiting' | 'convert' | 'confirm',
  address: string,
  exchangeAddress: string,
  balance: ?number,
  tokens: Array<Object>,
  token: Object,
  toggleTokenSuggest: void => void,
  showTokenSuggest: boolean,
  handleChangeToken: (SyntheticEvent<>) => void,
  handleSubmitChangeToken: (SyntheticEvent<>) => Promise<void>,
};

const DepositFormRenderer = (props: Props) => {
  switch (props.step) {
    case 'waiting':
      return <WaitingFormRenderer {...props} />;
    default:
      return null;
  }
};

export default DepositFormRenderer;
