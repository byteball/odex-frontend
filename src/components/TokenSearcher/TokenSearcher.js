//@flow
import React from 'react';
import TokenSearcherRenderer from './TokenSearcherRenderer';
import { sortTable } from '../../utils/helpers';
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core'
import { getQuoteToken, getBaseToken } from '../../utils/tokens';
import history from '../../store/history';
//TODO not sure exactly where to define this type.
type Token = {
  pair: string,
  lastPrice: number,
  change: string,
  low: number,
  high: number,
  volume: number,
  base: string,
  quote: string,
  favorited: boolean,
};

type Props = {
  tokenPairsByQuoteToken: { [string]: Array<Token> },
  currentPair: Object,
  baseTokenBalance: number,
  quoteTokenBalance: number,
  baseTokenAvailableBalance: number,
  quoteTokenAvailableBalance: number,
  updateFavorite: (string, boolean) => void,
  updateCurrentPair: string => void,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: string => void,
  autoSymbolRegistration: string => void
};

type State = {
  quoteTokens: Array<string>,
  searchFilter: string,
  selectedPair: ?Token,
  filterName: string,
  sortOrder: string,
  selectedTabId: string,
  orderChanged: boolean,
  isOpen: boolean,
  initPairs: boolean,
};

class TokenSearcher extends React.PureComponent<Props, State> {
  state = {
    quoteTokens: [],
    searchFilter: '',
    selectedPair: null,
    filterName: 'symbol',
    sortOrder: 'asc',
    selectedTabId: '',
    orderChanged: false,
    isOpen: true,
    initPairs: false,
    wasRegistered: false
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let { tokenPairsByQuoteToken, currentPair, pairsList, pairName, isConnected } = nextProps;
    const quoteTokens: Array<string> = Object.keys(tokenPairsByQuoteToken);
    const currentQuoteToken = currentPair.quoteTokenSymbol;

    // const currentQuoteToken = quoteTokens[0];
    const defaultPairs = tokenPairsByQuoteToken[currentQuoteToken];
    const selectedPair = defaultPairs.filter(pair => pair.pair === currentPair.pair)[0];

    const { token1, token2 } = nextProps.match.params;
    const pairsInURL = token1 && token2 ? [token1 + "/" + token2, token2 + "/" + token1] : null

    if (prevState.selectedPair) {
      if (prevState.initPairs) {
        if (pairsInURL) {
          if (currentPair && pairsInURL[0] !== currentPair.pair) {
            history.replace(`/trade/${currentPair.pair}`)
          }
        }
      } else if ("pairsList" in nextProps && nextProps.pairsList.length > 0) {
        if (pairsInURL) {
          if (currentPair && pairsInURL[0] !== currentPair.pair) {
            const urlPair = pairsList.find(pair => pair.pair === pairsInURL[0]);
            if (urlPair) {
              nextProps.updateCurrentPair(urlPair.pair);
              return { initPairs: true, selectedPair: urlPair }
            } else {
              const reverseUrlPair = pairsList.find(pair => pair.pair === pairsInURL[1]);
              if (reverseUrlPair) {
                nextProps.updateCurrentPair(reverseUrlPair.pair);
                return { initPairs: true, selectedPair: reverseUrlPair }
              } else {
                const { quoteTokenSymbols } = nextProps;
                if (isConnected) {
                  if (!prevState.wasRegistered) {
                    if (quoteTokenSymbols.find((token) => token === token1)) {
                      if (!quoteTokenSymbols.find((token) => token === token2)) {
                        nextProps.autoSymbolRegistration(token2)
                        return { wasRegistered: true }
                      } else {
                        history.replace(`/trade/${currentPair.pair}`)
                      }
                    } else if (quoteTokenSymbols.find((token) => token === token2)) {
                      if (!quoteTokenSymbols.find((token) => token === token1)) {
                        nextProps.autoSymbolRegistration(token1)
                        return { wasRegistered: true }
                      } else {
                        history.replace(`/trade/${currentPair.pair}`)
                      }
                    } else {
                      history.replace(`/trade/${currentPair.pair}`)
                    }
                  }
                }
              }
            }
          } else {
            return { initPairs: true, selectedPair }
          }
        } else {
          history.replace(`/trade/${currentPair.pair}`)
        }
      }
      return null
    } else {
      const initPairs = currentPair && pairsInURL && pairsInURL[0] === currentPair.pair
      return {
        quoteTokens: quoteTokens,
        selectedTabId: currentQuoteToken,
        selectedPair: selectedPair, // selectedPair: defaultPairs[0],
        initPairs
      };
    }
  }

