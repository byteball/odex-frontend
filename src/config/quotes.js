import { DEFAULT_NETWORK_ID } from './environment.js'
import assets from './assets.json'


const quoteTokensBySymbolsTable = {
  'testnet': {
    GBYTE: {
      symbol: 'GBYTE',
      asset: assets['testnet']['GBYTE'],
      decimals: 9,
    },
    USDC: {
      symbol: 'USDC',
      asset: assets['testnet']['USDC'],
      decimals: 6,
    },
  },
  'livenet': {
    GBYTE: {
      symbol: 'GBYTE',
      asset: assets['livenet']['GBYTE'],
      decimals: 9,
    },
    OUSD: {
      symbol: 'OUSD',
      asset: assets['livenet']['OUSD'],
      decimals: 4,
    },
  },
};

export const quoteTokensBySymbols = quoteTokensBySymbolsTable[DEFAULT_NETWORK_ID];
export const quoteTokenSymbols = Object.keys(quoteTokensBySymbols);
export const quoteTokens = Object.values(quoteTokensBySymbols).map((m, index) => ({ ...m, rank: index + 1 }));
