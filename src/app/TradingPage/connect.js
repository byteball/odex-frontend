// @flow
import { connect } from 'react-redux';
import tradingPageSelector, { queryTradingPageData } from '../../store/models/tradingPage';
import { updateDisplayMode } from '../../store/actions/tradingPage';

import type { State } from '../../types'

export function mapStateToProps(state: State) {
  let tradingPageProps = tradingPageSelector(state)

  return { ...tradingPageProps }
}

export const mapDispatchToProps = {
  queryTradingPageData,
  updateDisplayMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
