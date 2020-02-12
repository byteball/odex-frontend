// @flow
import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TokenBalanceChart from '../../components/TokenBalanceChart'
import RecentTxTable from '../../components/RecentTxTable'
import Help from '../../components/Help'

import { Card, Position, Button, Tag, Tabs, Tab, InputGroup, Icon } from '@blueprintjs/core';
import { Flex, FlexRow, FlexItem, Box, Colors, Text,TextDiv, TextBox, BlueGlowingButton } from '../Common'
import { Fonts } from '../Common/Variables'
import { Spring } from 'react-spring'

import type { Tx } from '../../types/transactions'

type Props = {
  isModalOpen: boolean,
  accountAddress: string,
  balance: number,
  selectedTab: string,
  asset: string,
  assetStatus: string,
  tokenSymbol: string,
  tokenExplorerUrl: string,
  accountExplorerUrl: string,
  tokenIsAdded: ?boolean,
  tokenIsListed: ?boolean,
  tokenIsRegistered: ?boolean,
  handleChangeTab: string => void,
  handleModalClose: void => void,
  handleChangeAsset: SyntheticInputEvent<Object> => void,
  handleDetectToken: SyntheticEvent<> => Promise<void>,
  handleAddToken: SyntheticEvent<> => Promise<void>,
  handleRegisterToken: SyntheticEvent<> => Promise<void>,
  addTokenPending: boolean,
  registerTokenPending: boolean,
  recentTransactions: Array<Tx>
}

const WalletInfoRenderer = (props: Props) => {
  const {
    isModalOpen,
    handleModalClose,
    accountAddress,
    balance,
    selectedTab,
    asset,
    tokenSymbol,
    tokenExplorerUrl,
    accountExplorerUrl,
    assetStatus,
    handleChangeTab,
    handleChangeAsset,
    handleDetectToken,
    tokenIsAdded,
    tokenIsListed,
    tokenIsRegistered,
    handleAddToken,
    handleRegisterToken,
    addTokenPending,
    registerTokenPending,
    recentTransactions
  } = props;

  return (
      <WalletInfoCard>
      <ButtonRow>
        <Button
          text="Portfolio"
          minimal
          onClick={() => handleChangeTab("Portfolio")}
          active={selectedTab === "Portfolio"}
          intent={selectedTab === "Portfolio" ? 'primary' : ''}
        />
        <Button
          text="Add Token"
          minimal
          onClick={() => handleChangeTab("Add Token")}
          active={selectedTab === "Add Token"}
          intent={selectedTab === "Add Token" ? 'primary' : ''}
        />
        {/* {<Button
          text="Premium Listing"
          minimal
          onClick={() => handleChangeTab("Premium Listing")}
          intent={selectedTab === "Premium Listing" ? 'warning' : ''}
          active={selectedTab === "Premium Listing"}
        />}     */}
      </ButtonRow>
      <Tabs selectedTabId={selectedTab}>
        <Tab
          id="Portfolio"
          panel={
            <PortfolioPanel
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              accountAddress={accountAddress}
              accountExplorerUrl={accountExplorerUrl}
              balance={balance}
              transactions={recentTransactions}
            />
          }
        />
        <Tab
          id="Add Token"
          panel={
            <AddTokenPanel
              handleChangeAsset={handleChangeAsset}
              handleDetectToken={handleDetectToken}
              asset={asset}
              assetStatus={assetStatus}
              tokenSymbol={tokenSymbol}
              tokenExplorerUrl={tokenExplorerUrl}
              tokenIsAdded={tokenIsAdded}
              tokenIsRegistered={tokenIsRegistered}
              tokenIsListed={tokenIsListed}
              handleAddToken={handleAddToken}
              handleRegisterToken={handleRegisterToken}
              addTokenPending={addTokenPending}
              registerTokenPending={registerTokenPending}
            />
          }
        />
        {/* {<Tab
          id="Premium Listing"
          panel={
            <PremiumListingPanel
              handleChangeAsset={handleChangeAsset}
              handleDetectToken={handleDetectToken}
              asset={asset}
              assetStatus={assetStatus}
              tokenSymbol={tokenSymbol}
              tokenExplorerUrl={tokenExplorerUrl}
              tokenIsAdded={tokenIsAdded}
              tokenIsRegistered={tokenIsRegistered}
              tokenIsListed={tokenIsListed}
              handleAddToken={handleAddToken}
              handleRegisterToken={handleRegisterToken}
            />
          }
        />} */}
      </Tabs>        
      </WalletInfoCard>
  );
};


