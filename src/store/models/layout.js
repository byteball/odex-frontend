import * as actionCreators from '../actions/layout'
import * as balanceActionCreators from '../actions/accountBalances';
import * as notifierActionCreators from '../actions/app'
import { updateBrowserWallet } from '../actions/walletInfo'

import {
  getTokenDomain,
  getAccountDomain,
  getAccountBalancesDomain
 } from '../domains'

import { fiatCurrencies, pricedTokens, displayModes } from '../../config'

import { client } from '../../store/services/api/obyte';
import { getAaStateVars } from '../../store/services/api'


export default function createSelector(state) {
  let { authenticated, address, referenceCurrency, displayMode } = getAccountDomain(state)
  let accountBalancesDomain = getAccountBalancesDomain(state)

  let GBYTEBalance = accountBalancesDomain.gbyteBalance()
  let accountLoading = !(GBYTEBalance)
  let location = state.router.location.pathname
  let currentPair = state.tokenPairs.currentPair

  let referenceCurrencies = fiatCurrencies.map((currency, i) => {
    return {
      rank: i,
      name: currency.name,
      symbol: currency.symbol
    }
  })
  let currentReferenceCurrency = referenceCurrencies.filter(currency => currency.name === referenceCurrency.name)[0]

  let modes = displayModes.map((mode, i) => {
    return {
      rank: i,
      ...mode
    }
  })
  let currentDisplayMode = displayMode ? modes.find(mode => mode.name === displayMode.name) : modes[0];

  return {
    GBYTEBalance,
    authenticated,
    address,
    accountLoading,
    currentReferenceCurrency,
    referenceCurrencies,
    currentDisplayMode,
    displayModes: modes,
    location,
    currentPair
  }
}

export function updateAuthorizedAddresses(): ThunkAction {
  return async(dispatch, getState) => {
    const state = getState();
    let { exchangeAddress, address: accountAddress} = getAccountDomain(state);
    const params =  {
      address: exchangeAddress,
      var_prefix: `grant_${accountAddress}_to`
    }
    
    try {
      const res = await getAaStateVars(params)
      const authorizations = Object.keys(res)
        .map(key => String(key).split('_to_')[1])

      dispatch(actionCreators.updateAuthorizations(authorizations))
    } catch(e) {
      console.log("error", e);
    }
      
  }
}

export function updateBrowserWalletAuthorization(): ThunkAction {
  return async(dispatch, getState) => {
    const state = getState();
    let { exchangeAddress, address: accountAddress, browserWallet } = getAccountDomain(state);
    if (!accountAddress || !exchangeAddress || !browserWallet || !browserWallet.address) {
      return;
    }

    try {
      const prefix = `grant_${accountAddress}_to_${browserWallet.address}`;
      const aaVar = await client.api.getAaStateVars({ address: exchangeAddress, var_prefix: prefix });
      console.log("aaVar", aaVar)
      if(aaVar[prefix] === 1) {
        dispatch(updateBrowserWallet({
          ...browserWallet,
          authorized: true
        }))
      } else {
        dispatch(updateBrowserWallet({
          ...browserWallet,
          authorized: false
        }))
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}

export function subscribeAA(): ThunkAction {
  return async(dispatch, getState) => {
    const state = getState();
    let { exchangeAddress, address: accountAddress } = getAccountDomain(state);
    if (!exchangeAddress) {
      return;
    }

    try {
      await client.justsaying("light/new_aa_to_watch", {
        aa: exchangeAddress,
        address: accountAddress
      });
    } catch (e) {
      console.log("error", e);
    }
  }
}

export function watchAaNotifications(): ThunkAction {
  return async(dispatch, getState) => {
    let { exchangeAddress } = getAccountDomain(getState());

    try {
      client.subscribe(async (err, result) => {
        console.log("notification", result);

        if (result[1].subject === "light/aa_request") {
          const AA = result[1].body.aa_address;

          if (AA === exchangeAddress) {
            const { payload } = result[1].body.unit.messages[0];
            const { authorizations } = getAccountDomain(getState());

            if (payload.revoke) {
              const filtered = authorizations.filter((address) => address !== payload.address)
              dispatch(actionCreators.updateAuthorizations(filtered))
            }
          }
        }
        
        if (result[1].subject === "light/aa_response") {
          const AA = result[1].body.aa_address;

          if (AA === exchangeAddress) {
            const { responseVars } = result[1].body.response;
            const { browserWallet, authorizations } = getAccountDomain(getState());
            
            if (responseVars.event === "grant") {
              
              dispatch(actionCreators.updateAuthorizations([...authorizations, responseVars.authorized_address]))

              if (responseVars.authorized_address === browserWallet.address) {
                dispatch(updateBrowserWallet({
                  ...browserWallet,
                  authorized: true
                }))
              }
            }

            if (responseVars.event === "revocation") {
              const filtered = authorizations.filter((address) => address !== responseVars.address)
              dispatch(actionCreators.updateAuthorizations(filtered))
            }

          }
        }
      })
    } catch(error) {
      console.log("error", error)
    }
  }
}


export function queryAppData(): ThunkAction {
  return async (dispatch, getState, { api, provider }) => {
    const state = getState();
    let { address } = getAccountDomain(state)
    const tokensBySymbol = getTokenDomain(state).bySymbol()
    try {    
    let [ assocBalances, tokens, pairs ] = await Promise.all([
      address ? api.getBalances(address) : {},
      api.getTokens(),
      api.fetchPairs()
    ])

    let tokenSymbols = pricedTokens
    let currencySymbols = ['USD', 'EUR', 'JPY']
    let exchangeRates = await api.fetchExchangeRates(tokenSymbols, currencySymbols)

    tokens = tokens.map(token => {
      return {
        ...token,
        USDRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].USD : 0,
        EURRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].EUR : 0,
        JPYRate: exchangeRates[token.symbol] ? exchangeRates[token.symbol].JPY : 0,
      }
    })

    let balances = []
    for (var symbol in assocBalances)
      if (tokensBySymbol[symbol])
        balances.push({balance: assocBalances[symbol] / Math.pow(10, tokensBySymbol[symbol].decimals), symbol});

    dispatch(balanceActionCreators.updateBalances(balances));
    dispatch(actionCreators.updateAppData(tokens, pairs))
  } catch (e) {
    console.log(e)
    dispatch(notifierActionCreators.addErrorNotification({ message: e.message }))
  }
}
}
