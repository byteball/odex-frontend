// @flow
import React from 'react'
import styled from 'styled-components'
import ReactGA from 'react-ga'
import { formatNumber } from 'accounting-js'
import { MATCHER_FEE, MAX_PRICE_PRECISION } from '../../config/environment';
import { CHATBOT_URL } from '../../config/urls'
import { signMessageByWif } from '../../utils/wallet'

import { 
  Position, 
  Tabs, 
  Tab, 
  Card, 
  Button, 
  InputGroup, 
  Label, 
  Colors, 
  Collapse,
  Spinner
} from '@blueprintjs/core'

import {
   Flex, 
   MutedText, 
   RedGlowingButton, 
   RedGlowingAnchorButton,
   GreenGlowingButton,
   GreenGlowingAnchorButton,
   FlexRow,
   Box
} from '../Common'

import Help from '../../components/Help'

import type { Node } from 'react'
import type { DisplayMode } from '../../types/account'


type Props = {
  selectedTabId: string,
  side: 'BUY' | 'SELL',
  askPrice: number,
  bidPrice: number,
  bestAskMatcher: string,
  bestBidMatcher: string,
  tokensBySymbol: Object,
  fraction: number,
  priceType: string,
  price: string,
  amount: string, // formatted
  maxAmount: string, // formatted
  total: string,
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  isOpen: boolean,
  insufficientBalance: boolean,
  loggedIn: boolean,
  onInputChange: Object => void,
  handleChangeOrderType: string => void,
  handleSendOrder: void => void,
  baseTokenDecimals: number,
  quoteTokenDecimals: number,
  address: string,
  operatorAddress: string,
  exchangeAddress: string,
  handleSideChange: ('BUY' | 'SELL') => void,
  toggleCollapse: SyntheticEvent<> => void,
  expand: SyntheticEvent<> => void,
  onContextMenu: void => Node,
  buttonType: "BUY" | "SELL" | "BUY_UNLOCK" | "SELL_UNLOCK" | "BUY_LOGIN" | "SELL_LOGIN" | "BUY_UNLOCK_PENDING" | "SELL_UNLOCK_PENDING",
  displayMode: DisplayMode,
  wif: string,
  sendNewOrder: string => void,
}


function dropExcessivePrecision(price) {
	let strPrice = price.toPrecision(MAX_PRICE_PRECISION);
	return parseFloat(strPrice);
}

function getFirstAsset(sell_asset, buy_asset) {
	if (sell_asset === 'base')
		return sell_asset;
	if (buy_asset === 'base')
		return buy_asset;
	return (sell_asset < buy_asset) ? sell_asset : buy_asset;
}

function getPriceInAllowedPrecision(order_data) {
	const first_asset = getFirstAsset(order_data.sell_asset, order_data.buy_asset);
	if (first_asset === order_data.sell_asset)
		return dropExcessivePrecision(order_data.price);
	else
		return 1 / dropExcessivePrecision(1 / order_data.price);
}

