// @flow
import React from 'react';
import styled from 'styled-components';
import { formatNumber } from 'accounting-js'
import Help from '../../components/Help'

import {
  Checkbox, 
  InputGroup,
  Position,
  Icon,
  Tooltip
} from '@blueprintjs/core';

import { 
  FlexRowSpaceBetween, 
  ColoredCryptoIcon, 
  Colors,
  OdexLogo,
  Centered,
  LargeText,
  SmallText,
  BlueGlowingButton,
  FlexRow,
  FlexColumn,
  Box,
  InlineBox,
  EmphasizedText,
  Text
} from '../Common';

import {
  Fonts
} from '../Common/Variables'

import {
  List,
  AutoSizer
} from 'react-virtualized'

import { 
  Spring,
  Transition
} from 'react-spring'
   
import { Devices } from '../../components/Common/Variables'

type TokenData = {
  symbol: string,
  asset: string,
  balance: number,
  value: number,
  decimals: number,
  quote?: ?bool,
  registered?: ?bool,
  listed?: ?bool,
  active?: ?bool,
}

type Props = {
  connected: boolean,
  baseTokensData: Array<TokenData>,
  searchInput: string,
  handleSearchInputChange: (SyntheticInputEvent<>) => void,
  hideZeroBalanceToken: boolean,
  openDepositModal: (SyntheticEvent<>, string) => void,
  openSendModal: (SyntheticEvent<>, string) => void,
  toggleZeroBalanceToken: void => void,
  redirectToTradingPage: string => void,
  totalFilteredTokens: number,
  referenceCurrency: string,
  selectedTokenSymbol: string,
  selectedTokenData: TokenData,
  updateSelectedToken: string => void,
};

class TokenTableRenderer extends React.PureComponent<Props> {

  rowRenderer = ({ key, index, style }: *) => {
      
      return (
        <BaseTokenRow 
          key={key} 
          row_key={key} 
          index={index} 
          style={style} 
          {...this.props}
        />
      )
  }

  noRowRenderer = () => {
    return (
      <Centered>
        <OdexLogo height="150em" width="150em" />
        <LargeText muted>No tokens to display!</LargeText>
      </Centered>
    )
  }

  widgetRenderer = () => {
      const {
        baseTokensData,
        selectedTokenSymbol,
        openDepositModal,
        redirectToTradingPage,
        selectedTokenData,
      } = this.props


      // let selectedTokenData = baseTokensData.filter(elem => elem.symbol === selectedToken)[0]      
      return (
        <TokenWidget
          token={selectedTokenSymbol}
          baseTokensData={baseTokensData}
          selectedTokenData={selectedTokenData}
          openDepositModal={openDepositModal}
          redirectToTradingPage={redirectToTradingPage}
        />
      )
  }

  render () {
      const {
        hideZeroBalanceToken,
        toggleZeroBalanceToken,
        searchInput,
        handleSearchInputChange,
        totalFilteredTokens,
      } = this.props;

      return (
        <Spring from={{ opacity: 0, marginLeft: 100 }} to={{ opacity: 1, marginLeft: 0 }}>
        {animation =>
            <React.Fragment>
            {this.widgetRenderer()}
            <TableSection style={animation} p={1}>
              <FlexRowSpaceBetween mb={2}>
                <InputGroup
                  type="string"
                  leftIcon="search"
                  placeholder="Search Token ..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <HideTokenCheck 
                  checked={hideZeroBalanceToken} 
                  onChange={toggleZeroBalanceToken}
                >
                  Hide zero balance tokens
                </HideTokenCheck>
              </FlexRowSpaceBetween>
              <TableHeader>
                  <TokenNameHeaderCell>Token Name</TokenNameHeaderCell>
                  <BalancesHeaderCell>Balances</BalancesHeaderCell>
                  <ActionsHeaderCell></ActionsHeaderCell>
              </TableHeader>
              <Table>
                  <AutoSizer style={{ height: '100%'}}>
                    {({ width, height }) => (
                      <List
                        width={width}
                        height={height}
                        rowCount={totalFilteredTokens}
                        rowHeight={60}
                        rowRenderer={this.rowRenderer}
                        noRowsRenderer={this.noRowRenderer}
                      />
                    )}
                </AutoSizer>
              </Table>
            </TableSection>
          </React.Fragment>
        }
        </Spring>
      );
  }
}

