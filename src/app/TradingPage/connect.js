// @flow
import { connect } from 'react-redux';
import tradingPageSelector, { queryTradingPageData } from '../../store/models/tradingPage';

import type { State } from '../../types'

export function mapStateToProps(state: State) {
  let tradingPageProps = tradingPageSelector(state)

  return { ...tradingPageProps }
}

export const mapDispatchToProps = {
  queryTradingPageData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
