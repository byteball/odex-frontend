// @flow
import React from 'react'
import GetStartedModalRenderer from './GetStartedModalRenderer'

import { setShowHelpModalSetting } from '../../store/services/storage'

import type { Token } from '../../types/tokens';
import type { AccountBalance } from '../../types/accountBalances';

type Props = {
  balances: { [string]: number },
  tokens: Array<Token>,
  address: string,
  GBYTEBalance: number,
  redirectToTradingPage: void => void,
  redirectToFAQPage: void => void,
  isOpen: boolean,
  closeHelpModal: boolean => void,
}

type State = {
  currentTab: string,
  step: string,
  showHelpModalChecked: boolean,
}


class GetStartedModal extends React.PureComponent<Props, State> {
  state = {
    step: '1',
    showHelpModalChecked: false,
    currentTab: "default"
  }

  componentWillUnmount = () => {
    this.handleClose()
  }

  goToFirstStep = () => {
    this.setState({ step: '1' })
  }

  goToSecondStep = () => {
    const {
      GBYTEBalance,
    } = this.props

    /*if (GBYTEBalance > 0) {
      console.log('here')
      this.setState({ step: '3' })
      return
    }*/

    this.setState({ step: '2' })
  }

  goToThirdStep = () => {
    this.setState({ step: '3' })
  }


  toggleShowHelpModalCheckBox = () => {
    this.setState({ showHelpModalChecked: !this.state.showHelpModalChecked })
  }

  handleChangeTab = (tab: string) => {
    this.setState({ currentTab: tab })
  }

  handleClose = () => {
    let { closeHelpModal } = this.props
    let { showHelpModalChecked } = this.state

    setShowHelpModalSetting(!showHelpModalChecked)
    closeHelpModal(false)
  }



  render() {
    const {
      step,
      showHelpModalChecked,
      currentTab
     } = this.state

    const {
      balances,
      tokens,
      address,
      GBYTEBalance,
      redirectToTradingPage,
      redirectToFAQPage,
      isOpen,
    } = this.props

    const userHasBytes = GBYTEBalance > 0


    return (
      <GetStartedModalRenderer
        step={step}
        goToFirstStep={this.goToFirstStep}
        goToSecondStep={this.goToSecondStep}
        goToThirdStep={this.goToThirdStep}
        handleClose={this.handleClose}
        balances={balances}
        tokens={tokens}
        address={address}
        GBYTEBalance={GBYTEBalance}
        userHasBytes={userHasBytes}
        redirectToTradingPage={redirectToTradingPage}
        redirectToFAQPage={redirectToFAQPage}
        toggleShowHelpModalCheckBox={this.toggleShowHelpModalCheckBox}
        showHelpModalChecked={showHelpModalChecked}
        isOpen={isOpen}
        currentTab={currentTab}
        handleChangeTab={this.handleChangeTab}
      />
    )
  }
}

export default GetStartedModal