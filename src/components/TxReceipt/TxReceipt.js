// @flow
import React from 'react';
import TxReceiptRenderer from './TxReceiptRenderer';
import type { TxReceipt as TxReceiptType } from '../../types/common';

type Props = {
  receipt: TxReceiptType,
};

type State = {
  visible: boolean,
};

class TxReceipt extends React.PureComponent<Props, State> {
  state = { visible: false };

  toggleVisible = (e: SyntheticEvent<>) => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;
    const { hash } = this.props.receipt;

    return (
      <TxReceiptRenderer
        toggleVisible={this.toggleVisible}
        visible={visible}
        hash={hash}
      />
    );
  }
}

export default TxReceipt;
