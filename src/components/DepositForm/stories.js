import React from 'react';
import README from './README.md';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Card } from '@blueprintjs/core';

import { tokens } from '../../data';
import configureStore from '../../store/configureStore';
import {
  mockAddress,
} from '../../mockData';

import DepositFormContainer from './index.js';
import DepositFormRenderer from './DepositFormRenderer';


storiesOf('Deposit Form', module)
  .addDecorator(withKnobs)
  .add(
    'Connected Deposit Tokens Form',
    withInfo({
      text: README,
      source: false,
    })(() => (
      <div className="bp3-dark">
        <Card>
          <DepositFormContainer />
        </Card>
      </div>
    ))
  )
  .add(
    'Deposit Tokens Form (Waiting for deposit)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <DepositFormRenderer
            step="waiting"
            address={mockAddress}
            balance={1.54}
            tokens={tokens}
            token={tokens[0]}
            submitButtonDisabled={false}
            toggleTokenSuggest={action('toggleTokenSuggest')}
            showTokenSuggest
            handleChangeToken={action('handleChangeToken')}
            handleSubmitChangeToken={action('handleSubmitChangeToken')}
            handleConfirm={action('handleConfirm')}
            receipt={null}
            hash={null}
          />
        </Card>
      </div>
    ))
  );
