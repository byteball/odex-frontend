import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import createStore from '../../store/configureStore';
import connect, { mapStateToProps } from './connect';
import * as walletPage from '../../store/models/walletPage';

jest.mock('../../store/models/walletPage');
jest.mock('../../store/models/layout');

const selectorData = {
  balancesLoading: 'balancesLoading',
  tokenData: 'tokenData',
  quoteTokens: 'quoteTokens',
  baseTokens: 'baseTokens',
  accountAddress: 'accountAddress',
  authenticated: 'authenticated',
  showHelpModal: 'showHelpModal',
  connected: 'connected',
}

describe('connect(Component)', () => {
  it('injects certain props and renders without crashing', () => {
    const { store } = createStore();
    const ConnectedTestComponent = connect(props => {
      expect(props).toBeDefined();
      expect(props).toHaveProperty('queryAccountData');
      expect(props).toHaveProperty('loading');
      expect(props).toHaveProperty('tokenTableSelector');
      expect(props).toHaveProperty('authenticated');
      return null;
    });

    shallow(
      <Provider store={store}>
        <ConnectedTestComponent />
      </Provider>
    );
  });
});

describe('mapStateToProps(state, props)', () => {
  it('returns expected props', () => {
    walletPage.default = jest.fn(() => ({ ...selectorData }));
    const state = {};
    const props = {};
    const result = mapStateToProps(state, props);

    expect(result).toBeDefined();
    expect(result).toEqual({ ...selectorData });
  });
});