const OrderFormRenderer = (props: Props) => {
  const {
    selectedTabId,
    side,
    fraction,
    priceType,
    price,
    isOpen,
    amount,
    maxAmount,
    total,
    baseTokenSymbol,
    quoteTokenSymbol,
    loggedIn,
    onInputChange,
    insufficientBalance,
    handleChangeOrderType,
    handleSendOrder,
    toggleCollapse,
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
    handleSideChange,
    expand,
    onContextMenu,
    buttonType,
    displayMode,
    wif,
    sendNewOrder
  } = props

  return (
    <Wrapper onContextMenu={onContextMenu}>
      <OrderFormHeader>
        <ButtonRow>
          <Button
            text={displayMode.name === 'Price' ? "BUY" : "BACK" }
            minimal
            onClick={() => handleSideChange('BUY')}
            active={side === 'BUY'}
            intent="success"
          />
          <Button
            text={displayMode.name === 'Price' ? "SELL" : "LAY" }
            minimal
            onClick={() => handleSideChange('SELL')}
            active={side === 'SELL'}
            intent="danger"
          />
        </ButtonRow>
        <ButtonRow>
          <Button
            text="Limit"
            minimal
            onClick={() => handleChangeOrderType('limit')}
            active={selectedTabId === 'limit'}
            intent={selectedTabId === 'limit' ? 'primary' : ''}
          />
          <Button
            text="Market"
            disabled
            minimal
            onClick={() => handleChangeOrderType('market')}
            active={selectedTabId === 'market'}
            intent={selectedTabId === 'market' ? 'primary' : ''}
          />
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
        </ButtonRow>
      </OrderFormHeader>
      <ContentWrapper>
      <Collapse isOpen={isOpen}>
        <Tabs selectedTabId={selectedTabId}>
          <Tab
            id="limit"
            panel={
              <LimitOrderPanel
                loggedIn={loggedIn}
                side={side}
                baseTokenSymbol={baseTokenSymbol}
                quoteTokenSymbol={quoteTokenSymbol}
                fraction={fraction}
                priceType={priceType}
                price={price}
                amount={amount}
                maxAmount={maxAmount}
                total={total}
                insufficientBalance={insufficientBalance}
                onInputChange={onInputChange}
                handleSendOrder={handleSendOrder}
                quoteTokenDecimals={quoteTokenDecimals}
                baseTokenDecimals={baseTokenDecimals}
                address={address}
                operatorAddress={operatorAddress}
                exchangeAddress={exchangeAddress}
                askPrice={askPrice}
                bidPrice={bidPrice}
                bestAskMatcher={bestAskMatcher}
                bestBidMatcher={bestBidMatcher}
                tokensBySymbol={tokensBySymbol}
                buttonType={buttonType}
                displayMode={displayMode}
                wif={wif}
                sendNewOrder={sendNewOrder}
              />
            }
          />
          <Tab
            id="market"
            panel={
              <MarketOrderPanel
                loggedIn={loggedIn}
                side={side}
                baseTokenSymbol={baseTokenSymbol}
                quoteTokenSymbol={quoteTokenSymbol}
                fraction={fraction}
                priceType={priceType}
                price={price}
                amount={amount}
                maxAmount={maxAmount}
                insufficientBalance={insufficientBalance}
                total={total}
                onInputChange={onInputChange}
                handleSendOrder={handleSendOrder}
                quoteTokenDecimals={quoteTokenDecimals}
                baseTokenDecimals={baseTokenDecimals}
                buttonType={buttonType}
              />
            }
          />
          <Tab
            id="stop"
            panel={
              <StopLimitOrderPanel
                loggedIn={loggedIn}
                side={side}
                baseTokenSymbol={baseTokenSymbol}
                quoteTokenSymbol={quoteTokenSymbol}
                fraction={fraction}
                priceType={priceType}
                price={price}
                stopPrice={price}
                amount={amount}
                insufficientBalance={insufficientBalance}
                maxAmount={maxAmount}
                total={total}
                onInputChange={onInputChange}
                handleSendOrder={handleSendOrder}
                quoteTokenDecimals={quoteTokenDecimals}
                baseTokenDecimals={baseTokenDecimals}
                buttonType={buttonType}
              />
            }
          />
        </Tabs>
      </Collapse>
      </ContentWrapper>
    </Wrapper>
  )
}

