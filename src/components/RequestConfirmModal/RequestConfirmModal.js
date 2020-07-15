// @flow
import React from 'react';
import Modal from '../Modal';
import { ModalBody } from '../Common'
import { ControlGroup, InputGroup, Text, Button } from '@blueprintjs/core';

type Props = {
  isOpen: boolean,
  needPassphrase: boolean,
  handleClose: (SyntheticEvent<>) => void,
  title: string,
  details: string,
  handleAction: (string) => void,
};

type State = {
  passphrase: string,
}

export default class RequestConfirmModal extends React.PureComponent<Props, State> {
  state = {
    passphrase: ''
  }

  onInputChange = ({target}) => {
    this.setState({passphrase: target.value})
  }

  handleConfirm = () => {
    const { handleAction } = this.props;
    const { passphrase } = this.state;
    handleAction(passphrase);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({passphrase: ''});
    }
  }

  render () {
    const { passphrase } = this.state;
    const { isOpen, handleClose, title, details, needPassphrase } = this.props;

    return (
      <Modal title={title} width="400px" icon="info-sign" isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <Text muted>{details}</Text>
          <br />
          <ControlGroup fill vertical={false}>
            { needPassphrase &&
                <InputGroup
                  name="passphrase"
                  type="password"
                  placeholder="Passphrase"
                  value={passphrase}
                  onChange={this.onInputChange}
                />
             }
            <Button text="Confirm" onClick={this.handleConfirm} />
          </ControlGroup>
        
        </ModalBody>
      </Modal>
    )
  }
}