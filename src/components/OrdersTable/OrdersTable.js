//@flow
import React from 'react'
import styled from 'styled-components';
import OrdersTableRenderer from './OrdersTableRenderer'
import RequestConfirmModal from '../RequestConfirmModal'
import { sortTable } from '../../utils/helpers'
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core'
import { getWalletFromPhrases, signMessageByWif } from '../../utils/wallet'

import type { Order } from '../../types/Orders'
import type { DisplayMode, BrowserWallet } from '../../types/account'

type Props = {
  orders: Array<Order>,
  authenticated: boolean,
  address: string,
  displayMode: DisplayMode,
  browserWallet: BrowserWallet,
  passphrase: string,
  cancelOrder: string => void,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: void => void,
  addErrorNotification: string => void,
  updatePassphrase: string => void
}

type State = {
  selectedTabId: string,
  isOpen: boolean,
  isModalOpen: boolean,
  orderToSign: Order,
  details: string,
  needPassphrase: boolean
}

class OrdersTable extends React.PureComponent<Props, State> {
  static defaultProps = { authenticated: true }

  state = {
    selectedTabId: 'all',
    isOpen: true,
    isModalOpen: false,
    orderToSign: {},
    details: '',
    needPassphrase: false,
  }

  changeTab = (tabId: string) => {
    this.setState({ selectedTabId: tabId })
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    this.props.onCollapse('ordersTable')
  }

  expand = () => {
    this.props.onExpand('ordersTable')
  }

  filterOrders = () => {
    const { orders } = this.props
    let result = { ALL: orders, OPEN: [], CANCELLED: [], AUTO_CANCELLED: [], PARTIAL_FILLED: [], FILLED: [] }
    let filters = ['OPEN', 'CANCELLED', 'AUTO_CANCELLED', 'PARTIAL_FILLED', 'FILLED']

    for (let filter of filters) {
      // silence-error: currently too many flow errors, waiting for rest to be resolved
      result[filter] = orders.filter(order => {
        return order.status === filter
      })
    }

    //The partially filled orders are considered to be in the OPEN section
    result['OPEN'] = result['OPEN'].concat(result['PARTIAL_FILLED'])
    result['CANCELLED'] = result['CANCELLED'].concat(result['AUTO_CANCELLED'])

    for (let filter of filters.concat('ALL')) {
      // silence-error: currently too many flow errors, waiting for rest to be resolved
      result[filter] = sortTable(result[filter], 'time', 'desc')
    }

    return result
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  signCancelOrder = (orderToSign: Order, wif: string) => {
    const { cancelOrder } = this.props;
    const signedCancel = signMessageByWif('Cancel order ' + orderToSign.hash, wif);
    cancelOrder(signedCancel);
  }

  handleCancelOrder = (orderToSign: Order) => {
    const { browserWallet, passphrase } = this.props;
    const needPassphrase = browserWallet.encrypted && !passphrase;
    const { side, amount, pair, price } = orderToSign;
    const details = `Cancel order to ${side.toLowerCase()} ${amount} ${pair.split("/")[0]} at ${price} in ${pair.split("/")[1]}?`

    if (browserWallet.requestConfirm || needPassphrase) {
      this.setState({ orderToSign, details, needPassphrase, isModalOpen: true })
    } else {
      const wallet = getWalletFromPhrases(browserWallet.phrase, passphrase);
      this.signCancelOrder(orderToSign, wallet.wif);
    }
    
  }

  handleModalAction = (passInput: string) => {
    const { browserWallet, passphrase, updatePassphrase, addErrorNotification } = this.props;
    const { orderToSign } = this.state;
    const wallet = getWalletFromPhrases(browserWallet.phrase, passphrase || passInput)

    if (wallet.address !== browserWallet.address) {
      addErrorNotification({ message: 'Whoops, your passphrase is wrong!'})
      return;
    }

    if (!!passInput) {
      updatePassphrase(passInput)
    }

    this.signCancelOrder(orderToSign, wallet.wif);
    this.setState({ isModalOpen: false })
  }

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

  render() {
    const {
      props: { authenticated, address, orders, displayMode, browserWallet },
      state: { selectedTabId, isOpen, isModalOpen, details, needPassphrase },
      renderContextMenu,
      handleCancelOrder,
      handleModalClose,
      handleModalAction
    } = this

    const filteredOrders = this.filterOrders()
    const loading = orders.length === []

    return (
      <Wrapper>
        <OrdersTableRenderer
          isOpen={isOpen}
          loading={loading}
          selectedTabId={selectedTabId}
          onChange={this.changeTab}
          toggleCollapse={this.toggleCollapse}
          expand={this.expand}
          authenticated={authenticated}
          displayMode={displayMode}
          hasBrowserWallet={browserWallet.authorized}
          address={address}
          handleCancelOrder={handleCancelOrder}
          // silence-error: currently too many flow errors, waiting for rest to be resolved
          orders={filteredOrders}
          onContextMenu={renderContextMenu}
        />
        <RequestConfirmModal 
          title="Cancel Order"
          details={details}
          needPassphrase={needPassphrase}
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          handleAction={handleModalAction}
        />
      </Wrapper>
    )
  }
}

export default ContextMenuTarget(OrdersTable)

const Wrapper = styled.div`
  height: 100%;
`;
