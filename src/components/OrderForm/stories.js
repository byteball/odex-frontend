//@flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import OrderForm from './OrderForm';

import { tokensBySymbol } from "../../utils/mockData";

storiesOf('Order Form', module)
  .addDecorator(withKnobs)
  .add(
    'Buy Orderform',
    withInfo({ source: false })(() => (
      <div className="bp3-dark">
        <OrderForm
          authenticated={true}
          side='BUY'
          askPrice={0.25}
          bidPrice={0.29}
          baseTokenBalance={1000}
          quoteTokenBalance={10}
          baseTokenSymbol="GBYTE"
          quoteTokenSymbol="USDC"
          baseTokenDecimals={9}
          quoteTokenDecimals={6}
          tokensBySymbol={tokensBySymbol}
          bestAskMatcher="M_ADDR"
          bestBidMatcher="M_ADDR"
          address="ADDR"
          operatorAddress="M_ADDR"
          loggedIn={false}
          selectedOrder={null}
          onCollapse={action('onCollapse')}
          onExpand={action('onExpand')}
          onResetDefaultLayout={action('onResetDefaultLayout')}
          unlockPair={action('unlockPair')}
          sendNewOrder={action('sendNewOrder')}
        />
      </div>
    ))
  )
  // .add(
  //   'Sell Orderform',
  //   withInfo({ text: README, source: false })(() => (
  //     <div className="bp3-dark">
  //       <OrderForm
  //         authenticated={true}
  //         side='SELL'
  //         askPrice={0.25}
  //         bidPrice={0.29}
  //         baseTokenBalance={1000}
  //         quoteTokenBalance={10}
  //         baseTokenSymbol="PRFT"
  //         quoteTokenSymbol="ETH"
  //         baseTokenDecimals={18}
  //         quoteTokenDecimals={18}
  //         loggedIn={false}
  //         onCollapse={action('onCollapse')}
  //         onExpand={action('onExpand')}
  //         onResetDefaultLayout={action('onResetDefaultLayout')}
  //         unlockPair={action('unlockPair')}
  //         sendNewOrder={action('sendNewOrder')}
  //       />
  //     </div>
  //   ))
  // );
