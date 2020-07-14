// @flow
import React from 'react';
import WalletInfoRenderer from './WalletInfoRenderer';

import { EXPLORER_URL } from '../../config/urls'

import type { TokenData, Token, TokenPairs } from '../../types/tokens'
import type { BrowserWallet } from '../../types/account'


import { getAaStateVars, getHistory, getWitnesses } from '../../store/services/api'
import { generateWallet } from '../../utils/wallet';

type Props = {
  accountAddress: string,
  browserWallet: BrowserWallet,
  gbyteBalance: number,
  userTokens: Array<string>,
  listedTokens: Array<string>,
  detectToken: string => { decimals: number, symbol: string, isRegistered: boolean },
  addToken: string => { error: string, token: Token, pairs: TokenPairs },
  registerToken: string => { error?: string, token?: Token, pairs?: TokenPairs },
  updateBrowserWallet: void => string,
  recentTransactions: Array<Tx>,
  exchangeAddress: string,
  tokenData: Array<TokenData>,
}

type State = {
  isModalOpen: boolean,
  selectedTab: string,
  assetStatus: string,
  asset: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenIsRegistered: ?boolean,
  addTokenPending: boolean,
  registerTokenPending: boolean,
  address: string,
  authorizations: Array,
  showRevokeModal: boolean,
  revokeAddress: string,
  transactions: Array,
  passphrase: string
}

export default class WalletInfo extends React.PureComponent<Props, State> {
  state = { 
    isModalOpen: false,
    selectedTab: "Portfolio",
    asset: "",
    assetStatus: "",
    tokenDecimals: 0,
    tokenSymbol: "",
    tokenIsRegistered: null,
    addTokenPending: false,
    registerTokenPending: false,
    address: '',
    authorizations: [],
    showRevokeModal: false,
    revokeAddress: '',
    transactions: null,
    passphrase: ''
  };

  componentDidMount() {
    const { exchangeAddress, accountAddress } = this.props
    getAaStateVars(exchangeAddress)
      .then(res => {
        const authorizations = Object.keys(res)
          .filter(key => key.indexOf(`grant_${accountAddress}`) >= 0 && res[key] === 1)
          .map(key => String(key).split('_to_')[1])
        this.setState({
          authorizations
        })
      })
      .catch(err => {})

    getHistory(accountAddress)
      .then(({ joints }) => {
        const transactions = joints
          .map(element => {
            const fMessages = element.unit.messages.filter(message => {
              const {
                payload: { outputs },
                app,
              } = message;
              if (app !== 'payment') return false;
              return outputs.map(output => output.address)
            });
            return { ...element, unit: { ...element.unit, messages: fMessages } };
          })
          .filter(transaction => transaction.unit.messages.length > 0)
          .sort(({unit: {timestamp: timestamp1}}, {unit: {timestamp: timestamp2}}) => {
            if (timestamp1 > timestamp2) {
              return -1;
            }
            if (timestamp1 > timestamp2) {
              return 1;
            }
            return 0;
          });

        this.setState({
          transactions,
        });
      })
      .catch(err => console.error('-err-', err));
  }

  handleToggleRevokeModal = (revokeAddress = '') => {
    this.setState({
      showRevokeModal: !this.state.showRevokeModal,
      revokeAddress,
    })
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  };

  handleChangeTab = (tab: string) => {
    this.setState({ selectedTab: tab })
  }

  handleChangeAsset = ({ target }: *) => {
    this.setState({ asset: target.value })
  }

  handleChangeAddress = ({ target }: *) => {
    this.setState({ address: target.value, showLink: false });
  }

  handleChagePassphrase = ({ target }: *) => {
    this.setState({ passphrase: target.value })
  }

  handleDetectToken = async () => {
    const { asset } = this.state
    const { detectToken } = this.props 

    if (asset.length !== 44 && asset !== asset.toUpperCase()) {
      return this.setState({ assetStatus: "invalid" })
    }

    const { decimals, symbol, isRegistered } = await detectToken(asset)

    if (!symbol) {
      return this.setState({ assetStatus: "invalid" })
    }

    return this.setState({ 
      tokenSymbol: symbol,
      tokenDecimals: decimals,
      tokenIsRegistered: isRegistered
    })
  }

