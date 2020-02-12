import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import ModalBox from '../ModalBox';
import DepositModal from './DepositModal';
import { tokens } from '../../utils/mockData';

storiesOf('Deposit Modal', module)
  .addDecorator(withKnobs)
  .add(
    'Waiting Step',
    withInfo({ source: false })(() => (
      <ModalBox>{({ handleClose, isOpen }) => <DepositModal handleClose={handleClose} isOpen={isOpen} token={tokens[0]} />}</ModalBox>
    ))
  );
