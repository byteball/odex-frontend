// @flow
import React from 'react';
import { Callout } from '@blueprintjs/core';

type Props = {
  status: string,
  statusMessage: string,
};

const TxValidityNotification = (props: Props) => {
  const { status, statusMessage } = props;
  if (status === 'invalid') {
    return renderInvalidTx(statusMessage);
  } else if (status === 'valid') {
    return renderValidTx(statusMessage);
  } else {
    return null;
  }
};

const renderInvalidTx = (statusMessage: string) => {
  return (
    <Callout intent="warning" icon="warning-sign" title={statusMessage}>
      {/* {gas && `Required Gas: ${gas}`} */}
    </Callout>
  );
};

const renderValidTx = (statusMessage: string) => {
  return (
    <Callout intent="success" icon="info-sign" title={statusMessage}>
      {/* {Required Gas: {gas}} */}
    </Callout>
  );
};

export default TxValidityNotification;