  handleAddToken = async () => {
    const { asset } = this.state
    const { addToken } = this.props

    this.setState({ addTokenPending: true })
    const { error, token, pairs } = await addToken(asset)
    this.setState({ addTokenPending: false })

    if (error) {
      console.log(error)
    } else {
      console.log(token)
      console.log(pairs)
    }
  }

  handleRegisterToken = async () => {
    const { asset } = this.state
    const { registerToken } = this.props

    this.setState({ registerTokenPending: true })
    const { error } = await registerToken(asset)
    this.setState({ registerTokenPending: false })

    if (error) {
      console.log(error)
    } else {
      return this.setState({ tokenIsRegistered: true })
    }
  }

  handleAddBrowserWallet = () => {
    const { updateBrowserWallet } = this.props;
    const { passphrase } = this.state
    const browserWallet = {
      ...generateWallet(passphrase),
      encrypted: !!passphrase,
      requestConfirm: false,
    }
    updateBrowserWallet(browserWallet)
    sessionStorage.setItem("passphrase", passphrase);
  }

  handleRemoveBrowserWallet = () => {
    const { updateBrowserWallet } = this.props;
    const browserWallet = {
      address: '',
      wif: '',
      phrase: '',
      encrypted: false,
      requestConfirm: false
    }
    updateBrowserWallet(browserWallet)
    sessionStorage.setItem("passphrase", '');
  }

  handleToggleRequestConfirm = () => {
    const { updateBrowserWallet, browserWallet } = this.props;
    updateBrowserWallet({
      ...browserWallet,
      requestConfirm: !browserWallet.requestConfirm
    })
  }

  render() {
    const {
      props: { 
        accountAddress,
        browserWallet,
        gbyteBalance,
        userTokens,
        listedTokens,
        recentTransactions,
        exchangeAddress,
        tokenData
      },
      state: { 
        isModalOpen,
        selectedTab,
        asset,
        tokenSymbol,
        assetStatus,
        tokenIsRegistered,
        addTokenPending,
        registerTokenPending,
        address,
        authorizations,
        showLink,
        showRevokeModal,
        revokeAddress,
        transactions,
        passphrase
      },
      handleModalClose,
      handleChangeTab,
      handleChangeAsset,
      handleDetectToken,
      handleRegisterToken,
      handleAddToken,
      handleChangeAddress,
      handleChagePassphrase,
      handleToggleRevokeModal,
      handleAddBrowserWallet,
      handleRemoveBrowserWallet,
      handleToggleRequestConfirm
    } = this;

    let tokenExplorerUrl = `${EXPLORER_URL}/#${asset}`
    let accountExplorerUrl = `${EXPLORER_URL}/#${accountAddress}`
    let tokenIsAdded = userTokens.indexOf(asset) !== -1
    let tokenIsListed = listedTokens.indexOf(asset) !== -1

    return (
      <WalletInfoRenderer
        balance={gbyteBalance}
        isModalOpen={isModalOpen}
        selectedTab={selectedTab}
        accountAddress={accountAddress}
        browserWallet={browserWallet}
        accountExplorerUrl={accountExplorerUrl}
        asset={asset}
        assetStatus={assetStatus}
        tokenSymbol={tokenSymbol}
        tokenExplorerUrl={tokenExplorerUrl}
        tokenIsAdded={tokenIsAdded}
        tokenIsListed={tokenIsListed}
        address={address}
        passphrase={passphrase}
        showLink={showLink}
        authorizations={authorizations}
        tokenIsRegistered={tokenIsRegistered}
        exchangeAddress={exchangeAddress}
        handleModalClose={handleModalClose}
        handleChangeTab={handleChangeTab}
        handleChangeAsset={handleChangeAsset}
        handleDetectToken={handleDetectToken}
        handleAddToken={handleAddToken}
        handleRegisterToken={handleRegisterToken}
        registerTokenPending={registerTokenPending}
        addTokenPending={addTokenPending}
        recentTransactions={recentTransactions}
        handleChangeAddress={handleChangeAddress}
        handleChangePassphrase={handleChagePassphrase}
        showRevokeModal={showRevokeModal}
        revokeAddress={revokeAddress}
        handleToggleRevokeModal={handleToggleRevokeModal}
        transactions={transactions}
        tokenData={tokenData}
        handleAddBrowserWallet={handleAddBrowserWallet}
        handleRemoveBrowserWallet={handleRemoveBrowserWallet}
        handleToggleRequestConfirm={handleToggleRequestConfirm}
      />
    );
  }
}
