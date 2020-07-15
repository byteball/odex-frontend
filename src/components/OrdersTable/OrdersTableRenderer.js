//@flow
import React from 'react'
import styled from 'styled-components'
import { formatNumber } from 'accounting-js'
import { AutoSizer } from 'react-virtualized'
import { CHATBOT_URL } from '../../config/urls'


import { 
  Card, 
  Tag, 
  Tab,
  Tabs, 
  Collapse, 
  Button, 
  AnchorButton,
  Icon
} from '@blueprintjs/core'

import { 
  Colors, 
  Loading, 
  CenteredMessage,
  SmallText,
  Hideable,
  FlexRow
} from '../Common'

import { relativeDate } from '../../utils/helpers'
import { Order } from '../../types/orders'

import type { Node } from 'react'
import type { DisplayMode } from '../../types/account'
import { Devices } from '../Common/Variables'

type Props = {
  loading: boolean,
  selectedTabId: string,
  onChange: string => void,
  isOpen: boolean,
  toggleCollapse: void => void,
  handleCancelOrder: (Order) => void,
  authenticated: boolean,
  displayMode: DisplayMode,
  address: string,
  hasBrowserWallet: boolean,
  orders: {
    ALL: Array<Order>,
    OPEN: Array<Order>,
    PENDING: Array<Order>,
    EXECUTED: Array<Order>,
    CANCELLED: Array<Order>,
    FILLED: Array<Order>
  },
  expand: SyntheticEvent<> => void,
  onContextMenu: void => Node
}

const breakpoints = {
  S: 400,
  M: 600, 
  L: 800
}


const OrdersTableRenderer = (props: Props) => {
  const { 
    loading, 
    selectedTabId, 
    onChange, 
    handleCancelOrder, 
    orders, 
    isOpen, 
    toggleCollapse,
    expand,
    onContextMenu,
    address,
    authenticated,
    displayMode,
    hasBrowserWallet
  } = props

  return (
    <AutoSizer style={{ width: '100%', height: '100%' }}>
        {({ width, height }) => (
          <CardBox onContextMenu={onContextMenu}>
            <OrdersTableHeader>
              <Heading>Orders</Heading>
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
            </OrdersTableHeader>
            <Wrapper>
            <Collapse isOpen={isOpen}>
              <Tabs selectedTabId={selectedTabId} onChange={onChange}>
                <Tab id="all" title="ALL" panel={
                  <OrdersTablePanel 
                    loading={loading} 
                    orders={orders['ALL']} 
                    handleCancelOrder={handleCancelOrder} 
                    width={width}
                    authenticated={authenticated}
                    address={address}
                    displayMode={displayMode}
                    hasBrowserWallet={hasBrowserWallet}
                  />} 
                />
                <Tab id="open" title="OPEN" panel={
                  <OrdersTablePanel 
                    loading={loading} 
                    orders={orders['OPEN']} 
                    handleCancelOrder={handleCancelOrder} 
                    width={width} 
                    authenticated={authenticated}
                    address={address}
                    displayMode={displayMode}
                    hasBrowserWallet={hasBrowserWallet}
                  />} 
                />
                <Tab id="cancelled" title="CANCELLED" panel={
                  <OrdersTablePanel 
                    loading={loading} 
                    orders={orders['CANCELLED']} 
                    handleCancelOrder={handleCancelOrder} 
                    width={width}
                    authenticated={authenticated}
                    address={address}
                    displayMode={displayMode}
                    hasBrowserWallet={hasBrowserWallet}
                  />
                  } 
                />
                <Tab id="executed" title="EXECUTED" panel={
                  <OrdersTablePanel 
                    loading={loading} 
                    orders={orders['FILLED']} 
                    handleCancelOrder={handleCancelOrder} 
                    width={width}
                    authenticated={authenticated}
                    address={address}
                    displayMode={displayMode}
                    hasBrowserWallet={hasBrowserWallet}
                  />} 
                />
              </Tabs>
            </Collapse>
            </Wrapper>
          </CardBox>
        )}
      </AutoSizer>
  )
}

const OrdersTablePanel = (props: *) => {
  const { loading, orders, handleCancelOrder, width, authenticated, address, displayMode, hasBrowserWallet } = props

  if (loading) return <Loading />
  if (!authenticated) return <CenteredMessage message="Not logged in" />
  if (orders.length === 0) return <CenteredMessage message="No orders" />

  return (
        <ListContainer>
          <ListHeaderWrapper>
            <ListHeader>
              <HeaderCell className="pair">PAIR</HeaderCell>
              <HeaderCell className="amount">{ displayMode.amountAlias }</HeaderCell>
              <Hideable hiddenIf={width<breakpoints.L}>
                <HeaderCell className="price">{ displayMode.priceAlias }</HeaderCell>
              </Hideable>
              <HeaderCell className="status">STATUS</HeaderCell>
              <HeaderCell className="side">SIDE</HeaderCell>
              <Hideable hiddenIf={width<breakpoints.L}>
                <HeaderCell className="time">TIME</HeaderCell>
              </Hideable>
              <HeaderCell className="cancel" />
            </ListHeader>
          </ListHeaderWrapper>
          <ListBodyWrapper>
            {orders.map((order, index) => {
              return (
                <OrderRow 
                  key={index} 
                  order={order} 
                  index={index} 
                  handleCancelOrder={handleCancelOrder}
                  address={address}
                  width={width}
                  labels={['PAIR', 'AMOUNT', 'PRICE', 'STATUS', 'SIDE', 'TIME']}
                  displayMode={displayMode}
                  hasBrowserWallet={hasBrowserWallet}
                />
              )
            }
            )}
          </ListBodyWrapper>
        </ListContainer>
  )
}

