// @flow
import React from 'react';
import WalletInfoRenderer from './WalletInfoRenderer';

import { EXPLORER_URL } from '../../config/urls'

import type { Token, TokenPairs } from '../../types/tokens'
import type { Tx } from '../../types/transactions'
import { getAaStateVars } from '../../store/services/api'

type Props = {
  accountAddress: string,
  gbyteBalance: number,
  userTokens: Array<string>,
  listedTokens: Array<string>,
  detectToken: string => { decimals: number, symbol: string, isRegistered: boolean },
  addToken: string => { error: string, token: Token, pairs: TokenPairs },
  registerToken: string => { error?: string, token?: Token, pairs?: TokenPairs },
  recentTransactions: Array<Tx>,
  exchangeAddress: string,
};

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
};

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
  }

  componentDidMount() {
    const { exchangeAddress, accountAddress } = this.props
    getAaStateVars(exchangeAddress)
      .then(res => {
        const authorizations = Object.keys(res)
          .filter(key => key.indexOf(`grant_${accountAddress}`) >= 0 && res[key] === '1')
          .map(key => key)
        const uniqueAuthorizations = authorizations.filter(
          (element, index) => authorizations.indexOf(element) === index
        )
        this.setState({
          authorizations: uniqueAuthorizations,
        })
      })
      .catch(err => {})
  }

  handleToggleRevokeModal = (revokeAddress = '') => {
    this.setState({
      showRevokeModal: !this.state.showRevokeModal,
      revokeAddress,
    })
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  handleChangeTab = (tab: string) => {
    this.setState({ selectedTab: tab })
  }

  handleChangeAsset = ({ target }: *) => {
    this.setState({ asset: target.value })
  }

  handleChangeAddress = ({ target }: *) => {
    this.setState({ address: target.value, showLink: false });
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

  render() {
    const {
      props: { 
        
        accountAddress, 
        gbyteBalance, 
        userTokens, 
        listedTokens, 
        recentTransactions, 
        exchangeAddress 
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
      },
      handleModalClose,
      handleChangeTab,
      handleChangeAsset,
      handleDetectToken,
      handleRegisterToken,
      handleAddToken,
      handleChangeAddress,
      handleToggleRevokeModal,
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
        accountExplorerUrl={accountExplorerUrl}
        asset={asset}
        assetStatus={assetStatus}
        tokenSymbol={tokenSymbol}
        tokenExplorerUrl={tokenExplorerUrl}
        tokenIsAdded={tokenIsAdded}
        tokenIsListed={tokenIsListed}
        address={address}
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
        showRevokeModal={showRevokeModal}
        revokeAddress={revokeAddress}
        handleToggleRevokeModal={handleToggleRevokeModal}
      />
    );
  }
}
