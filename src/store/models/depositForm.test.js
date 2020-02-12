import createStore from '../../store/configureStore';

import * as services from '../services/index.js'

import {
  getAccountBalancesDomain,
  getAccountDomain,
  getDepositFormDomain,
  getTokenDomain,
} from '../domains';
import DepositFormSelector from './depositForm';
import * as actionCreators from './depositForm';

jest.mock('../services/index.js')
jest.mock('../domains');

let domain, depositFormDomain, model;


beforeEach(() => {
  jest.resetAllMocks();
  services.mixpanel = { track: jest.fn() }

});

it.only('handles subscribeBalance (token) properly', async () => {
  getAccountBalancesDomain.mockImplementation(require.requireActual('../domains').getAccountBalancesDomain);

  const testAddress = '0x1';
  const { store } = createStore();
  const token = {
    address: '0x7e0f08462bf391ee4154a88994f8ce2aad7ab144',
    symbol: 'REQ',
  };

  const getTokenDomainMock = jest.fn(() => ({
    symbols: () => ['REQ'],
    bySymbol: () => ({ REQ: token }),
  }));

  const getAccountDomainMock = jest.fn(() => ({ address: () => testAddress }));
  getTokenDomain.mockImplementation(getTokenDomainMock);
  getAccountDomain.mockImplementation(getAccountDomainMock);

  domain = getAccountBalancesDomain(store.getState());
  expect(domain.get(token.symbol)).toEqual(null);
  expect(domain.isSubscribed(token.symbol)).toEqual(false);

});