const PortfolioPanel = (props: *) => {
  const {
    accountAddress,
    accountExplorerUrl,
    transactions
  } = props

  return (
    <Box>
        <Box py={0}>
          <TextBox>
            <h3 minimal large>Obyte Account</h3>
          </TextBox>
          <TextDiv py={2} small muted>
            Here is your Obyte address that is linked to the exchange.  Your deposits should come from this address and your withdrawals will be also sent to this address.
          </TextDiv>
          <FlexRow 
            py={2} 
            px={0} 
            fontSize={Fonts.FONT_SIZE_SMALL} 
          >
            <a href={accountExplorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bp3-text-overflow-ellipsis"
            >
              {accountAddress}
            </a>
            <CopyToClipboardBox px={1}>
              <CopyToClipboard text={accountAddress}>
                <Icon icon="clipboard" intent="primary" />
              </CopyToClipboard>
            </CopyToClipboardBox>
          </FlexRow>
        </Box>
        <h3 minimal large>Portfolio Overview</h3>
        <TokenBalanceChartBox>
          <TokenBalanceChart />
        </TokenBalanceChartBox>
        <h3 minimal large>Recent Transactions</h3>
          <Box my={2}>
            <RecentTxTable
              transactions={transactions}
            />
          </Box>
        </Box>
  )
}

const CopyToClipboardBox = styled(Box)`
  cursor: context-menu;
`

const AddTokenPanel = (props: *) => {
  const { 
    asset,
    assetStatus, 
    tokenSymbol,
    tokenExplorerUrl,
    tokenIsAdded,
    tokenIsListed,
    tokenIsRegistered,
    handleDetectToken,    
    handleChangeAsset, 
    handleAddToken,
    handleRegisterToken,
    addTokenPending,
    registerTokenPending
  } = props

  return (
      <Spring from={{opacity: 0}} to={{opacity: 1}}>
      {props =>
        <Box style={props}>
        <Text muted>
          Add a token that is not listed among the default ODEX tokens. If the token has not yet been added to 
          the ODEX you can also list the token.
          <br />
          View the FAQ for more detailed information on listing tokens.
        </Text>
        <Flex py={3}>
            <FlexItem flex="1">
              <InputGroup
                name="asset"
                placeholder="asset ID (44 characters)"
                intent={assetStatus === "invalid" ? "danger" : ""}
                onChange={handleChangeAsset}
                value={asset}
                autoFocus
                fill
              />
            </FlexItem>
          <Button
            intent="primary"
            text="Search Token"
            minimal
            onClick={handleDetectToken}
          />
          <Box pl={2} pt={2}>
            <Help position={Position.LEFT}>
              This button will detect whether the entered asset exists.
            </Help>
          </Box>
      </Flex>
      {tokenSymbol &&
        <Box>
          <h3>Token found: {tokenSymbol}</h3>
          <a href={tokenExplorerUrl} target="_blank">→ View on Explorer</a>
          <Box py={3}>
            {tokenIsRegistered && <Flex py={1} width="50%">
              <BlueGlowingButton
                disabled={tokenIsAdded}
                text={tokenIsAdded ? "Token added" : "Add token"}
                loading={addTokenPending}
                intent="primary"
                fill
                onClick={handleAddToken}
              />
              <Box pl={2} pt={1}>
                <Help position={Position.RIGHT}>
                  Add {tokenSymbol} to your list of tradable tokens.
                  <br />
                  <br />

                  If another person wants to trade {tokenSymbol} too, that person needs to add this token on their own account to discover
                  the corresponding markets.
                  <br />
                  <br />
                </Help>
              </Box>
            </Flex>}
            {!tokenIsRegistered && <Flex py={1} width="50%">
              <BlueGlowingButton
                disabled={tokenIsRegistered}
                text={tokenIsRegistered ? "Token registered" : "Register token"}
                loading={registerTokenPending}
                intent="primary"
                fill
                onClick={handleRegisterToken}
              />
              <Box pl={2} pt={1}>
                <Help position={Position.RIGHT}>
                  Registering a token will create the following markets:
                  <ul>
                    <li>→ {tokenSymbol}/USDC</li>
                    <li>→ {tokenSymbol}/GBYTE</li>
                  </ul>
                  If another person wants to trade {tokenSymbol}, that person needs to add this token on their own account to discover
                  the corresponding markets.
                  <br />
                  <br />
                </Help>
              </Box>
            </Flex>}
          </Box>
        </Box>
        }
      </Box>
      }
    </Spring>
  )
}


const PremiumListingPanel = (props: *) => {
  return (
    <Box>
      For premium listing, contact us at support@proofsuite.com
    </Box>
  )
}

const WalletInfoCard = styled(Card)`
  height: 92vh;
  overflow-y: auto;
`

const GlowingButton = styled(Button)`
  box-shadow: ${"0 3px 20px " + Colors.BLUE1 + "!important;"}
  &hover: {
    background-color: ${Colors.BLUE5}
    box-shadow: ${"0 3px 20px " + Colors.BLUE5 + "!important;"}
  }
`

const TokenBalanceChartBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: left;
  align-content: middle;
  text-align: center;
  width: 100%;
`

const ButtonRow = styled.span`
  display: flex;
  justify-content: flex-start;
  & .bp3-button {
    margin-left: 5px;
  }
`

export default WalletInfoRenderer;