const LimitOrderPanel = props => {
  const { 
    price, 
    side, 
    amount, 
    maxAmount, 
    fraction, 
    total, 
    quoteTokenSymbol, 
    baseTokenSymbol, 
    onInputChange, 
    insufficientBalance, 
    handleSendOrder, 
    quoteTokenDecimals,
    baseTokenDecimals,
    address,
    operatorAddress,
    exchangeAddress,
    askPrice,
    bidPrice,
    bestAskMatcher,
    bestBidMatcher,
    tokensBySymbol,
    buttonType,
    displayMode,
    wif,
    sendNewOrder
  } = props

  let fAmount = parseFloat(amount);
  let fPrice = parseFloat(price);
  let matcher = operatorAddress;
  let sell_symbol = (side === 'SELL') ? baseTokenSymbol : quoteTokenSymbol;
  let buy_symbol = (side === 'BUY') ? baseTokenSymbol : quoteTokenSymbol;
  let sell_asset_decimals = (side === 'SELL') ? baseTokenDecimals : quoteTokenDecimals;
  let buy_asset_decimals = (side === 'BUY') ? baseTokenDecimals : quoteTokenDecimals;
  if (side === 'SELL'){
    let base_amount_sold = fAmount * Math.pow(10, baseTokenDecimals);
    let quote_amount_bought = fAmount * fPrice * Math.pow(10, quoteTokenDecimals);
    var price_in_pennies = quote_amount_bought / base_amount_sold;
    var sell_amount = Math.round(base_amount_sold);
    var matcher_fee = Math.round(quote_amount_bought * MATCHER_FEE)
    if (bidPrice && fPrice <= bidPrice) // inherit matcher from best bid
      matcher = bestBidMatcher;
  }
  else {
    let base_amount_bought = fAmount * Math.pow(10, baseTokenDecimals);
    let quote_amount_sold = fAmount * fPrice * Math.pow(10, quoteTokenDecimals);
    var price_in_pennies = base_amount_bought / quote_amount_sold;
    var sell_amount = Math.round(quote_amount_sold);
    var matcher_fee = Math.round(quote_amount_sold * MATCHER_FEE)
    if (askPrice && fPrice >= askPrice) // inherit matcher from best ask
      matcher = bestAskMatcher;
  }
  let fee = matcher_fee / Math.pow(10, quoteTokenDecimals);
  let order = (tokensBySymbol[sell_symbol] && tokensBySymbol[buy_symbol]) ? {
    sell_asset: tokensBySymbol[sell_symbol].asset,
    buy_asset: tokensBySymbol[buy_symbol].asset,
    sell_amount,
    price: price_in_pennies,
    matcher_fee_asset: tokensBySymbol[quoteTokenSymbol].asset,
    matcher_fee,
    matcher,
    aa: exchangeAddress,
    address
  } : {};
  if (order.price > 0){
    // Due to limited precision, the price can only change stepwise.
    // Find the closest allowed price and recalculate matcher_fee
    order.price = getPriceInAllowedPrecision(order);
		if (order.sell_asset === order.matcher_fee_asset)
			order.matcher_fee = Math.ceil(order.sell_amount * MATCHER_FEE);
		else if (order.buy_asset === order.matcher_fee_asset)
			order.matcher_fee = Math.ceil(order.sell_amount * order.price * MATCHER_FEE);
  }
  console.log(order);
  let pairing_secret = btoa(JSON.stringify(order));
  let link = CHATBOT_URL + pairing_secret;

  const orderRef = React.createRef();

  return (
    <React.Fragment>
      <InputBox>
        {
          displayMode.name === 'Price' ?
            ( <InputLabel>
              Price <MutedText>(in {quoteTokenSymbol})</MutedText>
            </InputLabel> )
            : ( <InputLabel>
              Odds
            </InputLabel> )
        }
        <PriceInputGroup 
          name="price" 
          onChange={onInputChange} 
          value={price} 
          placeholder={displayMode.priceAlias} 
        />
      </InputBox>
      <InputBox>
        <InputLabel>
          {
            displayMode.name === 'Price' ?
            ( <InputLabel>
              Amount <MutedText>({baseTokenSymbol})</MutedText>
            </InputLabel> )
            : ( <InputLabel>
              Stake <MutedText>(in {quoteTokenSymbol})</MutedText>
            </InputLabel> )
          }
        </InputLabel>
        <PriceInputGroup
          name="amount"
          onChange={onInputChange}
          value={amount}
          placeholder={displayMode.amountAlias}
          intent={insufficientBalance ? 'danger' : null}
          rightElement={insufficientBalance ? <Total>Insufficient Balance</Total> : null}
        />
      </InputBox>
      <RadioButtonsWrapper>
        <RadioButton value={25} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={50} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={75} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={100} fraction={fraction} onInputChange={onInputChange} />
        <Flex pl={2} pt={1} >
          <Help position={Position.RIGHT}>
            Select fraction of total possible value you can trade at the currently selected price.
          </Help>
        </Flex>
      </RadioButtonsWrapper>
      { total && <MaxAmount>Total: ~{total} {quoteTokenSymbol}</MaxAmount> }
      { maxAmount && <MaxAmount>Max: ~{maxAmount} {baseTokenSymbol}</MaxAmount> }
      <MaxAmount> Fee: {fee} {quoteTokenSymbol}</MaxAmount>
        <ButtonRenderer
          side={side}
          amount={displayMode.name === 'Price' ? amount : formatNumber(parseFloat(amount) * parseFloat(price), { precision: 3 })}
          baseTokenSymbol={baseTokenSymbol}
          quoteTokenSymbol={quoteTokenSymbol}
          handleSendOrder={handleSendOrder}
          buttonType={buttonType}
          disabled={insufficientBalance || !fPrice || !fAmount}
          wif={wif}
          order={order}
          orderRef={orderRef}
          sendNewOrder={sendNewOrder}
        />
      <HiddenLink innerRef={orderRef} href={link} />
    </React.Fragment>
  )
}



