// @flow
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components';

import { 
  Loading, 
  SmallText,
  Colors,
  Box,
  FlexColumn,
  Text,
  FlexRow
} from '../Common';

import {
    Card,
    Button,
    Collapse,
    ContextMenuTarget,
    Menu,
    MenuItem
} from '@blueprintjs/core'

import { formatNumber } from 'accounting-js'

import type { TokenPair } from '../../types/Tokens'
import type { Node } from 'react'
import type { DisplayMode } from '../../types/account'

type BidOrAsk = {
  price: number,
  amount: number,
  total: number,
};

type Props = {
  bids: Array<BidOrAsk>,
  asks: Array<BidOrAsk>,
  midMarketPrice: ?number,
  spread: ?number,
  onSelect: BidOrAsk => void,
  isOpen: boolean,
  toggleCollapse: SyntheticEvent<> => void,
  expand: SyntheticEvent<> => void,
  currentPair: TokenPair,
  onContextMenu: void => Node,
  onResetDefaultLayout: void => void,
  displayMode: DisplayMode
};

class VerticalOrderBook extends React.Component<Props> {

  renderContextMenu = () => {
    const {
      isOpen,
      onResetDefaultLayout,
      expand,
      toggleCollapse
    } = this.props

    return (
        <Menu>
            <MenuItem icon="page-layout" text="Reset Default Layout" onClick={onResetDefaultLayout} />
            <MenuItem icon={isOpen ? "chevron-up" : "chevron-down"} text={isOpen ? "Close" : "Open"} onClick={toggleCollapse} />
            <MenuItem icon="zoom-to-fit" text="Fit" onClick={expand} />
        </Menu>
    );
  }

  render() {  
    const { 
    bids, 
    asks,
    currentPair, 
    isOpen,
    onSelect,
    toggleCollapse,
    expand,
    midMarketPrice,
    spread,
    displayMode
  } = this.props;

  return (
    <CardBox onContextMenu={this.renderContextMenu}>
      <OrderBookHeader>
        <Heading>
          Order Book
          <Text muted>
            {' '}
            ({currentPair.baseTokenSymbol} / {currentPair.quoteTokenSymbol})
          </Text>
        </Heading>
        <FlexRow>
          <Button 
            icon='zoom-to-fit' 
            minimal 
            onClick={expand} 
            small
          />
          <Button 
            icon='move' 
            className="drag" 
            minimal 
            small
          />
          <Button 
            icon={isOpen ? 'chevron-up' : 'chevron-down'} 
            minimal 
            onClick={toggleCollapse} 
            small
          />
        </FlexRow>
      </OrderBookHeader>
      <Wrapper>
        <Collapse isOpen={isOpen} transitionDuration={100}>
          <OrderListRenderer
            bids={bids} 
            asks={asks} 
            onSelect={onSelect} 
            midMarketPrice={midMarketPrice}
            spread={spread}
            displayMode={displayMode}
          />
        </Collapse>
      </Wrapper>
    </CardBox>
  )
  }
}

export default ContextMenuTarget(VerticalOrderBook)

export const OrderListRenderer = (props: *) => {
  const { 
    bids, 
    asks, 
    onSelect,
    midMarketPrice,
    spread,
    displayMode
  } = props;

  return (
    <OrderListBox>
      <OrderBookBox>
          {!bids && <Loading />}
          {(bids || asks) && (
            <ListContainer>
              <ListHeading>
                <HeaderRow>
                  <HeaderCell>TOTAL</HeaderCell>
                  <HeaderCell>{ displayMode.amountAlias }</HeaderCell>
                  <HeaderCell>{ displayMode.priceAlias }</HeaderCell>
                </HeaderRow>
              </ListHeading>
            </ListContainer>
          )}
          {asks && (
            <ListContainer>
              <List className="bp3-list-unstyled">
                <ReactCSSTransitionGroup
                  transitionName="flash-sell"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {[...asks].reverse().map((order, index) => <SellOrder key={order.price+'-'+order.amount} order={order} displayMode={displayMode} onClick={() => onSelect(order)} />)}
                </ReactCSSTransitionGroup>
              </List>
            </ListContainer>
          )}
          <Box>
            <FlexColumn alignItems="center" my={3}>
                <Text>Midmarket Price: {midMarketPrice ? formatNumber(midMarketPrice, { precision: 5 }) : 'N.A'}</Text>
                <Text>Spread: {spread ? formatNumber(spread, { precision: 2 }) : 'N.A'}%</Text>
            </FlexColumn>
          </Box>
          {bids && (
            <ListContainer>
              <List className="bp3-list-unstyled">
                <ReactCSSTransitionGroup
                  transitionName="flash-buy"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {bids.map((order, index) => <BuyOrder key={order.price+'-'+order.amount} order={order} displayMode={displayMode} onClick={() => onSelect(order)} />)}
                </ReactCSSTransitionGroup>
              </List>
            </ListContainer>
          )}
        </OrderBookBox>
    </OrderListBox>
  );
};

