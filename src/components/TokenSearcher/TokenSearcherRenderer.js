// @flow
import React from 'react'
import styled from 'styled-components'

import { 
  Icon, 
  Tooltip, 
  Card, 
  Tabs, 
  Tab, 
  Button, 
  Collapse,  
} from '@blueprintjs/core'

import {
  formatNumber
} from 'accounting-js'

import {
  Colors,
  Box,
  SmallText,
  Centered,
  Chevron,
  OverlaySpinner,
  ColoredCryptoIcon,
  SmallTextDiv,
  FlexRow,
  InputGroup,
  BlueGlowingButton
} from '../Common'

import {
  List,
  AutoSizer
} from 'react-virtualized'

import {
  isNotNull, round
} from '../../utils/helpers'

import type { Node } from 'react'


type Token = {
  pair: string,
  lastPrice: number,
  change: string,
  high: number,
  low: number,
  volume: number,
  base: string,
  quote: string,
  favorited: boolean
}

type Props = {
  loading: boolean,
  filteredPairs: any,
  selectedTabId: string,
  baseTokenBalance: number,
  quoteTokenBalance: number,
  baseTokenAvailableBalance: number,
  quoteTokenAvailableBalance: number,
  baseToken: Object,
  quoteToken: Object,
  searchFilter: string,
  selectedPair: Token,
  filterName: string,
  sortOrder: string,
  isOpen: boolean,
  quoteTokens: Array<string>,
  onChangeSortOrder: string => void,
  changeTab: string => void,
  updateFavorite: (string, boolean) => void,
  onChangeSearchFilter: (SyntheticInputEvent<>) => void,
  onChangeFilterName: (SyntheticInputEvent<>) => void,
  changeSelectedToken: Token => void,
  toggleCollapse: () => void,
  expand: () => void,
  onContextMenu: () => Node,
  openDepositModal: (SyntheticEvent<>) => void,
  openSendModal: (SyntheticEvent<>) => void,
}

const TokenSearchRenderer = (props: Props) => {
  const {
    loading,
    filteredPairs,
    quoteTokens,
    selectedTabId,
    searchFilter,
    isOpen,
    selectedPair,
    sortOrder,
    filterName,
    updateFavorite,
    onChangeFilterName,
    onChangeSearchFilter,
    onChangeSortOrder,
    changeTab,
    changeSelectedToken,
    toggleCollapse,
    baseTokenBalance,
    quoteTokenBalance,
    baseTokenAvailableBalance,
    quoteTokenAvailableBalance,
    baseToken,
    quoteToken,
    expand,
    onContextMenu,
    openDepositModal,
    openSendModal
  } = props

  return (
    <TokenSearchCard>
      {loading ? (
        <OverlaySpinner visible={loading} transparent />
      ) : (
        <TokenSearchCardWrapper onContextMenu={onContextMenu}>
          <TokenSearcherToolBar>
            <SearchInput
              leftIcon="search"
              onChange={onChangeSearchFilter}
              value={searchFilter}
              placeholder="Search Token ..."
            />
            <FlexRow alignItems="center" ml={1}>
              <Button icon='zoom-to-fit' onClick={expand} minimal small />
              <Button icon='move' className="drag" minimal small />
              <Button icon={isOpen ? 'chevron-up' : 'chevron-down'} onClick={toggleCollapse} minimal small />
            </FlexRow>
          </TokenSearcherToolBar>
          <Collapse isOpen={isOpen}>
            <SelectedPair
              selectedPair={selectedPair}
              baseTokenBalance={baseTokenBalance}
              quoteTokenBalance={quoteTokenBalance}
              baseTokenAvailableBalance={baseTokenAvailableBalance}
              quoteTokenAvailableBalance={quoteTokenAvailableBalance}
              baseToken={baseToken}
              quoteToken={quoteToken}
              openDepositModal={openDepositModal}
              openSendModal={openSendModal}
            />
            <TabsWrapper>
              <Tabs selectedTabId={selectedTabId} onChange={changeTab} renderActiveTabPanelOnly={true}>
                <Tab
                  id="star"
                  title={<Icon icon="star" />}
                  panel={
                    <Panel
                      tokenPairs={filteredPairs.favorites}
                      filterName={filterName}
                      sortOrder={sortOrder}
                      searchFilter={searchFilter}
                      selectedTabId={selectedTabId}
                      selectedPair={selectedPair}
                      changeSelectedToken={changeSelectedToken}
                      updateFavorite={updateFavorite}
                      onChangeSearchFilter={onChangeSearchFilter}
                      onChangeFilterName={onChangeFilterName}
                      onChangeSortOrder={onChangeSortOrder}
                    />
                  }
                />
                {quoteTokens.map((quote, index) => (
                  <Tab
                    id={quote}
                    key={index}
                    title={quote}
                    panel={
                      <Panel
                        tokenPairs={filteredPairs[quote]}
                        filterName={filterName}
                        sortOrder={sortOrder}
                        searchFilter={searchFilter}
                        selectedTabId={selectedTabId}
                        selectedPair={selectedPair}
                        filteredPairs={filteredPairs}
                        changeSelectedToken={changeSelectedToken}
                        updateFavorite={updateFavorite}
                        onChangeSearchFilter={onChangeSearchFilter}
                        onChangeFilterName={onChangeFilterName}
                        onChangeSortOrder={onChangeSortOrder}
                      />
                    }
                  />
                ))}
              </Tabs>
            </TabsWrapper>
          </Collapse>
        </TokenSearchCardWrapper>
      )}
    </TokenSearchCard>
  )
}

