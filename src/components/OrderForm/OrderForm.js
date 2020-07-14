// @flow
import React from 'react'
import styled from 'styled-components';
import OrderFormRenderer from './OrderFormRenderer'
import { formatNumber, unformat } from 'accounting-js'
import { Menu, MenuItem, ContextMenuTarget } from '@blueprintjs/core'
import { MATCHER_FEE } from '../../config/environment';
import RequestConfirmModal from '../RequestConfirmModal'
import type { DisplayMode, BrowserWallet } from '../../types/account'

type Props = {
  authenticated: boolean,
  side: 'BUY' | 'SELL',
  askPrice: number,
  bidPrice: number,
  bestAskMatcher: string,
  bestBidMatcher: string,
  tokensBySymbol: Object,
  baseTokenBalance: number,
  quoteTokenBalance: number,
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  baseTokenDecimals: number,
  quoteTokenDecimals: number,
  loggedIn: boolean,
  address: string,
  operatorAddress: string,
  exchangeAddress: string,
  selectedOrder: Object,
  displayMode: DisplayMode,
  browserWallet: BrowserWallet,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: void => void,
  sendNewOrder: string => void,
}

type State = {
  side: 'BUY' | 'SELL',
  fraction: number,
  priceType: string,
  selectedTabId: string,
  price: string,
  stopPrice: string,
  amount: string,
  odds: string,
  stake: string,
  total: string,
  isOpen: boolean,
  isModalOpen: false,
  signedOrder: string,
  details: string
}

class OrderForm extends React.PureComponent<Props, State> {
  static defaultProps = {
    loggedIn: true,
    bidPrice: 0,
    askPrice: 0,
    baseTokenBalance: 0,
    quoteTokenBalance: 0,
  }

  constructor(props: Props) {
    super(props)
    const { bidPrice } = this.props;
    this.state = {
      side: 'BUY',
      fraction: 0,
      isOpen: true,
      priceType: 'null',
      selectedTabId: 'limit',
      price: formatNumber(bidPrice, { precision: 3 }),
      stopPrice: formatNumber(bidPrice, { precision: 3 }),
      odds: formatNumber(bidPrice ? 1 / bidPrice : 0, { precision: 3 }),
      stake: '0.0',
      amount: '0.0',
      total: '0.0',
      isModalOpen: false,
      signedOrder: '',
      details: '',
    }
  }

  componentWillReceiveProps({ bidPrice, askPrice, selectedOrder }: *) {
    if (selectedOrder === null || selectedOrder === this.props.selectedOrder) {
      return;
    }

    const { side } = this.state
    const { price, total } = selectedOrder;

    if (1 || (side === 'BUY' && price > bidPrice) || (side === 'SELL' && price < askPrice)) {
      this.setState({
        price: price,
        amount: total,
        odds: formatNumber(1 / unformat(price), { precision: 3 }),
        stake: formatNumber(price * Number(total), { precision: 3 }),
        total: (price * Number(total)).toString(),
      });
    }
  }

