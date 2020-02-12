// @flow
import React from 'react';
import WalletInfoRenderer from './WalletInfoRenderer';

import { EXPLORER_URL } from '../../config/urls'

import type { Token, TokenPairs } from '../../types/tokens'
import type { Tx } from '../../types/transactions'

type Props = {
  accountAddress: string,
  gbyteBalance: number,
  userTokens: Array<string>,
  listedTokens: Array<string>,
  detectToken: string => { decimals: number, symbol: string, isRegistered: boolean },
  addToken: string => { error: string, token: Token, pairs: TokenPairs },
  registerToken: string => { error?: string, token?: Token, pairs?: TokenPairs },
  recentTransactions: Array<Tx>
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
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  };

  handleChangeTab = (tab: string) => {
    this.setState({ selectedTab: tab })
  }

  handleChangeAsset = ({ target }: *) => {
    this.setState({ asset: target.value })
  }

  handleDetectToken = async () => {
    const { asset } = this.state
    const { detectToken } = this.props 

    if (asset.length !== 44) {
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
        recentTransactions
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
      },
      handleModalClose,
      handleChangeTab,
      handleChangeAsset,
      handleDetectToken,
      handleRegisterToken,
      handleAddToken
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
        tokenIsRegistered={tokenIsRegistered}
        handleModalClose={handleModalClose}
        handleChangeTab={handleChangeTab}
        handleChangeAsset={handleChangeAsset}
        handleDetectToken={handleDetectToken}
        handleAddToken={handleAddToken}
        handleRegisterToken={handleRegisterToken}
        registerTokenPending={registerTokenPending}
        addTokenPending={addTokenPending}
        recentTransactions={recentTransactions}
      />
    );
  }
}
