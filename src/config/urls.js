import * as env from './environment.js'

export const ENGINE_HTTP_URL = env.ENGINE_HTTP_URL
export const ENGINE_WS_URL = env.ENGINE_WS_URL


export const EXCHANGE_RATE_API_URL = "/rates"
export const DISCORD_URL = 'https://discord.obyte.org'
// export const EXCHANGE_RATE_API_URL = 'https://min-api.cryptocompare.com'

const EXPLORER_LIVENET_URL = 'https://explorer.obyte.org'
const EXPLORER_TESTNET_URL = 'https://testnetexplorer.obyte.org'

const TESTNET_PROTOCOL = "obyte-tn:"
const LIVENET_PROTOCOL = "obyte:"

const CHATBOT_TESTNET_URL = TESTNET_PROTOCOL + "AmjBNeOTQIUPTv5/bycfSak5SgREkcQ38y2JH6zXwnQc@obyte.org/bb-test#"
const CHATBOT_LIVENET_URL = LIVENET_PROTOCOL + "AmjBNeOTQIUPTv5/bycfSak5SgREkcQ38y2JH6zXwnQc@obyte.org/bb#"

export const MEDIUM_URLS = {
    ODEX_INTRODUCTION: 'https://medium.com/obyte/whats-next-for-obyte-a-decentralized-exchange-fd7164569a9d',
}



export const EXPLORER_URL = { 'livenet': EXPLORER_LIVENET_URL, 'testnet': EXPLORER_TESTNET_URL }[env.DEFAULT_NETWORK_ID]
export const CHATBOT_URL = { 'livenet': CHATBOT_LIVENET_URL, 'testnet': CHATBOT_TESTNET_URL }[env.DEFAULT_NETWORK_ID]
export const PROTOCOL = { 'livenet': LIVENET_PROTOCOL, 'testnet': TESTNET_PROTOCOL }[env.DEFAULT_NETWORK_ID]