  onInputChange = ({ target }: Object) => {
    const { loggedIn } = this.props
    switch (target.name) {
      case 'stopPrice':
        this.handleStopPriceChange(target.value)
        break
      case 'price':
        this.handlePriceChange(target.value)
        break
      case 'total':
        this.handleTotalChange(target.value)
        break
      case 'amount':
        this.handleAmountChange(target.value)
        break
      case 'fraction':
        loggedIn && this.handleUpdateAmountFraction(target.value)
        break

      default:
        break
    }
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  handleModalAction = () => {
    const { sendNewOrder } = this.props;
    const { signedOrder } = this.state;
    sendNewOrder(signedOrder);
    this.setState({ isModalOpen: false })
  }

  handleSendOrder = (signedOrder) => {
    const { amount, price, side } = this.state
    const { baseTokenSymbol, quoteTokenSymbol } = this.props;
    const { browserWallet, sendNewOrder } = this.props;

    const details = `New order to ${side.toLowerCase()} ${amount} ${baseTokenSymbol} at ${price} in ${quoteTokenSymbol}?`
    if (!browserWallet.requestConfirm) {
      return sendNewOrder(signedOrder);
    }
    this.setState({ signedOrder, isModalOpen: true, details })
  }

  handleUpdateAmountFraction = (fraction: number) => {
    const { side, price } = this.state
    const { quoteTokenBalance, baseTokenBalance } = this.props

    let amount, total
    let numericPrice = unformat(price)

    if (side === 'SELL') {
      amount = (baseTokenBalance / 100) * fraction
      total = numericPrice * amount

      this.setState({
        fraction: fraction,
        amount: formatNumber(amount, { precision: 3 }),
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 })
      })

    } else {
      // Temporary solution to handle the case where price = 0. 
      // In the case orderbooks are full, we do not need to care about this
      if (numericPrice === 0) {
        this.setState({
          fraction: fraction, 
          amount: formatNumber(0, { precision: 3 }),
          stake: formatNumber(0, { precision: 3 }),
          total: formatNumber(0, { precision: 3 })
        })

        return
      }

      total = (quoteTokenBalance / 100) * fraction
      amount = total / numericPrice

      this.setState({
        fraction: fraction,
        amount: formatNumber(amount, { precision: 3 }),
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 })
      })
    }
  }

  handlePriceChange = (value: string) => {

    let { amount } = this.state
    let { displayMode } = this.props;

    let fValue = unformat(value);
    if (!fValue)
      return this.setState({price: value, odds: value, total: '0', stake: '0'})
    let rounded = fValue.toPrecision(8); // drop the excessive precision
    let fRounded = parseFloat(rounded);
    if (fRounded !== fValue)
      value = fRounded.toString();
    
    if(displayMode.name === 'Price') {
      let odds = formatNumber(fValue === 0 ? 0 : 1 / fValue, { precision: 3 });

      amount = unformat(amount)
      let total = amount * unformat(value)

      this.setState({
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 }),
        price: value,
        odds: odds
      })
    } else {
      let price = formatNumber(fValue === 0 ? 0 : 1 / fValue, { precision: 3 });

      amount = unformat(amount)
      let total = amount * unformat(price)

      this.setState({
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 }),
        price: price,
        odds: value
      })
    }
    
  }

  handleSideChange = (side: 'BUY' | 'SELL') => {
    this.setState({ side })
  }

  handleStopPriceChange = (stopPrice: string) => {
    let { amount } = this.state

    amount = unformat(amount)
    let total = amount * unformat(stopPrice)

    this.setState({
      total: formatNumber(total, { precision: 3 }),
      amount: formatNumber(amount, { precision: 3 }),
      stopPrice: stopPrice
    })
  }

  handleAmountChange = (value: string) => {
    let { price, selectedTabId, stopPrice } = this.state
    const { displayMode } = this.props;

    stopPrice = unformat(stopPrice)
    price = unformat(price)

    if(displayMode.name === 'Price') {
      let total = selectedTabId === 'stop' ? stopPrice * unformat(value) : price * unformat(value);
      this.setState({
        total: formatNumber(total, { precision: 3 }),
        stake: formatNumber(total, { precision: 3 }),
        amount: value
      })
    } else {
      let amount = price === 0 ? 0 : unformat(value) / price;
      let total = selectedTabId === 'stop' ? stopPrice * unformat(amount) : price * unformat(amount);
      this.setState({
        total: formatNumber(total, { precision: 3 }),
        amount: formatNumber(amount, { precision: 3 }),
        stake: value,
      })
    }
  }

  handleTotalChange = (total: string) => {
    let { price, selectedTabId, stopPrice } = this.state
    let amount

    price = unformat(price)
    stopPrice = unformat(stopPrice)

    selectedTabId === 'stop'
      ? stopPrice === 0
        ? (amount = 0)
        : (amount = unformat(total) / stopPrice)
      : price === 0
        ? (amount = 0)
        : (amount = unformat(total) / price)

    this.setState({
      price: formatNumber(price, { precision: 3 }),
      stopPrice: formatNumber(stopPrice, { precision: 3 }),
      amount: formatNumber(amount, { precision: 3 }),
      total: total
    })
  }


  handleChangeOrderType = (tabId: string) => {
    const { side } = this.state
    const { askPrice, bidPrice } = this.props

    this.setState({
      selectedTabId: tabId,
      fraction: 0,
      priceType: 'null',
      price: '',
      stopPrice: '',
      amount: '',
      total: ''
    })

    if (tabId === 'limit' && side === 'BUY') {
      this.setState({ price: formatNumber(askPrice, { precision: 3 }) })
    } else if (tabId === 'limit') {
      this.setState({ price: formatNumber(bidPrice, { precision: 3 }) })
    } else if (tabId === 'market' && side === 'BUY') {
      this.setState({ price: formatNumber(askPrice, { precision: 3 }) })
    } else if (tabId === 'market') {
      this.setState({ price: formatNumber(bidPrice, { precision: 3 }) })
    }
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    this.props.onCollapse('orderForm')
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

  expand = () => {
    this.props.onExpand('orderForm')
  }

  render() {
    const {
      state: { 
        side,
        selectedTabId,
        fraction, 
        priceType, 
        price, 
        isOpen, 
        amount, 
        total,
        stake,
        odds,
        details,
        isModalOpen
      },
      props: { 
        baseTokenSymbol, 
        loggedIn, 
        quoteTokenSymbol,
        baseTokenBalance, 
        quoteTokenBalance, 
        baseTokenDecimals, 
        quoteTokenDecimals, 
        address,
        operatorAddress,
        exchangeAddress,
        askPrice,
        bidPrice,
        bestAskMatcher,
        bestBidMatcher,
        tokensBySymbol,
        authenticated,
        displayMode,
        browserWallet,
      },
      onInputChange,
      handleChangeOrderType,
      handleSendOrder,
      handleSideChange,
      toggleCollapse,
      renderContextMenu,
      handleModalClose,
      handleModalAction
    } = this


    //TODO REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR 
    let maxAmount
    let quoteTokenFee = unformat(amount) * unformat(price) * MATCHER_FEE;
    let maxQuoteTokenAmount = quoteTokenBalance - Number(quoteTokenFee)

    //if (price !== '0.000') {
      if (side === 'BUY') {
        maxAmount = (price !== '0.000') ? formatNumber(maxQuoteTokenAmount / unformat(price), { decimals: 3 }) : '0.000'
      } else {
        maxAmount = formatNumber(baseTokenBalance, { decimals: 3 })
      }
    //} else {
    //  maxAmount = '0.0'
    //}

    let insufficientBalance = (unformat(amount) > unformat(maxAmount))
    
    let buttonType = authenticated
      ? side === "BUY"
        ? "BUY"
        : "SELL"
      : side === "BUY"
        ? "BUY_LOGIN"
        : "SELL_LOGIN"
    
    return (
      <Wrapper>
        <OrderFormRenderer
          selectedTabId={selectedTabId}
          side={side}
          fraction={fraction}
          priceType={priceType}
          price={displayMode.name === 'Price' ? price : odds}
          maxAmount={maxAmount}
          amount={displayMode.name === 'Price' ? amount : stake}
          total={total}
          isOpen={isOpen}
          baseTokenSymbol={baseTokenSymbol}
          quoteTokenSymbol={quoteTokenSymbol}
          insufficientBalance={insufficientBalance}
          loggedIn={loggedIn}
          onInputChange={onInputChange}
          toggleCollapse={toggleCollapse}
          handleChangeOrderType={handleChangeOrderType}
          handleSendOrder={handleSendOrder}
          baseTokenDecimals={baseTokenDecimals}
          quoteTokenDecimals={quoteTokenDecimals}
          address={address}
          operatorAddress={operatorAddress}
          exchangeAddress={exchangeAddress}
          askPrice={askPrice}
          bidPrice={bidPrice}
          bestAskMatcher={bestAskMatcher}
          bestBidMatcher={bestBidMatcher}
          tokensBySymbol={tokensBySymbol}
          handleSideChange={handleSideChange}
          expand={this.expand}
          onContextMenu={renderContextMenu}
          authenticated={authenticated}
          buttonType={buttonType}
          displayMode={displayMode}
          wif={browserWallet.wif}
        />
        <RequestConfirmModal 
          title="New Order"
          details={details}
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          handleAction={handleModalAction}
        />
      </Wrapper>
    )
  }
}

export default ContextMenuTarget(OrderForm)

const Wrapper = styled.div`
  height: 100%;
`;
