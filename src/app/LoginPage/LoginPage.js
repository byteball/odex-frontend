// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginPageRenderer from './LoginPageRenderer';

type Props = {
  authenticated: boolean,
  sessionId: string,
  loginWithApp: () => void,
  removeNotification: any => void,
};

//TODO: Remove Notification handling

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

// generateRandomString :: Integer -> String
function generateRandomString(len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

type State = {
  view: string,
  //sessionId: string,
};

class LoginPage extends React.PureComponent<Props, State> {
  state = {
    view: 'loginMethods',
    //sessionId: ''
  };

  /*constructor(props: Object){
    super(props);
    this.state.sessionId = this.state.sessionId || generateRandomString();
  }*/

  componentDidMount = () => {
  };

  showLoginMethods = () => {
    this.setState({ view: 'loginMethods' });
  };

  hideModal = () => {
    this.setState({ view: 'loginMethods' });
  };

  componentWillMount = () => {
    // this.props.removeNotification({ id: 1 });
  };

  render() {
    const {
      props: { 
        loginWithApp,
        authenticated,
        sessionId
      },
      state: { view },
      showLoginMethods,
      hideModal,
    } = this;

    if (authenticated) {
      return <Redirect to="/wallet" />;
    }
    return (
      <div>
        <LoginPageRenderer
          view={view}
          sessionId={sessionId}
          loginWithApp={loginWithApp}
          hideModal={hideModal}
          showLoginMethods={showLoginMethods}
        />
      </div>
    );
  }
}

export default LoginPage;
