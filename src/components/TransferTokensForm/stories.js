import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import TransferTokensFormContainer from './index.js';
import TransferTokensFormRenderer from './TransferTokensFormRenderer';
import TransferTokensForm from './TransferTokensForm';
import { Card } from '@blueprintjs/core';
import { receipt, receiver, tokens } from '../../utils/mockData';
import README from './README.md';

storiesOf('Send Tokens Form', module)
  .addDecorator(withKnobs)
  .add(
    'Connected Send Tokens Form',
    withInfo({
      text: README,
      propTablesExclude: [TransferTokensFormContainer],
      source: false,
    })(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormContainer />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Form',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensForm
            token={tokens[0]}
            tokens={tokens}
            loading={false}
            error=""
            status="valid"
            statusMessage="Transaction is valid"
            hash="0x7379944c48520639ed73f8cbad1a922cbf15fb44db7f109ba1fca40d6c483d9e"
            receipt={receipt}
          />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Renderer (Transaction Confirmed)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormRenderer
            loading={false}
            error=""
            status="confirmed"
            statusMessage="Transaction is valid"
            hash={receipt.hash}
            receipt={receipt}
            tokens={tokens}
            token={tokens[0]}
            amount={100000}
            receiver={receiver}
            handleChange={action('handleChange')}
            handleTokenChange={action('handleTokenChange')}
            handleSubmit={action('handleSubmit')}
          />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Renderer (Transaction Sent)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormRenderer
            loading={false}
            status="pending"
            statusMessage=""
            hash={receipt.hash}
            receipt={null}
            tokens={tokens}
            token={tokens[0]}
            amount={100000}
            receiver={receiver}
            handleChange={action('handleChange')}
            handleTokenChange={action('handleTokenChange')}
            handleSubmit={action('handleSubmit')}
          />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Renderer (Transaction Valid)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormRenderer
            loading={false}
            error=""
            status="valid"
            statusMessage="Transaction is valid"
            hash=""
            receipt={null}
            tokens={tokens}
            token={tokens[0]}
            amount={100000}
            receiver={receiver}
            handleChange={action('handleChange')}
            handleTokenChange={action('handleTokenChange')}
            handleSubmit={action('handleSubmit')}
          />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Renderer (Transaction Invalid)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormRenderer
            loading={false}
            status="invalid"
            statusMessage="Invalid JSON Response"
            hash=""
            receipt={null}
            tokens={tokens}
            token={tokens[0]}
            amount={100000}
            receiver={receiver}
            handleChange={action('handleChange')}
            handleTokenChange={action('handleTokenChange')}
            handleSubmit={action('handleSubmit')}
          />
        </Card>
      </div>
    ))
  )
  .add(
    'Send Tokens Renderer (Transaction Reverted)',
    withInfo()(() => (
      <div className="bp3-dark">
        <Card>
          <TransferTokensFormRenderer
            loading={false}
            status="reverted"
            statusMessage=""
            hash={receipt.hash}
            receipt={receipt}
            tokens={tokens}
            token={tokens[0]}
            amount={100000}
            receiver={receiver}
            handleChange={action('handleChange')}
            handleTokenChange={action('handleTokenChange')}
            handleSubmit={action('handleSubmit')}
          />
        </Card>
      </div>
    ))
  );
