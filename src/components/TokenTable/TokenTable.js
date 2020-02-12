// @flow
import React from 'react';
import styled from 'styled-components';
import TokenTableRenderer from './TokenTableRenderer';
import DepositModal from '../../components/DepositModal';
import TransferTokensModal from '../../components/TransferTokensModal';

import type { Token } from '../../types/tokens';

type TokenData = {
  symbol: string,
  asset: string,
  balance: number,
  value: number,
  decimals: number,
  quote?: ?bool,
  registered?: ?bool,
  listed?: ?bool,
  active?: ?bool,
}

type Props = {
  connected: boolean,
  tokenData: Array<TokenData>,
  baseTokens: Array<string>,
  quoteTokens: Array<string>,
  redirectToTradingPage: string => void,
  referenceCurrency: string
};

type State = {
  isDepositModalOpen: boolean,
  isSendModalOpen: boolean,
  selectedTokenSymbol: string,
  hideZeroBalanceToken: boolean,
  searchInput: string,
};

class TokenTable extends React.PureComponent<Props, State> {
  state = {
    isDepositModalOpen: false,
    isSendModalOpen: false,
    selectedTokenSymbol: 'GBYTE',
    hideZeroBalanceToken: false,
    searchInput: '',
  };

  /*componentDidMount() {
    if (!this.state.selectedToken)
      this.updateSelectedToken('GBYTE')
  }*/

  getSelectedToken = () => {
    return this.props.tokenData.filter(elem => elem.symbol === this.state.selectedTokenSymbol)[0]
  }

  openDepositModal = (event: SyntheticEvent<>, symbol: string) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    let selectedToken = this.props.tokenData.filter(elem => elem.symbol === symbol)[0];

    this.setState({
      isDepositModalOpen: true,
      selectedTokenSymbol: symbol,
    });
  };

  openSendModal = (event: SyntheticEvent<>, symbol: string) => {
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    let selectedToken = this.props.tokenData.filter(elem => elem.symbol === symbol)[0];

    this.setState({
      isSendModalOpen: true,
      selectedTokenSymbol: symbol,
    });
  };



  closeDepositModal = () => {
    this.setState({ isDepositModalOpen: false });
  };

  closeSendModal = () => {
    this.setState({ isSendModalOpen: false });
  };


  handleSearchInputChange = (e: SyntheticInputEvent<>) => {
    this.setState({ searchInput: e.target.value });
  };

  toggleZeroBalanceToken = () => {
    this.setState({ hideZeroBalanceToken: !this.state.hideZeroBalanceToken });
  };

  updateSelectedToken = (symbol: string) => {
    //let selectedToken = this.props.tokenData.filter(elem => elem.symbol === symbol)[0];
    this.setState({ selectedTokenSymbol: symbol })
  }

  filterTokens = (data: Array<TokenData>) => {
    const { searchInput, hideZeroBalanceToken } = this.state;

    if (searchInput) data = data.filter(token => token.symbol.indexOf(searchInput.toUpperCase()) > -1);
    if (hideZeroBalanceToken) data = data.filter(token => token.symbol === 'GBYTE' || Number(token.balance) !== 0);

    return data;
  };

  render() {
    let {
      connected,
      tokenData,
      baseTokens,
      redirectToTradingPage,
      referenceCurrency
     } = this.props;

    let {
      isDepositModalOpen,
      isSendModalOpen,
      selectedTokenSymbol,
      searchInput,
      hideZeroBalanceToken,
     } = this.state;

     let baseTokenData = tokenData.filter((token: TokenData) => baseTokens.indexOf(token.symbol) === -1)

    let selectedTokenData = tokenData.filter((token: TokenData) => token.symbol === selectedTokenSymbol)[0]
     
    let filteredBaseTokenData = this.filterTokens(baseTokenData)
    let totalFilteredTokens = filteredBaseTokenData.length

    return (
      <Wrapper>
        <TokenTableRenderer
          connected={connected}
          baseTokensData={filteredBaseTokenData}
          tokenDataLength={tokenData.length}
          searchInput={searchInput}
          hideZeroBalanceToken={hideZeroBalanceToken}
          openDepositModal={this.openDepositModal}
          openSendModal={this.openSendModal}
          toggleZeroBalanceToken={this.toggleZeroBalanceToken}
          handleSearchInputChange={this.handleSearchInputChange}
          redirectToTradingPage={redirectToTradingPage}
          totalFilteredTokens={totalFilteredTokens}
          referenceCurrency={referenceCurrency}
          updateSelectedToken={this.updateSelectedToken}
          selectedTokenSymbol={selectedTokenSymbol}
          selectedTokenData={selectedTokenData}
        />
        <DepositModal
          isOpen={isDepositModalOpen}
          handleClose={this.closeDepositModal}
          token={this.getSelectedToken()}
          tokenData={tokenData}
        />
        <TransferTokensModal
          isOpen={isSendModalOpen}
          handleClose={this.closeSendModal}
          token={this.getSelectedToken()}
        />
      </Wrapper>
    );
  }
}

export default TokenTable;

const Wrapper = styled.div`
  height: 100%;
`;
