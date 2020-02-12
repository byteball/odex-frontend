// @flow

export type TxStatus = 'incomplete' | 'valid' | 'invalid' | 'sent' | 'reverted' | 'confirmed' | 'error';

export type Address = string;

export type TxHash = string;

export type TokenSymbol = string;

export type TxReceipt = {
  hash: string,
};

export type Token = {
  asset: string,
  symbol: string,
  decimals: number,
};

export type TokenBalance = {
  symbol: string,
  balance: number,
};

export type Tokens = Array<Token>;
export type TokenBalances = Array<TokenBalances>;

export type BN = {
  div: any,
  mul: any,
}

export type Numberish = string | number;

export type Location = "/login" | "/markets" | "/trade" | "/wallet"