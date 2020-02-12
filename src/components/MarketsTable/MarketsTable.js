// @flow
import React from 'react';
import styled from 'styled-components';
import MarketsTableRenderer from './MarketsTableRenderer';

export type PairData = {
  pair: string,
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  baseAsset: string,
  baseTokenDecimals: number,
  quoteTokenDecimals: number,
  quoteAsset: string,
  price: number,
  change: number,
  orderVolume: number,
  listed: bool,
  active: bool,
  rank: number
}

type Props = {
  pairs: Array<PairData>,
  quoteTokens: Array<string>,
  redirectToTradingPage: string => void,
  currentReferenceCurrency: string,
  toggleMarketStatistics: void => void
};

type State = {
  searchInput: string,
  selectedTab: string
};

class MarketsTable extends React.PureComponent<Props, State> {
  static defaultProps = {
    pairs: []
  }

  state = {
    searchInput: '',
    selectedTab: this.props.quoteTokens[0] 
  };

  handleSearchInputChange = (e: SyntheticInputEvent<>) => {
    this.setState({ searchInput: e.target.value });
  };

  handleChangeTab = (selectedTab: string ) => {
    this.setState({ selectedTab })
  }

  filterTokens = (pairs: Array<PairData>) => {
    const { searchInput, selectedTab } = this.state;

    if (selectedTab !== 'ALL') pairs = pairs.filter(pair => pair.quoteTokenSymbol === selectedTab)
    if (searchInput) pairs = pairs.filter(pair => pair.baseTokenSymbol.indexOf(searchInput.toUpperCase()) > -1)

    return pairs
  };

  render() {
    let {
      pairs,
      redirectToTradingPage,
      quoteTokens,
      currentReferenceCurrency,
      toggleMarketStatistics
     } = this.props;

    let {
      searchInput,
      selectedTab
     } = this.state;

     let filteredPairs = this.filterTokens(pairs)
     let tabs = quoteTokens.concat(['ALL'])

    return (
      <Wrapper>
        <MarketsTableRenderer
          pairs={filteredPairs}
          searchInput={searchInput}
          handleSearchInputChange={this.handleSearchInputChange}
          redirectToTradingPage={redirectToTradingPage}
          quoteTokens={quoteTokens}
          tabs={tabs}
          selectedTab={selectedTab}
          handleChangeTab={this.handleChangeTab}
          currentReferenceCurrency={currentReferenceCurrency}
          toggleMarketStatistics={toggleMarketStatistics}
        />
      </Wrapper>
    );
  }
}

export default MarketsTable;

const Wrapper = styled.div`
  height: 100%;
`;
