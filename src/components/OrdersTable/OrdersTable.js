//@flow
import React from 'react'
import styled from 'styled-components';
import OrdersTableRenderer from './OrdersTableRenderer'
import RequestConfirmModal from '../RequestConfirmModal'
import { sortTable } from '../../utils/helpers'
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core'
import { getAddressFromPhrases } from '../../utils/wallet'

import type { Order } from '../../types/Orders'
import type { DisplayMode, BrowserWallet } from '../../types/account'

type Props = {
  orders: Array<Order>,
  authenticated: boolean,
  address: string,
  displayMode: DisplayMode,
  browserWallet: BrowserWallet,
  cancelOrder: string => void,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: void => void,
  addErrorNotification: string => void
}

type State = {
  selectedTabId: string,
  isOpen: boolean,
  isModalOpen: boolean,
  signedCancel: string,
  details: string,
  needPassword: boolean
}

class OrdersTable extends React.PureComponent<Props, State> {
  static defaultProps = { authenticated: true }

  state = {
    selectedTabId: 'all',
    isOpen: true,
    isModalOpen: false,
    signedCancel: '',
    details: '',
    needPassword: false,
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

  handleCancelOrder = (signedCancel: string, details: string) => {
    const { browserWallet, cancelOrder } = this.props;
    const passphrase = sessionStorage.getItem("passphrase");
    const needPassword = browserWallet.encrypted && !passphrase;

    if (browserWallet.requestConfirm || needPassword) {
      this.setState({ signedCancel, isModalOpen: true, details, needPassword })
    } else {
      cancelOrder(signedCancel);
    }
    
  }

  handleModalAction = (passInput: string) => {
    const { browserWallet, cancelOrder, addErrorNotification } = this.props;
    const { signedCancel } = this.state;
    const passphrase = sessionStorage.getItem("passphrase") || passInput;

    if (getAddressFromPhrases(browserWallet.phrase, passphrase) !== browserWallet.address) {
      addErrorNotification({ message: 'Whoops, your password is wrong!'})
      return;
    }

    if (!!passInput) {
      sessionStorage.setItem("passphrase", passInput)
    }

    cancelOrder(signedCancel);
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
      state: { selectedTabId, isOpen, isModalOpen, details, needPassword },
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
          wif={browserWallet.wif}
          address={address}
          handleCancelOrder={handleCancelOrder}
          // silence-error: currently too many flow errors, waiting for rest to be resolved
          orders={filteredOrders}
          onContextMenu={renderContextMenu}
        />
        <RequestConfirmModal 
          title="Cancel Order"
          details={details}
          needPassword={needPassword}
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