const MarketOrderPanel = (props: *) => {
  const { 
    side, 
    price, 
    amount, 
    maxAmount, 
    fraction, 
    total, 
    quoteTokenSymbol, 
    baseTokenSymbol, 
    onInputChange, 
    insufficientBalance, 
    handleSendOrder, 
    quoteTokenDecimals,
    buttonType
  } = props


  return (
    <React.Fragment>
      <InputBox>
        <InputLabel>
          Price <MutedText>({quoteTokenSymbol})</MutedText>
        </InputLabel>
        <PriceInputGroup name="price" onChange={onInputChange} placeholder={price} disabled />
      </InputBox>
      <InputBox>
        <InputLabel>Amount <MutedText>({baseTokenSymbol})</MutedText></InputLabel>
        <PriceInputGroup
          name="amount"
          value={amount}
          placeholder="Amount"
          onChange={onInputChange}
          intent={insufficientBalance ? 'danger' : null}
          rightElement={insufficientBalance ? <Total>Insufficient Balance</Total> : null}
        />
      </InputBox>
      <RadioButtonsWrapper>
        <RadioButton value={25} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={50} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={75} fraction={fraction} onInputChange={onInputChange} />
        <RadioButton value={100} fraction={fraction} onInputChange={onInputChange} />
        <Flex pl={2} pt={1} >
          <Help position={Position.RIGHT}>
            Select fraction of total possible value you can trade at the currently selected price.
          </Help>
        </Flex>
      </RadioButtonsWrapper>
      { total && <MaxAmount>Total: ~{total} {quoteTokenSymbol}</MaxAmount> }
      { maxAmount && <MaxAmount>Max: ~{maxAmount} {baseTokenSymbol}</MaxAmount> }
      <MaxAmount>Fee: {0 /*utils.formatUnits(makeFee || 0, quoteTokenDecimals)*/} {quoteTokenSymbol}</MaxAmount>
      <ButtonRenderer
        side={side}
        link=""
        amount={amount}
        baseTokenSymbol={baseTokenSymbol}
        quoteTokenSymbol={quoteTokenSymbol}
        handleSendOrder={handleSendOrder}
        disabled={insufficientBalance}
        buttonType={buttonType}
      />
    </React.Fragment>
  )
}

const StopLimitOrderPanel = (props: *) => {
  const { 
    stopPrice, 
    side, 
    amount, 
    maxAmount, 
    total, 
    quoteTokenSymbol, 
    baseTokenSymbol, 
    onInputChange, 
    insufficientBalance, 
    handleSendOrder, 
    quoteTokenDecimals,
    buttonType
    } = props

  return (
    <React.Fragment>
      <InputBox>
        <InputLabel>
          Stop Price <MutedText>({quoteTokenSymbol})</MutedText>
        </InputLabel>
        <PriceInputGroup name="stopPrice" onChange={onInputChange} value={stopPrice} placeholder="Stop Price" />
      </InputBox>
      <InputBox>
        <InputLabel>
          Limit Price <MutedText>({quoteTokenSymbol})</MutedText>
        </InputLabel>
        <PriceInputGroup
          name="limitPrice"
          onChange={onInputChange}
          value={amount}
          placeholder="Limit Price"
          intent={insufficientBalance ? 'danger' : null}
          rightElement={insufficientBalance ? <Total>Insufficient Balance</Total> : null}
        />
      </InputBox>
      <InputBox>
        <InputLabel>
          Amount <MutedText>({baseTokenSymbol})</MutedText>
        </InputLabel>
        <PriceInputGroup
          name="amount"
          onChange={onInputChange}
          value={amount}
          placeholder="Amount"
          rightElement={<Total>Total: ~{total} {quoteTokenSymbol}</Total>}
        />
      </InputBox>
      <MaxAmount>Total: ~{total} {quoteTokenSymbol}</MaxAmount>
      <MaxAmount>Max: ~{maxAmount} {baseTokenSymbol}</MaxAmount>
      <MaxAmount>Fee: {0 /*utils.formatUnits(makeFee || 0, quoteTokenDecimals)*/} {quoteTokenSymbol} </MaxAmount>
      <ButtonRenderer
        side={side}
        link=""
        amount={amount}
        baseTokenSymbol={baseTokenSymbol}
        quoteTokenSymbol={quoteTokenSymbol}
        handleSendOrder={handleSendOrder}
        disabled={insufficientBalance}
        buttonType={buttonType}
      />
    </React.Fragment>
  )
}

const RadioButton = props => {
  const { onInputChange, value } = props
  return (
    <RadioButtonBox>
      <span>{value}%</span>
      <InputGroup name="fraction" type="radio" onChange={onInputChange} value={value} />
    </RadioButtonBox>
  )
}