  onChangeSearchFilter = ({ target }: SyntheticInputEvent<>) => {
    this.setState({ searchFilter: target.value });
  };

  onChangeFilterName = ({ target }: SyntheticInputEvent<>) => {
    let value = target.className;
    const { filterName, orderChanged } = this.state;

    if (value === filterName && !orderChanged) {
      this.setState({
        filterName: value,
        sortOrder: 'desc',
        orderChanged: true,
      });
    } else {
      this.setState({
        filterName: value,
        sortOrder: 'asc',
        orderChanged: false,
      });
    }
  };

  onChangeSortOrder = (value: string) => {
    this.setState({ sortOrder: value });
  };

  toggleCollapse = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.props.onCollapse('tokenSearcher')
  };


  expand = () => {
    this.props.onExpand('tokenSearcher')
  }

  changeTab = (tabId: string) => {
    this.setState({ selectedTabId: tabId });
  };

  renderContextMenu = () => {
    const {
      state: { isOpen },
      props: { onResetDefaultLayout },
      expand,
      toggleCollapse
    } = this

    return (
      <Menu>
        <MenuItem icon="page-layout" text="Reset Default Layout" onClick={onResetDefaultLayout} />
        <MenuItem icon={isOpen ? "chevron-up" : "chevron-down"} text={isOpen ? "Close" : "Open"} onClick={toggleCollapse} />
        <MenuItem icon="zoom-to-fit" text="Fit" onClick={expand} />
      </Menu>
    );
  }

  filterTokens = () => {
    let result = { favorites: [] };
    const { tokenPairsByQuoteToken } = this.props;
    const { searchFilter, filterName, sortOrder } = this.state;

    for (let quote of Object.keys(tokenPairsByQuoteToken)) {
      result[quote] = tokenPairsByQuoteToken[quote].filter(pair => {
        return pair.base.indexOf(searchFilter.toUpperCase()) > -1;
      });

      result['favorites'] = sortTable(
        result['favorites'].concat(tokenPairsByQuoteToken[quote].filter(pair => pair.favorited)),
        filterName,
        sortOrder
      );
      result[quote] = sortTable(result[quote], filterName, sortOrder);
    }

    return result;
  };

  changeSelectedToken = (token: Token) => {
    this.setState({ selectedPair: token });
    this.props.updateCurrentPair(token.pair);
  };

  render() {
    const {
      state: {
        selectedTabId,
        searchFilter,
        selectedPair,
        sortOrder,
        filterName,
        quoteTokens,
        isOpen
      },
      props: {
        updateFavorite,
        baseTokenBalance,
        quoteTokenBalance,
        baseTokenAvailableBalance,
        quoteTokenAvailableBalance,
      },
      onChangeSearchFilter,
      onChangeFilterName,
      onChangeSortOrder,
      changeTab,
      toggleCollapse,
      changeSelectedToken,
      expand,
      renderContextMenu
    } = this;

    const filteredPairs = this.filterTokens();

    //Temporary loading condition
    let loading = typeof selectedPair === 'undefined';

    return (
      <TokenSearcherRenderer
        loading={loading}
        quoteTokens={quoteTokens}
        selectedTabId={selectedTabId}
        searchFilter={searchFilter}
        baseTokenBalance={baseTokenBalance}
        quoteTokenBalance={quoteTokenBalance}
        // silence-error: couldn't resolve selectedPair === undefined case
        selectedPair={selectedPair}
        sortOrder={sortOrder}
        isOpen={isOpen}
        filterName={filterName}
        filteredPairs={filteredPairs}
        updateFavorite={updateFavorite}
        onChangeSearchFilter={onChangeSearchFilter}
        onChangeFilterName={onChangeFilterName}
        onChangeSortOrder={onChangeSortOrder}
        changeTab={changeTab}
        toggleCollapse={toggleCollapse}
        changeSelectedToken={changeSelectedToken}
        baseTokenAvailableBalance={baseTokenAvailableBalance}
        quoteTokenAvailableBalance={quoteTokenAvailableBalance}
        expand={expand}
        onContextMenu={renderContextMenu}
      />
    );
  }
}

export default ContextMenuTarget(TokenSearcher);
