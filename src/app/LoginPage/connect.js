import { connect } from 'react-redux';

import loginPageSelector, { 
  loginWithApp,
} from '../../store/models/loginPage';

import { removeNotification } from '../../store/actions/app';

export function mapStateToProps(state, props) {
  const selector = loginPageSelector(state);

  return {
    authenticated: selector.authenticated,
    sessionId: selector.sessionId,
  };
}

const mapDispatchToProps = {
  loginWithApp,
  removeNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