const TokenWidget = (props: *) => {
  const {
    selectedTokenData,
    openDepositModal,
    redirectToTradingPage,
    baseTokensData
  } = props;

  if (!selectedTokenData || !baseTokensData || !baseTokensData.length) return null

  return (
    <Transition
      items={[selectedTokenData]}
      keys={item => item.symbol}
      from={{ marginLeft: -50, opacity: 0 }}
      enter={{ marginLeft: 0, opacity: 1 }}
      leave={{ opacity: 0, display: 'none' }}
    >
      {token => animation => {
        return (
          <Box m={3} pb={3} style={animation}>
            <FlexRow justifyContent="space-between">
              <FlexRow justifyContent="flex-end">
                <FlexColumn mx={3}>
                  <ColoredCryptoIcon size={128} name={token.symbol} />
                </FlexColumn>
                <TokenBalanceWidget mx={3}>
                <FlexColumn mx={3} alignItems="flex-end">
                    <FlexRow justifyContent="center">
                      <Text muted xlarge alignSelf="center">{token.symbol} Balance</Text>
                    </FlexRow>
                    <TokenBalanceText justifyContent="flex-end">{token.balance}</TokenBalanceText>
                    <FlexRow justifyContent="flex-end">
                      <TokenBalanceSymbol alignSelf="flex-end" muted>{token.symbol}</TokenBalanceSymbol>
                    </FlexRow>
                  </FlexColumn>
                </TokenBalanceWidget>
              </FlexRow>
              <FlexColumn>  
                <BlueGlowingButton
                  m={2}
                  large
                  round
                  intent="primary"
                  onClick={(event) => openDepositModal(event, token.symbol)}
                  text={`Deposit ${token.symbol}`}
                />
                <BlueGlowingButton
                  text={`Trade ${token.symbol}`}
                  m={2}
                  intent="primary"
                  large
                  onClick={(event) => redirectToTradingPage(token.symbol)}
                />
              </FlexColumn>          
            </FlexRow>
        </Box>
        )
      }}
    </Transition>
  )
}


const BaseTokenRow = (props: *) => {
  const {
    index,
    row_key,
    style,
    baseTokensData,
    connected,
    openDepositModal,
    openSendModal,
    referenceCurrency,
    updateSelectedToken
  } = props;

  const { symbol, balance, value, listed } = baseTokensData[index]

    return (
        <Row key={row_key} style={style}>
          <TokenNameCell onClick={() => updateSelectedToken(symbol)}>
            <TokenNameWrapper>
              <ColoredCryptoIcon size={32} name={symbol} />
              <SmallText muted>{symbol}</SmallText>
              {
                listed && <Box px={2}>
                  <Tooltip hoverOpenDelay={50} content="Verified" position={Position.RIGHT}>
                    <Icon icon="endorsed" iconSize={14} intent="primary" />
                  </Tooltip>
                </Box>
              }
            </TokenNameWrapper>
          </TokenNameCell>
          <BalancesCell onClick={() => updateSelectedToken(symbol)}>
            <FlexRow>
              <SmallText muted>
                {formatNumber(balance, { precision: 4 })}  {symbol} 
              </SmallText>
              {value !== null && 
                <SmallText muted ml={1}> 
                  ({formatNumber(value, { precision: 2 })} {referenceCurrency})
                </SmallText>
              }
            </FlexRow>
          </BalancesCell>
          <ActionsCell onClick={() => updateSelectedToken(symbol)}>
            <FlexRow justifyContent="flex-end" p={1}>
              <ButtonWrapper>
                <BlueGlowingButton
                  disabled={!connected}
                  intent="primary"
                  text="Deposit"
                  onClick={(event) => openDepositModal(event, symbol)}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BlueGlowingButton
                  disabled={!connected}
                  intent="primary"
                  text="Withdraw"
                  onClick={(event) => openSendModal(event, symbol)}
                  />
              </ButtonWrapper>
            </FlexRow>
          </ActionsCell>
        </Row>
    );
};

