
import * as actionCreators from '../actions/walletInfo'

import { 
    getTokenDomain, 
    getAccountBalancesDomain,
    getAccountDomain,
    getTransactionsDomain
} from '../domains'

export default function walletInfoSelector(state: State) {
    let tokenDomain = getTokenDomain(state)
    let accountBalancesDomain = getAccountBalancesDomain(state)
    let transactionsDomain = getTransactionsDomain(state)
    let accountDomain = getAccountDomain(state)

    return {
        userTokens: tokenDomain.assets(),
        listedTokens: tokenDomain.listedAssets(),
        registeredTokens: tokenDomain.registeredAssets(),
        gbyteBalance: accountBalancesDomain.formattedGbyteBalance(),
        recentTransactions: transactionsDomain.recentTransactions(8),
        accountAddress: accountDomain.address,
        browserWallet: accountDomain.browserWallet,
        exchangeAddress: accountDomain.exchangeAddress,
        authorizations: accountDomain.authorizations
    }
}

export function detectToken(asset: string): ThunkAction {
    return async (dispatch, getState, { provider, api, mixpanel }) => {
        mixpanel.track('wallet-page/detect-contract')

        try {
            let state = getState()
            let tokenDomain = getTokenDomain(state)
            let listedTokens = tokenDomain.listedAssets()

            if (listedTokens.indexOf(asset) !== -1) {
                return { error: 'Token is already listed' }
            }
            
            let token

            token = await api.getToken(asset)
            if (token) {
                if (listedTokens.indexOf(token.asset) !== -1) {
                    return { error: 'Token is already listed' }
                }
                return {
                    isRegistered: true,
                    decimals: token.decimals,
                    asset: token.asset,
                    symbol: token.symbol
                }
            }

            token = await api.checkToken(asset)
            if (token && token.symbol) {

                return {
                    isRegistered: false,
                    decimals: token.decimals,
                    asset: token.asset,
                    symbol: token.symbol
                }
            }

            return { error: 'Asset not found' }
        } catch (e) {
            console.log(e)
            return { error: e.message }
        }
    }
}

export function addToken(asset: string): ThunkAction {
    return async (dispatch, getState, { provider, api, mixpanel }) => {
        mixpanel.track('wallet-page/add-token')

        try {
            let state = getState()
            let tokenDomain = getTokenDomain(state)
            let quoteTokens = tokenDomain.quoteTokens()
            let listedTokens = tokenDomain.listedAssets()
            let userTokens = tokenDomain.assets()
            
            if (listedTokens.indexOf(asset) !== -1) {
                return { error: 'Token is already listed'}
            }

            if (userTokens.indexOf(asset) !== -1) {
                return { error: 'Token is already added' }
            }

            let token = await api.getToken(asset)
            if (!token || !token.symbol || !token.asset)
                return { error: 'Asset not found' }

            let pairs = quoteTokens.map((quote) => {
                return {
                    baseTokenSymbol: token.symbol,
                    quoteTokenSymbol: quote.symbol,
                    baseAsset: token.asset,
                    quoteAsset: quote.asset,
                    baseTokenDecimals: token.decimals,
                    quoteTokenDecimals: quote.decimals,
                    listed: token.listed,
                    active: token.active
                }
            })

            await dispatch(actionCreators.addToken(token, pairs))

            //In case everthing works correctly, we return token and pairs as a success message
            return { token, pairs }
        } catch (e) {
            console.log(e)
            return { error: e.message }
        }
    }
}


export function registerToken(asset: string): ThunkAction {
    return async (dispatch, getState, { provider, api, mixpanel }) => {
        mixpanel.track('wallet-page/register-token')

        try {
            let state = getState()
            let tokenDomain = getTokenDomain(state)
            let listedTokens = tokenDomain.listedAssets()
            let registeredTokens = tokenDomain.registeredAssets()
            let quoteTokens = tokenDomain.quoteTokens()

            if (listedTokens.indexOf(asset) !== -1) {
                return { error: 'Token is already listed' }
            }

            if (registeredTokens.indexOf(asset) !== -1) {
                return { error: 'Token is already registered' }
            }

            let token = await api.getToken(asset)
            if (token && token.symbol && token.asset){ // already registered, just add
                let pairs = quoteTokens.map((quote) => {
                    return {
                        baseTokenSymbol: token.symbol,
                        quoteTokenSymbol: quote.symbol,
                        baseAsset: token.asset,
                        quoteAsset: quote.asset,
                        baseTokenDecimals: token.decimals,
                        quoteTokenDecimals: quote.decimals,
                        listed: token.listed,
                        active: token.active
                    }
                })
                await dispatch(actionCreators.addToken(token, pairs))
                return
            }

            token = await api.checkToken(asset)
            if (!token || !token.symbol || !token.asset) // not in the DAG
                return { error: 'Asset not found' }

            let pairs = await api.createPairs(token.asset)
            if (pairs) await dispatch(actionCreators.addToken(token, pairs))

            return { token, pairs }
        } catch (e) {
            console.log(e)

            return { error: e.message }
        }
    }
}