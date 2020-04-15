// @flow
import { connect } from 'react-redux';

import { updateFavorite } from '../../store/actions/tokenSearcher';
import tokenSearcherSelector from '../../store/models/tokenSearcher';
import { updateCurrentPair, autoRegisterSymbol } from '../../store/models/tokenSearcher';
import {queryTradingPageData} from '../../store/models/tradingPage';

import type { State } from '../../types';

type Props = {
  onCollapse: string => void
}

export const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    ...tokenSearcherSelector(state),
    ...ownProps
  }
};

export const mapDispatchToProps = {
  updateFavorite,
  updateCurrentPair,
  autoRegisterSymbol,
  queryTradingPageData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
