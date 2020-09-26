import { DEFAULT_NETWORK_ID } from './environment.js'
import assets from './assets.json';

const networkIDs = ['testnet', 'livenet']

const defaultTokenDecimals = {
  GBYTE: 9,
  AE: 18,
  BAT: 18,
  BNB: 18,
  DAI: 18,
  GNT: 18,
  KNC: 18,
  OMG: 18,
  ZRX: 18,
  TRX: 18,
  MKR: 18,
  REP: 18,
  BTM: 18,
  NPXS: 18,
  WTC: 18,
  KCS: 18,
  PPT: 8,
  SNT: 18,
  DGX: 9,
  MITH: 18,
  AION: 18,
  LOOM: 18,
  USDC: 6,
  OUSD: 4,
}

const defaultTokens = [
  "GBYTE",
  "AE",
  "BAT",
  "BNB",
  "DAI",
  "KNC",
  "LOOM",
  "LRC",
  "MITH",
  "MKR",
  "NPXS",
  "OMG",
  "PRFT",
  "REP",
  "SNT",
  "WTC",
  "ZRX",
  "USDC",
  "OUSD",
]

let tokensBySymbolTable = {}

for (let networkID of networkIDs) {
  tokensBySymbolTable[networkID] = {}
  for (let token of defaultTokens) {
    if (assets[networkID][token]) {
      tokensBySymbolTable[networkID][token] = {
        symbol: token,
        asset: assets[networkID][token],
        decimals: defaultTokenDecimals[token] || 18
      }
    }
  }
}

const tokensBySymbol = tokensBySymbolTable[DEFAULT_NETWORK_ID];
//export const tokenSymbols = Object.keys(tokensBySymbol);
export const tokens = Object.values(tokensBySymbol);