export default TokenSearchRenderer

type PanelProps = {
  filterName: string,
  sortOrder: string,
  searchFilter: string,
  selectedTabId: string,
  selectedPair: Token,
  tokenPairs: Array<Token>,
  changeSelectedToken: Token => void,
  updateFavorite: (string, boolean) => void,
  onChangeSearchFilter: (SyntheticInputEvent<>) => void,
  onChangeFilterName: (SyntheticInputEvent<>) => void,
  onChangeSortOrder: string => void
}

const Panel = (props: PanelProps) => {
  const {
    filterName,
    tokenPairs,
    sortOrder,
    selectedTabId,
    updateFavorite,
    onChangeFilterName,
    changeSelectedToken
  } = props


  const isFavoriteTokensList = selectedTabId === 'star'

  const rowRenderer = ({ key, index, style }: *) => { 
    return (
      <TokenRow
        key={key}
        row_key={key}
        index={index}
        style={style} 
        token={tokenPairs[index]}
        selectedTabId={selectedTabId}
        isFavoriteTokensList={isFavoriteTokensList}
        updateFavorite={updateFavorite}
        changeSelectedToken={changeSelectedToken}
      />
    )
  }

  const noRowRenderer = () => {
    return (
      <Centered>No Tokens to show</Centered>
    )
  }

  return (
    <TokenSearchPanelBox>
      <Header
        onChangeFilterName={onChangeFilterName}
        isFavoriteTokensList={isFavoriteTokensList}
        filterName={filterName}
        sortOrder={sortOrder}
      />
      <ListBox>
        <AutoSizer style={{ height: '300px'}}>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={tokenPairs.length}
              rowHeight={30}
              rowRenderer={rowRenderer}
              noRowsRenderer={noRowRenderer}
            />
          )}
        </AutoSizer>
      </ListBox>
    </TokenSearchPanelBox>
  )
}

type TokenRowProps = {
  index: number,
  token: Token,
  isFavoriteTokensList: boolean,
  updateFavorite: (string, boolean) => void,
  changeSelectedToken: Object => void
}

const TokenRow = ({ index, row_key, style, token, updateFavorite, isFavoriteTokensList, changeSelectedToken }: TokenRowProps) => {
  const { favorited, lastPrice, change, base, pair } = token
  return (
    <li key={row_key} className="row" style={style}>
      <ColoredCryptoIcon size={25} name={base} />
      <SmallText
        className="base" 
        onClick={() => changeSelectedToken(token)}
      >
        {isFavoriteTokensList ? pair : base}
      </SmallText>
      <SmallText 
        className="lastPrice" 
        onClick={() => changeSelectedToken(token)}
      >
        {lastPrice ? formatNumber(lastPrice, { precision: 3 }) : 'N.A'}
      </SmallText>
      <Change24H 
        change={change} 
        onClick={() => changeSelectedToken(token)}
      >
        {isNotNull(change) ? `${formatNumber(change, { precision: 2 })}%` : 'N.A'}
      </Change24H>
      <SmallText className="star">
        <Tooltip
          hoverOpenDelay={500} 
          content={favorited ? ' Unfavorite' : 'Favorite'}
        >
          <Icon icon={favorited ? 'star' : 'star-empty'} onClick={() => updateFavorite(pair, !favorited)} />
        </Tooltip>
      </SmallText>
    </li>
  )
}

type HeaderProps = {
  onChangeFilterName: (SyntheticInputEvent<>) => void,
  filterName: string,
  sortOrder: string,
  isFavoriteTokensList: boolean
}

const Header = ({ onChangeFilterName, filterName, sortOrder, isFavoriteTokensList }: HeaderProps) => {
  return (
    <ListHeader>
      <li className="heading">
        <SmallText className="base" onClick={onChangeFilterName}>
          {isFavoriteTokensList ? 'Token Pair' : 'Token'}
          {filterName === 'base' && (
            <span className="icon">
              <Chevron direction={sortOrder} />
            </span>
          )}
        </SmallText>
        <span />
        <SmallText className="lastPrice" onClick={onChangeFilterName}>
          Last Price
          {filterName === 'lastPrice' && (
            <span className="icon">
              <Chevron direction={sortOrder} />
            </span>
          )}
        </SmallText>
        <SmallText className="change" onClick={onChangeFilterName}>
          Change 24H
          {filterName === 'change' && (
            <span className="icon">
              <Chevron direction={sortOrder} />
            </span>
          )}
        </SmallText>
        <span className="star">&nbsp;</span>
      </li>
    </ListHeader>
  )
}

