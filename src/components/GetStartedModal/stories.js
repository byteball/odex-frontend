import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Card } from '@blueprintjs/core';

import configureStore from '../../store/configureStore';
import GetStartedModalContainer from './index.js'
import GetStartedModal from './GetStartedModal'
import GetStartedModalRenderer from './GetStartedModalRenderer'
import { tokens } from '../../data';



storiesOf('GetStartedModal', module)
  .addDecorator(withKnobs)
  .add(
    'GetStartedModalRenderer (Step 1)',
    withInfo()(() => (
      <div className="bp3-dark">
        <GetStartedModalRenderer
          step="1"
          goToFirstStep={action('goToFirstStep')}
          goToSecondStep={action('goToSecondStep')}
          goToThirdStep={action('goToThirdStep')}
          userHasBytes={false}
          GBYTEBalance={0}
          address={'0x7df6035a91f2c58d229907AF4D9d5Fc12737F21e'}
          redirectToTradingPage={action('redirectToTradingPage')}
          toggleShowHelpModalCheckBox={action('toggleShowHelpModalCheckbox')}
          showHelpModalChecked={false}
          handleClose={action('handleClose')}
          isOpen={true}
        />
      </div>
    ))
  )
  .add(
    'GetStartedModalRenderer (Step 2)',
    withInfo()(() => (
      <div className="bp3-dark">
          <GetStartedModalRenderer
            step="2"
            goToFirstStep={action('goToFirstStep')}
            goToSecondStep={action('goToSecondStep')}
            goToThirdStep={action('goToThirdStep')}
            userHasBytes={false}
            GBYTEBalance={0}
            tokens={tokens}
            balances={{ GBYTE: 1000 }}
            address={'0x7df6035a91f2c58d229907AF4D9d5Fc12737F21e'}
            redirectToTradingPage={action('redirectToTradingPage')}
            toggleShowHelpModalCheckBox={action('toggleShowHelpModalCheckbox')}
            showHelpModalChecked={false}
            handleClose={action('handleClose')}
            isOpen={true}
          />
      </div>
    ))
  )
  .add(
    'GetStartedModalRenderer (Step 3 - User has Tokens - Transactions Complete)',
    withInfo()(() => (
      <div className="bp3-dark">
          <GetStartedModalRenderer
            step="3"
            goToFirstStep={action('goToFirstStep')}
            goToSecondStep={action('goToSecondStep')}
            goToThirdStep={action('goToThirdStep')}
            userHasBytes={true}
            GBYTEBalance={'0.25'}
            address={'0x7df6035a91f2c58d229907AF4D9d5Fc12737F21e'}
            redirectToTradingPage={action('redirectToTradingPage')}
            toggleShowHelpModalCheckBox={action('toggleShowHelpModalCheckbox')}
            showHelpModalChecked={false}
            handleClose={action('handleClose')}
            isOpen={true}
          />
      </div>
    ))
  )
  