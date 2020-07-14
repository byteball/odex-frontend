// @flow
import React from 'react';
import Modal from '../Modal';
import { ModalBody } from '../Common'
import { ControlGroup, InputGroup, Text, Button } from '@blueprintjs/core';

type Props = {
  isOpen: boolean,
  handleClose: (SyntheticEvent<>) => void,
  title: string,
  details: string,
  handleAction:  (SyntheticEvent<>) => void,
};

type State = {
  password: string,
}

export default class RequestConfirmModal extends React.PureComponent<Props, State> {
  state = {
    password: ''
  }

  handleConfirm = () => {
    const { handleAction } = this.props;
    handleAction();
  }

  render () {
    const { password } = this.state;
    const { isOpen, handleClose, title, details } = this.props;
    return (
      <Modal title={title} width="400px" icon="info-sign" isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <Text muted>Cancel Order</Text>
          <br />
          <ControlGroup fill vertical={false}>
            <InputGroup
              type="text"
              placeholder="Password"
              name="password"
              value={password}
            />
            <Button text="Confirm" onClick={this.handleConfirm} />
          </ControlGroup>
        
        </ModalBody>
      </Modal>
    )
  }
}