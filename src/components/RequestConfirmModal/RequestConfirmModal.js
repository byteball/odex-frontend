// @flow
import React from 'react';
import Modal from '../Modal';
import { ModalBody } from '../Common'
import { ControlGroup, InputGroup, Text, Button } from '@blueprintjs/core';

type Props = {
  isOpen: boolean,
  needPassword: boolean,
  handleClose: (SyntheticEvent<>) => void,
  title: string,
  details: string,
  handleAction: (string) => void,
};

type State = {
  password: string,
}

export default class RequestConfirmModal extends React.PureComponent<Props, State> {
  state = {
    password: ''
  }

  onInputChange = ({target}) => {
    this.setState({password: target.value})
  }

  handleConfirm = () => {
    const { handleAction } = this.props;
    const { password } = this.state;
    handleAction(password);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({password: ''});
    }
  }

  render () {
    const { password } = this.state;
    const { isOpen, handleClose, title, details, needPassword } = this.props;

    return (
      <Modal title={title} width="400px" icon="info-sign" isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <Text muted>{details}</Text>
          <br />
          <ControlGroup fill vertical={false}>
            { needPassword &&
                <InputGroup
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
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