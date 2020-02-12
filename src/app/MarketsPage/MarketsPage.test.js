import React from 'react';
import { shallow } from 'enzyme';
import MarketsPage from './MarketsPage.js';

it('renders without crashing', () => {
  shallow(<MarketsPage 
    logout={jest.fn()}
    quoteTokens={['USDC', 'DAI']}
    connected={true}
    loading={false}
    redirectToTradingPage={jest.fn()}
  />);
});