const TableSection = styled(Box)`
  display: flex;
  justify-content: start;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: calc(90vh - 300px);

  @media ${Devices.mobileL} {
    height: calc(90vh - 300px);
  }
`;

const TableHeader = styled.div`
  display: flex;
  width: 100%;
`;

const TableHeaderCell = styled.div`
  width: 20%;
`;

const TokenNameHeaderCell = styled(TableHeaderCell)`
  min-width: 130px;

  @media ${Devices.mobileM} {
    display: none;
  }
`

const BalancesHeaderCell = styled(TableHeaderCell)`
  width: 70%;

  @media ${Devices.mobileM} {
    display: none;
  }
`

const ActionsHeaderCell = styled(TableHeaderCell)`
  width: 40%;
`

const Cell = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TokenNameCell = styled(Cell)`
  min-width: 130px;

  @media ${Devices.mobileM} {
    width: 70%;
  }
`

const BalancesCell = styled(Cell)`
  width: 70%;

  @media ${Devices.mobileM} {
    display: none;
  }
`

const ActionsCell = styled(Cell)`
  width: 40%;
  @media ${Devices.mobileM} {
    width: 100%;
    text-align: right;
  }
`

const Row = styled.div`
  width: 100%;
  display: flex;
  height: 60px;

  &:hover {
    background-color: ${Colors.BLUE_MUTED} !important;
    cursor: pointer;
    position: relative;
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 0 1px rgb(49, 64, 76), -1px 10px 4px rgba(16, 22, 26, 0.1),
      1px 18px 24px rgba(16, 22, 26, 0.2);
    box-shadow: inset 0 0 0 1px rgb(49, 64, 76), -1px 5px 4px rgba(16, 22, 26, 0.1), 1px 7px 24px rgba(16, 22, 26, 0.2);
    z-index: 1;
  }
  @media ${Devices.mobileM} {
    flex-direction: column !important;
    height: auto !important;
    margin-bottom: 15px;
    position: relative !important;
    top: unset !important;
    padding: 5px 0;
  }
`;

const TokenNameWrapper = styled.span`
  display: flex;
  align-items: center;

  & svg {
    margin-right: 12px;
  }

  padding-left: 6px;
`;

const HideTokenCheck = styled(Checkbox)`
  margin: 0 !important;

  @media ${Devices.mobileL} {
    display: none;
  }
`;

const TokenBalanceText = styled.div`
  font-size: ${Fonts.FONT_SIZE_XXL + 'px'};
  color: ${props => (props.intent ? Colors[props.intent] : props.muted ? Colors.TEXT_MUTED : Colors.TEXT)}
`;

const TokenBalanceSymbol = styled.div`
  font-size: ${Fonts.FONT_SIZE_XL + 'px'};
  color: ${props => (props.intent ? Colors[props.intent] : props.muted ? Colors.TEXT_MUTED : Colors.TEXT)}
`

const ButtonWrapper = styled.span`  
  margin-left: 10px !important;
  margin-right: 10px !important;
`;




const TokenBalanceWidget = styled(Box)`
  display: flex;
  flex-direction: row;
  
  @media ${Devices.mobileL} {
    display: none;
  }
`


const TotalBalanceBox = styled(FlexColumn)`
  align-items: flex-end;
  
  @media ${Devices.mobileL} {
    display: none;
  }
`

export default TokenTableRenderer;
