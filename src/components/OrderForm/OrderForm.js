// @flow
import React from 'react'
import styled from 'styled-components';
import OrderFormRenderer from './OrderFormRenderer'
import { formatNumber, unformat } from 'accounting-js'
import { Menu, MenuItem, ContextMenuTarget } from '@blueprintjs/core'
import { MATCHER_FEE, AFFILIATE_FEE } from '../../config/environment';
import RequestConfirmModal from '../RequestConfirmModal'
import { getWalletFromPhrases, signMessageByWif } from '../../utils/wallet'
import type { DisplayMode, BrowserWallet } from '../../types/account'
import type { NewOrder } from '../../types/orderForm';

type Props = {
  authenticated: boolean,
  side: 'BUY' | 'SELL',
  askPrice: number,
  bidPrice: number,
  bestAskMatcher: string,
  bestBidMatcher: string,
  bestAskMatcherFeeRate: number,
  bestBidMatcherFeeRate: number,
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
  selectedOrder: NewOrder,
  displayMode: DisplayMode,
  browserWallet: BrowserWallet,
  passphrase: string,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: void => void,
  sendNewOrder: string => void,
  addErrorNotification: string => void,
  updatePassphrase: string => void
}

type State = {
  side: 'BUY' | 'SELL',
  fraction: number,
  priceType: string,
  selectedTabId: string,
  price: string,
  fPrice: number,
  stopPrice: string,
  amount: string,
  fAmount: string,
  odds: string,
  stake: string,
  total: string,
  isOpen: boolean,
  isModalOpen: false,
  orderToSign: NewOrder,
  details: string,
  needPassphrase: boolean
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
      fPrice: bidPrice,
      stopPrice: formatNumber(bidPrice, { precision: 3 }),
      odds: formatNumber(bidPrice ? 1 / bidPrice : 0, { precision: 3 }),
      stake: '0.0',
      amount: '0.0',
      fAmount: 0,
      total: '0.0',
      isModalOpen: false,
      orderToSign: {},
      details: '',
      needPassphrase: false,
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
        fPrice: unformat(price),
        amount: total,
        fAmount: unformat(total),
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

  signNewOrder = (orderToSign: NewOrder, wif: string) => {
    const { sendNewOrder } = this.props;
    const signedOrder = signMessageByWif(orderToSign, wif);
    sendNewOrder(signedOrder);
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
    
    this.signNewOrder(orderToSign, wallet.wif);
    this.setState({ isModalOpen: false })
  }

  handleSendOrder = (orderToSign: NewOrder) => {
    const { amount, price, side } = this.state
    const { baseTokenSymbol, quoteTokenSymbol } = this.props;
    const { browserWallet, passphrase } = this.props;
    const details = `New order to ${side.toLowerCase()} ${amount} ${baseTokenSymbol} at ${price} in ${quoteTokenSymbol}?`
    const needPassphrase = browserWallet.encrypted && !passphrase;

    if (browserWallet.requestConfirm || needPassphrase) {
      this.setState({ orderToSign, isModalOpen: true, details, needPassphrase })
    } else {
      const wallet = getWalletFromPhrases(browserWallet.phrase, passphrase);
      this.signNewOrder(orderToSign, wallet.wif);
    }
    
  }

  handleUpdateAmountFraction = (fraction: number) => {
    const { side, fPrice } = this.state
    const { quoteTokenBalance, baseTokenBalance, bestAskMatcherFeeRate, askPrice } = this.props

    let amount, total

    if (side === 'SELL') {
      amount = (baseTokenBalance / 100) * fraction
      total = fPrice * amount

      this.setState({
        fraction: fraction,
        amount: formatNumber(amount, { precision: 3 }),
        fAmount: amount,
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 })
      })

    } else {
      // Temporary solution to handle the case where price = 0. 
      // In the case orderbooks are full, we do not need to care about this
      if (fPrice === 0) {
        this.setState({
          fraction: fraction, 
          amount: formatNumber(0, { precision: 3 }),
          fAmount: 0,
          stake: formatNumber(0, { precision: 3 }),
          total: formatNumber(0, { precision: 3 })
        })

        return
      }
      let fee;
      if (askPrice && fPrice >= askPrice) {
        fee = AFFILIATE_FEE + bestAskMatcherFeeRate;
      } else {
        fee = MATCHER_FEE;
      }
      let maxQuoteTokenAmount = quoteTokenBalance * (1 - fee)
      total = (maxQuoteTokenAmount / 100) * fraction
      amount = total / fPrice

      this.setState({
        fraction: fraction,
        amount: formatNumber(amount, { precision: 3 }),
        fAmount: amount,
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 })
      })
    }
  }

  handlePriceChange = (value: string) => {

    let { fAmount, stake } = this.state
    let { displayMode } = this.props;

    let fValue = unformat(value);
    console.log('handlePriceChange')
    console.log(value)
    console.log(fValue)
    if (!fValue)
      return this.setState({price: value, odds: value, total: '0', stake: '0'})
    let rounded = fValue.toPrecision(8); // drop the excessive precision
    let fRounded = parseFloat(rounded);
    if (fRounded !== fValue)
      value = fRounded.toString();
    
    if(displayMode.name === 'Price') {
      let odds = formatNumber(fValue === 0 ? 0 : 1 / fValue, { precision: 3 });

      let total = fAmount * unformat(value)

      this.setState({
        stake: formatNumber(total, { precision: 3 }),
        total: formatNumber(total, { precision: 3 }),
        price: value,
        fPrice: fValue,
        odds: odds
      })
    } else {
      let fPrice = fValue === 0 ? 0 : 1 / fValue;
      let price = formatNumber(fPrice, { precision: 3 });


      fAmount = unformat(stake) / fPrice

      this.setState({
        fAmount: fAmount,
        price: price,
        fPrice: fPrice,
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
    let fTotal = amount * unformat(stopPrice)

    this.setState({
      total: formatNumber(fTotal, { precision: 3 }),
      amount: formatNumber(amount, { precision: 3 }),
      stopPrice: stopPrice
    })
  }

  handleAmountChange = (value: string) => {
    let { fPrice, selectedTabId, stopPrice } = this.state
    const { displayMode } = this.props;

    stopPrice = unformat(stopPrice)

    if(displayMode.name === 'Price') {
      let fTotal = selectedTabId === 'stop' ? stopPrice * unformat(value) : fPrice * unformat(value);
      this.setState({
        total: formatNumber(fTotal, { precision: 3 }),
        stake: formatNumber(fTotal, { precision: 3 }),
        amount: value,
        fAmount: unformat(value),
      })
    } else {
      let fAmount = fPrice === 0 ? 0 : unformat(value) / fPrice;
      let fTotal = selectedTabId === 'stop' ? stopPrice * fAmount : fPrice * fAmount;


      this.setState({
        total: formatNumber(fTotal, { precision: 3 }),
        amount: formatNumber(fAmount, { precision: 3 }),
        fAmount: fAmount,
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
      fAmount: amount,
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
        fPrice,
        isOpen, 
        amount,
        fAmount,
        total,
        stake,
        odds,
        details,
        isModalOpen,
        needPassphrase
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
        bestAskMatcherFeeRate,
        bestBidMatcherFeeRate,
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


    let maxAmount
    let fee;
    if (askPrice && fPrice >= askPrice) {
      fee = AFFILIATE_FEE + bestAskMatcherFeeRate;
    } else {
      fee = MATCHER_FEE;
    }
    let quoteTokenFee = fAmount * fPrice * fee;
    let maxQuoteTokenAmount = quoteTokenBalance - Number(quoteTokenFee)


    if (side === 'BUY') {
      maxAmount = (price !== '0.000') ? formatNumber(maxQuoteTokenAmount / fPrice, { precision: quoteTokenDecimals }) : '0.000'
    } else {
      maxAmount = formatNumber(baseTokenBalance, { precision: baseTokenDecimals })
    }
    let amountToPrecision = formatNumber(fAmount, { precision: baseTokenDecimals });
    let insufficientBalance = unformat(amountToPrecision) > unformat(maxAmount);
    
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
          priceOrOdds={displayMode.name === 'Price' ? price : odds}
          fPrice={fPrice}
          maxAmount={maxAmount}
          amount={displayMode.name === 'Price' ? amount : stake}
          fAmount={fAmount}
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
          bestAskMatcherFeeRate={bestAskMatcherFeeRate}
          bestBidMatcher={bestBidMatcherFeeRate}
          tokensBySymbol={tokensBySymbol}
          handleSideChange={handleSideChange}
          expand={this.expand}
          onContextMenu={renderContextMenu}
          authenticated={authenticated}
          buttonType={buttonType}
          displayMode={displayMode}
          hasBrowserWallet={browserWallet.authorized}
        />
        <RequestConfirmModal 
          title="New Order"
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

export default ContextMenuTarget(OrderForm)

const Wrapper = styled.div`
  height: 100%;
`;
