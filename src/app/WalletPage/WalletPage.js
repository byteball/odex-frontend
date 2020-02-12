// @flow
import React from 'react'
import WalletPageRenderer from './WalletPageRenderer'
import { Redirect } from 'react-router-dom'

import type { State } from '../../types'
import type { TokenData } from '../../types/tokens'
import type { Tx } from '../../types/transactions'

import { loadShowHelpModalSetting } from '../../store/services/storage'

export type Props = {
  connected: boolean,
  accountAddress: string,
  authenticated: boolean,
  queryAccountData: void => void,
  redirectToTradingPage: string => void,
  openConnection: void => void,
  tokenData: Array<TokenData>,
  baseTokens: Array<string>,
  quoteTokens: Array<string>,
  showHelpModal: boolean,
  closeHelpModal: boolean => void,
  balancesLoading: boolean,
  referenceCurrency: string,
  recentTransactions: Array<Tx>
}

class WalletPage extends React.PureComponent<Props, State> {

  componentDidMount() {
    const { authenticated, queryAccountData } = this.props
    if (authenticated) queryAccountData()
  }

  checkOpenHelpModal = () => {
    const showHelpModalSetting = loadShowHelpModalSetting()
    const { authenticated, showHelpModal, balancesLoading } = this.props

    if (!showHelpModalSetting) return false
    if (!authenticated) return false
    if (!showHelpModal) return false
    if (balancesLoading) return false

    return true
  }

  render() {
    const {
      connected,
      authenticated,
      accountAddress,
      redirectToTradingPage,
      tokenData,
      quoteTokens,
      baseTokens,
      closeHelpModal,
      balancesLoading,
      referenceCurrency,
      recentTransactions
    } = this.props


    if (!authenticated) return <Redirect to="/login" />

    const isHelpModalOpen = this.checkOpenHelpModal()

    return (
      <WalletPageRenderer
        tokenData={tokenData}
        baseTokens={baseTokens}
        quoteTokens={quoteTokens}
        connected={connected}
        accountAddress={accountAddress}
        balancesLoading={balancesLoading}
        redirectToTradingPage={redirectToTradingPage}
        isHelpModalOpen={isHelpModalOpen}
        closeHelpModal={closeHelpModal}
        referenceCurrency={referenceCurrency}
        recentTransactions={recentTransactions}
      />
    )
  }
}

export default WalletPage
