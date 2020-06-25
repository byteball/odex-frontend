//@flow
import { connect } from 'react-redux';
import layoutSelector, { queryAppData } from '../../store/models/layout';
import { updateReferenceCurrency, updateReferenceDisplayMode } from '../../store/actions/layout'

import type { State } from '../../types'

export function mapStateToProps(state: State, props: Object) {
  const selectorData = layoutSelector(state);

  return {
    ...selectorData,
    locale: 'en',
    messages: 'TODO',
  };
}

const mapDispatchToProps = {
  updateReferenceCurrency,
  updateReferenceDisplayMode,
  queryAppData,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