const SelectedPair = (props: *) => {
  const { 
    selectedPair,
    baseTokenBalance,
    quoteTokenBalance,
    baseTokenAvailableBalance,
    quoteTokenAvailableBalance,
    baseToken,
    quoteToken,
    openDepositModal,
    openSendModal
  } = props

  const { 
    pair, 
    lastPrice, 
    volume, 
    high, 
    low, 
    quote, 
    base
  } = selectedPair

  return (
    <SelectedPairCard>
      <Row>
        <Box p={1}>
          <ColoredCryptoIcon size={60} name={base} />
        </Box>
        <TokenPair>
          <h2>{pair}</h2>
          <SmallTextDiv>
          <b>{base} </b> 
            Balance: {round(baseTokenAvailableBalance, baseToken.decimals)} / {round(baseTokenBalance, baseToken.decimals)}
          </SmallTextDiv>
          <SmallTextDiv>
          <b>{quote} </b> 
            Balance: {round(quoteTokenAvailableBalance, quoteToken.decimals) } / {round(quoteTokenBalance, quoteToken.decimals)}
          </SmallTextDiv>
        </TokenPair>
      </Row>
      <PairList>
        <Item>
          <SmallTextDiv>Price:</SmallTextDiv>
          <SmallTextDiv>{ lastPrice ? `${ formatNumber((lastPrice), { precision: 5 }) } ${quote}` : 'N.A'}</SmallTextDiv>
        </Item>
        <Item>
          <SmallTextDiv>Volume:</SmallTextDiv>
          <SmallTextDiv>{volume ? formatNumber(volume, { precision: 2 }) + " " + base : 'N.A'  }</SmallTextDiv>
        </Item>
        <Item>
          <SmallTextDiv>High:</SmallTextDiv>
          <SmallTextDiv>{high ? formatNumber(high, { precision: 2 }) + " " + quote : 'N.A' }</SmallTextDiv>
        </Item>
        <Item>
          <SmallTextDiv>Low:</SmallTextDiv>
          <SmallTextDiv>{low ? formatNumber(low, { precision: 2 }) + " " + quote : 'N.A'}</SmallTextDiv>
        </Item>
      </PairList>
      <ActionBox>
        <ButtonWrapper>
          <BlueGlowingButton
            intent="primary"
            text="Deposit"
            onClick={(event) => openDepositModal(event)}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <BlueGlowingButton
            intent="primary"
            text="Withdraw"
            onClick={(event) => openSendModal(event)}
          />
        </ButtonWrapper>
      </ActionBox>
    </SelectedPairCard>
  )
}

const TokenSearchCard = styled(Card).attrs({
  className: 'token-searcher'
})`
  position: relative;
  height: 100%;
`

const TokenSearchCardWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow: visible;
  ::-webkit-scrollbar {
    width: 0px !important;  /* Remove scrollbar space */
    background: transparent !important;  /* Optional: just make scrollbar invisible */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const TokenSearchPanelBox = styled.div`
  margin-top: 10px;
`

const SelectedPairCard = styled(Card)`
  margin: 15px 0px;
  padding: 5px 15px;
  overflow-x: auto;
  width: 100%;
`

const ListBox = styled.ul.attrs({ className: 'list' })`
  height: 100%;
  position: relative;
  .row {
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }
`;

const PairList = styled.ul`
  border-top: 1px dashed #202f39;
  padding-top: 15px;
  margin-top: 5px;
  padding-left: 0px !important;
  margin-left: 0px !important;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding-left: 0px !important;
  margin-left: 0px !important;
`;

const TokenPair = styled.div`
  padding-left: 15px;

  h2 {
    margin: 0;
  }
`

const SearchInput = styled(InputGroup)`
  width: 92%;
  padding-bottom: 10px;
`

const ListHeader = styled.ul`
  margin: 10px 0 7px;
  padding-left: 0px !important;
  margin-left: 0px !important;
`

const Change24H = styled(SmallText).attrs({ className: 'change' })`
  color: ${props => (props.change > 0 ? Colors.GREEN5 : Colors.RED4)} !important;
`

const TokenSearcherToolBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  height: 30px;
`

const TabsWrapper = styled.div`
  .bp3-tab-list {
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 5px;
    }
  }

`

const ButtonWrapper = styled.span`  
  margin-left: 10px !important;
  margin-right: 10px !important;
`;

const ActionBox = styled.div`
  display: flex;
  justify-content: center;
`