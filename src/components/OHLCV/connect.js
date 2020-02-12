// @flow
import { connect } from 'react-redux';
import ohlcvModel, { updateDuration, updateTimeSpan, getBaseSymbol } from '../../store/models/ohlcv';

import type { State } from '../../types';

type Props = {
  onCollapse: string => void
}

export const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    baseSymbol: getBaseSymbol(state),
    ...ohlcvModel(state).getState(),
    ...ownProps
  }
};

export const mapDispatchToProps = {
  updateDuration,
  updateTimeSpan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
