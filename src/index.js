import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader'
import App from './app';
import { GA_ID } from './config/environment';
import { Provider } from 'react-redux';
import ReactGA from "react-ga";
import history from "./store/history";

ReactGA.initialize(GA_ID);

const pathname = history.location.pathname.split("/");

ReactGA.pageview(pathname[1]);

const { store } = configureStore();
// registerServiceWorker();

const render = () => {
  return ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>
      ,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./app', () => {
    render();
  });
}
