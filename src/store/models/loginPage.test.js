import createStore from '../../store/configureStore'
import { getAccountDomain } from '../domains'
import loginPageSelector from './loginPage'
import * as loginActionCreators from '../actions/loginPage'
import * as services from '../services/index.js'

jest.mock('../services')

let accountDomain, domain

beforeEach(() => {
  jest.resetAllMocks()

  services.mixpanel = { track: jest.fn() }
})

let unsubscribe = jest.fn()
let model

describe('Login Page Model', () => {


  it('handles loginWithApp action', async () => {
    const { store } = createStore()

    model = loginPageSelector(store.getState())
    expect(model.authenticated).toEqual(false)

    let addr = 'ADDR'
    await store.dispatch(loginActionCreators.loginWithApp(addr))

    let state = store.getState()
    model = loginPageSelector(store.getState())
    let { authenticated, address } = getAccountDomain(state)


    expect(authenticated).toEqual(true);
    expect(address).toEqual(addr);
    expect(model.loading).toEqual(false)
  })



})
