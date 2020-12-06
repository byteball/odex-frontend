//@flow

export type OrderFormState = {
  formName: string,
  askPrice: number,
  bidPrice: number,
  totalQuoteBalance: number,
  totalBaseBalance: number,
  baseToken: string,
  quoteToken: string,
};

export type NewOrder = {
  sell_asset: string,
  buy_asset: string,
  sell_amount: number,
  price: number,
  matcher_fee_asset: string,
  matcher_fee: number,
  matcher: string,
  aa: string,
  address: string,
  affiliate: string,
  affiliate_fee_asset: string,
  affiliate_fee: number,
}