const ButtonRenderer = (props: *) => {
  const {
    side,
    wif,
    order,
    orderRef,
    amount,
    baseTokenSymbol,
    quoteTokenSymbol,
    handleSendOrder,
    disabled,
    buttonType,
    sendNewOrder
  } = props


  const sendOrder = () => {
    if (wif) {
      sendNewOrder(signMessageByWif(order, wif))
    } else {
      orderRef.current.click()
    }
  }

  const buyGA = (symbol) => {
    sendOrder();

    ReactGA.event({
      category: 'ODEX',
      action: 'Buy',
      label: baseTokenSymbol + '/' + quoteTokenSymbol
    });
  }

  const sellGA = (symbol) => {
    sendOrder();

    ReactGA.event({
      category: 'ODEX',
      action: 'Sell',
      label: baseTokenSymbol + '/' + quoteTokenSymbol
    });
  }
  
  return {
    "BUY": (
      <GreenGlowingAnchorButton
          intent="success"
          text={side + " " + amount + " " + baseTokenSymbol}
          name="order"
          onClick={buyGA}
          disabled={disabled} 
          fill
      />
    ),
    "SELL": (
      <RedGlowingAnchorButton
        intent="danger"
        text={side + " " + amount + " " + baseTokenSymbol}
        name="order"
        onClick={sellGA}
        disabled={disabled} 
        fill 
      />
    ),
    "BUY_UNLOCK": (
      <GreenGlowingButton
          intent="success"
          text={`Unlock ${baseTokenSymbol}/${quoteTokenSymbol}`}
          name="order"
          disabled={disabled} 
          fill
      />
    ),
    "SELL_UNLOCK": (
      <RedGlowingButton
        intent="danger"
        text={`Unlock ${baseTokenSymbol}/${quoteTokenSymbol}`}
        name="order"
        disabled={disabled}
        fill
      />
    ),
    "BUY_UNLOCK_PENDING": (
      <GreenGlowingButton
        intent="success"
        name="order"
        disabled
        fill
      >
        <FlexRow alignItems="center">
          <Box px={2}>
            <Spinner size={15} intent="success" />
          </Box>
          Pending
        </FlexRow>
      </GreenGlowingButton>
    ),
    "SELL_UNLOCK_PENDING": (
      <GreenGlowingButton
        intent="success"
        name="order"
        disabled
        fill
      >
        <FlexRow alignItems="center">
          <Box px={2}>
            <Spinner size={15} intent="success" />
          </Box>
          Pending
        </FlexRow>
      </GreenGlowingButton>
    ),
    "BUY_LOGIN": (
      <GreenGlowingAnchorButton
          intent="success"
          text={`Login to trade ${baseTokenSymbol}/${quoteTokenSymbol}`}
          name="order"
          href="/login"
          // disabled={insufficientBalance}
          fill
      />
    ),
    "SELL_LOGIN": (
        <RedGlowingAnchorButton
          intent="danger"
          text={`Login to trade ${baseTokenSymbol}/${quoteTokenSymbol}`}
          name="order"
          href="/login"
          // disabled={insufficientBalance} 
          fill 
      />
    )
  }[buttonType]
}


const HiddenLink= styled.a`
`


const OrderFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ButtonRow = styled.span`
  display: flex;
  justify-content: flex-end;
`
const RadioButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`

const RadioButtonBox = styled(Label)`
  width: 45px;
  height: 30px;
  display: flex;
  margin-left: 10px;
  margin-bottom: 16px;
  background: #27343d;
  text-align: center;
  padding: 4px;
  cursor: pointer;
  border: 1px solid #2584c1;
  box-shadow: none;
  border-radius: 3px;
  input {
    opacity: 0;
    width: 0px;
    margin: 0px;
  }
  .bp3-input-group {
    width: 0px;
  }
`

const PriceInputGroup = styled(InputGroup).attrs({
  className: 'bp3-fill'
})``

const InputBox = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
`

const InputLabel = styled.div`
  height: 100%;
  margin: auto;
  width: 180px;
`

const Total = styled.div`
  color: ${Colors.RED3};
  margin: auto;
  height: 100%;
  padding-top: 8px;
  padding-right: 4px;
`

const MaxAmount = styled.div`
  display: flex;
  color: ${Colors.GRAY3}
  font-size: 11px;
  justify-content: flex-end;
  padding-bottom: 5px;
  `

const ContentWrapper = styled.div`
  flex: 1;
`

export default OrderFormRenderer