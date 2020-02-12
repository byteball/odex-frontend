
export const receipt = {
  status: '0x1',
  hash: '0x7379944c48520639ed73f8cbad1a922cbf15fb44db7f109ba1fca40d6c483d9e',
};



export const tokens = [
  { symbol: 'GBYTE', asset: 'base' },
  { symbol: 'USDC', asset: '0x8d0a722b76c0dcb91bf62334afd11f925c0adb95' },
  { symbol: 'WETH', asset: '0x2eb24432177e82907de24b7c5a6e0a5c03226135' },
  { symbol: 'ZRX', asset: '0xc73eec564e96e6653943d6d0e32121d455917653' },
].map((m, index) => ({ ...m, rank: index + 1 }));

export const tokenSymbols = ['ETH', 'EOS', 'WETH', 'ZRX'];

export const tokensBySymbol = {
  GBYTE: { symbol: 'GBYTE', asset: 'base' },
  USDC: { symbol: 'USDC', asset: '0x8d0a722b76c0dcb91bf62334afd11f925c0adb95' },
  WETH: { symbol: 'WETH', asset: '0x2eb24432177e82907de24b7c5a6e0a5c03226135' },
  ZRX: { symbol: 'ZRX', asset: '0xc73eec564e96e6653943d6d0e32121d455917653' },
};

export const accountBalances = [
  { symbol: 'ETH', balance: '121', allowance: true },
  { symbol: 'EOS', balance: '234.213', allowance: false },
  { symbol: 'WETH', balance: '0.0032', allowance: false },
  { symbol: 'ZRX', balance: '12.453', allowance: true },
];

export const networks = [
  { name: 'Mainnet', id: 1 },
  { name: 'Ropsten', id: 3 },
  { name: 'Rinkeby', id: 4 },
  { name: 'Private', id: 1000 },
  { name: 'Private', id: 8888 },
].map((m, index) => ({ ...m, rank: index + 1 }));


export const receiver = '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5';

export const txHash = '0x98887e6a4d3981430f5cd7ce5394e6a5bca15d0ff33cccd2b63cdcc1df297d70';
