// @flow
import React from 'react';
import WaitingFormRenderer from './steps/WaitingFormRenderer';

type Props = {
  step: 'waiting' | 'convert' | 'confirm',
  tokens: Array<Object>,
  token: Object,
  amount: number,
  address: string,
  exchangeAddress: string,
  handleChange: (SyntheticInputEvent<>) => void,
  handleTokenChange: (SyntheticEvent<>) => void,
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
