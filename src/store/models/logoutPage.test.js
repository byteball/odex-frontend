import createStore from '../../store/configureStore';
import logoutPageSelector from './logoutPage';
import * as actionCreators from './logoutPage';
import * as loginActionCreators from '../actions/loginPage'
import * as services from '../services/index.js'

let unsubscribe = jest.fn();
let selector;

jest.mock('../services/index.js')

describe('Logout Page Model', () => {
  it('handles logout', async () => {
    const { store } = createStore();

    await store.dispatch(loginActionCreators.loginWithApp('ADDR'))
    services.mixpanel = { track: jest.fn() }
    selector = logoutPageSelector(store.getState());
    expect(selector.authenticated).toEqual(true);

    store.dispatch(actionCreators.logout());

    selector = logoutPageSelector(store.getState());
    expect(selector.authenticated).toEqual(false);
  });
});
