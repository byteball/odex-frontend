import createStore from '../../store/configureStore';
import * as api from '../services/api'

import { getAccountBalancesDomain, getAccountDomain, getTokenDomain, getNotificationsDomain } from '../domains';
import * as actionCreators from './walletPage';

jest.mock('../services/api');
jest.mock('../services/socket');
jest.mock('../domains');

let accountBalancesDomain;
const { store } = createStore();

const testAddress = '0x1';

const gbyte = {
  address: '0x0',
  symbol: 'GBYTE',
  decimals: 9,
  balance: 1000,
  EURRate: 0,
  USDRate: 0,
  JPYRate: 0,
};

const usdc = {
  address: '0x2',
  symbol: 'USDC',
  decimals: 6,
  balance: 2000,
  EURRate: 0,
  USDRate: 0,
  JPYRate: 0,
};


// file.only

beforeEach(() => {
  jest.resetAllMocks();

  api.getBalances = jest.fn(),

  api.fetchPairs = jest.fn(() => [{
    pairName: 'GBYTE/USDC',
    baseTokenSymbol: 'GBYTE',
    quoteTokenSymbol: 'USDC',
    baseAsset: '0x1',
    quoteAsset: '0x2'
  }])

  api.getTokens = jest.fn(() => [ gbyte, usdc ])
  api.fetchExchangeRates = jest.fn(() => [])
  api.getExchangeAddress = jest.fn(() => '0x1')
  api.getBalances = jest.fn(() => { return {
    GBYTE: 1000,
    USDC: 2000,
  }})

  getAccountBalancesDomain.mockImplementation(require.requireActual('../domains').getAccountBalancesDomain);
  getNotificationsDomain.mockImplementation(require.requireActual('../domains').getNotificationsDomain);
});

it('handles queryAccountData properly', async () => {
  const getTokenDomainMock = jest.fn(() => ({
    symbols: () => ['GBYTE', 'USDC'],
    bySymbol: () => ({ GBYTE: gbyte, USDC: usdc }),
    tokens: () => [gbyte, usdc],
  }));

  const getAccountDomainMock = jest.fn(() => ({ address: testAddress }));
  const getNotificationsDomainMock = jest.fn(() => ({ last: () => { id: 1; } }));


  getTokenDomain.mockImplementation(getTokenDomainMock);
  getAccountDomain.mockImplementation(getAccountDomainMock);
  getNotificationsDomain.mockImplementation(getNotificationsDomainMock);

  accountBalancesDomain = getAccountBalancesDomain(store.getState());
  // tokenModel = getTokenDomain(store.getState());

  expect(accountBalancesDomain.get(usdc.symbol)).toEqual(null);
  expect(accountBalancesDomain.isSubscribed(usdc.symbol)).toEqual(false);

  await store.dispatch(actionCreators.queryAccountData());

  expect(api.getBalances).toHaveBeenCalledTimes(1);
  expect(api.getBalances).toHaveBeenCalledWith(testAddress);

  accountBalancesDomain = getAccountBalancesDomain(store.getState());
  expect(accountBalancesDomain.isSubscribed('GBYTE')).toEqual(false);
  expect(accountBalancesDomain.get('GBYTE')).toEqual(1000/1e9);
  expect(accountBalancesDomain.get('USDC')).toEqual(2000/1e6);
  expect(accountBalancesDomain.isSubscribed('USDC')).toEqual(false);
});
