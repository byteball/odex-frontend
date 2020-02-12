import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Card } from '@blueprintjs/core';

import TokenTableRenderer from './TokenTableRenderer';


const baseTokensData = [
  { symbol: 'GBYTE', balance: 10.00000, decimals: 9, value: 4.45, quote: true, listed: true, registered: false  },
  { symbol: 'ZRX', balance: 1.00000, decimals: 18, value: 3.45, quote: false, listed: true, registered: false  },
  { symbol: 'AION', balance: 5.00000, decimals: 18, value: 3.32, quote: false, listed: true, registered: false  },
  { symbol: 'LOOM', balance: 8.00000, decimals: 18, value: 120.32, quote: false, listed: true, registered: false  }
]



storiesOf('Token Table', module)
  .addDecorator(withKnobs)
  .add(
    'Token Table (Default)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <TokenTableRenderer
          connected={true}
          baseTokensData={baseTokensData}
          searchInput={""}
          handleSearchInputChange={action('handleSearchInputChange')}
          hideZeroBalanceToken={action('hideZeroBalanceToken')}
          openDepositModal={action('openDepositModal')}
          openSendModal={action('openSendModal')}
          toggleZeroBalanceToken={action('toggleZeroBalanceToken')}
          redirectToTradingPage={action('redirectToTradingPage')}
          totalFilteredTokens={4}
          referenceCurrency={"$"}
          selectedToken="ZRX"
           />
      </Card>
    ))
  )
  .add(
    'Token Table (GBYTE selected)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <TokenTableRenderer
          connected={true}
          baseTokensData={baseTokensData}
          searchInput={""}
          handleSearchInputChange={action('handleSearchInputChange')}
          hideZeroBalanceToken={action('hideZeroBalanceToken')}
          openDepositModal={action('openDepositModal')}
          openSendModal={action('openSendModal')}
          toggleZeroBalanceToken={action('toggleZeroBalanceToken')}
          redirectToTradingPage={action('redirectToTradingPage')}
          totalFilteredTokens={4}
          referenceCurrency={"$"}
          selectedToken="GBYTE"
           />
      </Card>
    ))
  );