const OrderRow = (props: *) => {
  const { order, handleCancelOrder, address, width, labels, displayMode, hasBrowserWallet } = props
  
  const onClickCancel = () => {
    handleCancelOrder(order)
  }

  return (
    <Row>
      <Cell className="pair" muted>
        <HeaderCell className="mobile-label">
          {labels[0]}:
        </HeaderCell>
        <SmallText muted>
          {order.pair}
        </SmallText>
      </Cell>
      <Cell className="amount" muted>
       <HeaderCell className="mobile-label">
          {labels[1]}:
        </HeaderCell>
        <SmallText muted>
          {formatNumber(displayMode.name === 'Price' ? order.filled : order.filled * order.price, { precision: 3 })}/{formatNumber(displayMode.name === 'Price' ? order.amount : order.amount * order.price, { precision: 3 })}
        </SmallText>
      </Cell>
      <Hideable hiddenIf={width<breakpoints.L}>
        <Cell className="price" muted>
          <HeaderCell className="mobile-label">
            {labels[2]}:
          </HeaderCell>
          <SmallText muted>
            {formatNumber(displayMode.name === 'Price' ? order.price : 1 / order.price, { precision: 5 })} ({order.type})
          </SmallText>
        </Cell>
      </Hideable>
      <Cell className="status" muted>
        <HeaderCell className="mobile-label">
          {labels[3]}:
        </HeaderCell>
        <StatusTag status={order.status} />
      </Cell>
      <Cell className="side" side={order.side} muted>
        <HeaderCell className="mobile-label">
          {labels[4]}:
        </HeaderCell>
        <SmallText color={order.side === 'BUY' ? Colors.BUY : Colors.SELL}>{order.side}</SmallText>
      </Cell>
      <Hideable hiddenIf={width<breakpoints.L}>
        <Cell className="time" muted>
          <HeaderCell className="mobile-label">
            {labels[5]}:
          </HeaderCell>
          <SmallText muted>{relativeDate(order.time)}</SmallText>
        </Cell>
      </Hideable>
      <Cell className="cancel" muted>
        {order.cancelleable && (
          hasBrowserWallet ? <AnchorButton intent="danger" minimal onClick={onClickCancel}>
            <Icon icon="cross" intent="danger" />&nbsp;&nbsp;Cancel
          </AnchorButton> :
          <AnchorButton intent="danger" minimal href={CHATBOT_URL + "cancel-" + order.hash + "-" + address}>
            <Icon icon="cross" intent="danger" />&nbsp;&nbsp;Cancel
          </AnchorButton>
        )}
      </Cell>
    </Row>
  )
}

const StatusTag = ({ status }) => {
  const statuses = {
    "INVALIDATED": "danger",
    "CANCELLED": "danger",
    "OPEN": "primary",
    "FILLED": "success",
    "PARTIAL_FILLED": "success"
  }

  const intent = statuses[status]
  return (
    <Tag minimal large interactive intent={intent}>
      <SmallText>{status}</SmallText>
    </Tag>
  )
}


const OrdersTableHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`

const CardBox = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`

const Heading = styled.h3`
  margin: auto;
`

const ListContainer = styled.div`  
  height: 90%;
`

const ListHeaderWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px;
  margin-bottom: 10px;
  padding-left: 0px !important;
  margin-left: 0px !important;
  @media (max-width: ${breakpoints.M}px) {
    display: none;
  }
`

const ListBodyWrapper = styled.ul`
  width: 100%; 
  height: 100%;
  padding-left: 0px !important;
  margin-left: 0px !important;
`

const ListHeader = styled.li`
  width: 100%;
  display: flex;
  margin: 0px !important;
  padding: 10px;
  text-align: left;
  padding: 0;
  padding-left: 0px !important;
  margin-left: 0px !important;
  span {
    font-weight: 600;
  }
`

const Row = styled.li.attrs({ className: 'row' })`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px transparent;
  border-radius: 2px;
  box-shadow: inset 0px 1px 0 0 rgba(16, 22, 26, 0.15);
  padding-left: 0px !important;
  margin-left: 0px !important;
  .mobile-label {
    display: none;
  }
  @media (max-width: ${breakpoints.M}px) {
    flex-direction: column;
    padding-bottom: 25px;
    .mobile-label {
      display: block;
      width: auto;
      margin-right: 10px;
    }
  }
`



const Cell = styled.span.attrs({ className: props => props.className })`
  color: ${props =>
    props.side === 'BUY'
      ? Colors.BUY
      : props.side === 'SELL'
        ? Colors.SELL
        : props.muted
          ? Colors.TEXT_MUTED
          : Colors.WHITE}

  min-width: 35px;
  display: flex;
  align-items: center;
  height: 40px !important;
  width: 100%;
  // width: ${props => (props.className === 'cancel' ? '100px' : '20%')};
  &.cancel {
    height: auto !important;
  }
`

const HeaderCell = styled.span.attrs({ className: props => props.className })`
  width: 100%;
  // width: ${props => (props.className === 'cancel' ? '100px' : '20%')};
`

export default OrdersTableRenderer
