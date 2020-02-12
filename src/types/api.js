

export type APIPairDatum = {
  pairName: string,
  close: number,
  open: number,
  high: number,
  low: number,
  volume: number,
  orderVolume: number,
  orderCount: number
};

export type APIPairData = Array<APIPairDatum>