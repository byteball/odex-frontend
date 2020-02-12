





export const mockAddress = '0xe8e84ee367bc63ddb38d3d01bccef106c194dc47';

export const mockTokens = [
  { symbol: 'ETH', address: '0x0' },
  { symbol: 'EOS', address: '0x8d0a722b76c0dcb91bf62334afd11f925c0adb95' },
  { symbol: 'WETH', address: '0x2eb24432177e82907de24b7c5a6e0a5c03226135' },
  { symbol: 'ZRX', address: '0xc73eec564e96e6653943d6d0e32121d455917653' },
].map((m, index) => ({ ...m, rank: index + 1 }));


export const mockDepositTableData = [
  { symbol: 'ETH', balance: '19.0000', allowed: false },
  { symbol: 'WETH', balance: '10.0000', allowed: true },
  { symbol: 'ZRX', balance: '1.00000', allowed: false },
  { symbol: 'AION', balance: '5.00000', allowed: false },
  { symbol: 'LOOM', balance: '8.00000', allowed: true },
];

export const mockMarketsTableData  = [
  { symbol: 'ETH', balance: '19.0000', allowed: false },
  { symbol: 'WETH', balance: '10.0000', allowed: true },
  { symbol: 'ZRX', balance: '1.00000', allowed: false },
  { symbol: 'AION', balance: '5.00000', allowed: false },
  { symbol: 'LOOM', balance: '8.00000', allowed: true },
]