export type SingleOrderProps = {
  order: Object,
  displayMode: DisplayMode,
  onClick: void => void
};

class BuyOrder extends React.Component<SingleOrderProps> {
  
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props, nextProps)
    const { order, displayMode } = this.props;
    const { order: nextOrder, displayMode: nextMode } = nextProps;
    return (order.price !== nextOrder.price || order.amount !== nextOrder.amount || displayMode.name !== nextMode.name);
  }

  render() {
    const { order, displayMode, onClick } = this.props;
    console.log('buy order', order.price)

    return (
      <Row onClick={onClick}>
        <BuyRowBackground amount={order.relativeTotal} />
        <Cell>{formatNumber(displayMode.name === 'Price' ? order.total: order.total * order.price, { precision: 3 })}</Cell>
        <Cell>{formatNumber(displayMode.name === 'Price' ? order.amount: order.amount * order.price, { precision: 3 })}</Cell>
        <Cell color={Colors.BUY}>{formatNumber(displayMode.name === 'Price' ? order.price : 1 / order.price, { precision: 5 })}</Cell>
      </Row>
    );
  }
  
};

class SellOrder extends React.Component<SingleOrderProps> {

  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props, nextProps)
    const { order, displayMode } = this.props;
    const { order: nextOrder, displayMode: nextMode } = nextProps;
    return (order.price !== nextOrder.price || order.amount !== nextOrder.amount || displayMode.name !== nextMode.name);
  }

  render() {
    const { order, displayMode, onClick } = this.props;
    console.log('sell order', order.price)

    return (
      <Row onClick={onClick}>
        <SellRowBackGround amount={order.relativeTotal} />
        <Cell>{formatNumber(displayMode.name === 'Price' ? order.total: order.total * order.price, { precision: 3 })}</Cell>
        <Cell>{formatNumber(displayMode.name === 'Price' ? order.amount: order.amount * order.price, { precision: 3 })}</Cell>
        <Cell color={Colors.SELL}>{formatNumber(displayMode.name === 'Price' ? order.price : 1 / order.price, { precision: 5 })}</Cell>
      </Row>
    );
  }

};
/*
const SellOrder = React.memo((props: SingleOrderProps) => {
  const { order, onClick } = props;
  console.log('sell order', order.price)

  return (
    <Row onClick={onClick}>
      <SellRowBackGround amount={order.relativeTotal} />
      <Cell>{formatNumber(order.total, { precision: 3 })}</Cell>
      <Cell>{formatNumber(order.amount, { precision: 3 })}</Cell>
      <Cell color={Colors.SELL}>{formatNumber(order.price, { precision: 5 })}</Cell>
    </Row>
  );
});*/

const CardBox = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`
const OrderListBox = styled.div``

const OrderBookBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`;

const OrderBookHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const Heading = styled.h3`
  margin: auto;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const List = styled.ul``;

const Row = styled.li.attrs({
  className: 'row',
})`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin: 0px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  padding-left: 10px !important;
  border: 1px transparent;
  border-radius: 2px;
  box-shadow: inset 0px 1px 0 0 rgba(16, 22, 26, 0.15);

  &:hover {
    background-color: ${Colors.BLUE_MUTED};
    position: relative;
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 0 1px rgb(49, 64, 76), -1px 10px 4px rgba(16, 22, 26, 0.1),
      1px 18px 24px rgba(16, 22, 26, 0.2);
    box-shadow: inset 0 0 0 1px rgb(49, 64, 76), -1px 5px 4px rgba(16, 22, 26, 0.1), 1px 7px 24px rgba(16, 22, 26, 0.2);
    z-index: 1;
  }
`;

const SellRowBackGround = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => 100 * props.amount}% !important;
  background-color: ${Colors.SELL_MUTED} !important;
  z-index: 1;
`;

const BuyRowBackground = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => 100 * props.amount}% !important;
  background-color: ${Colors.BUY_MUTED} !important;
  z-index: 1;
`;

const Cell = styled(SmallText)`
  min-width: 35px;
  width: 20%;
`;

const ListHeading = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px;
  padding-left: 10px !important;
`;

const HeaderRow = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0px !important;
  padding-bottom: 10px;
  width: 100%;
  span {
    font-weight: 600;
  }
`;

const HeaderCell = styled.span`
  width: 20%;
`;
