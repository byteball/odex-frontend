// @flow
import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TokenBalanceChart from '../../components/TokenBalanceChart'
import RecentTxTable from '../../components/RecentTxTable'
import Help from '../../components/Help'

import { Card, Position, Button, Tag, Tabs, Tab, InputGroup, Icon, Checkbox } from '@blueprintjs/core';
import { Flex, FlexRow, FlexItem, Box, Colors, Text, TextDiv, TextBox, BlueGlowingButton, ModalBody } from '../Common'
import { Fonts } from '../Common/Variables'
import { Spring } from 'react-spring'
import Modal from '../Modal';
import { TextColors } from '../Common/Colors';

import type { TokenData } from '../../types/tokens';
import type { Tx } from '../../types/transactions'
import type { BrowserWallet } from '../../types/account';

import { PROTOCOL } from '../../config/urls';
import TransactionsTable from './Transactions';

const { isValidAddress } = require('obyte/lib/utils');

type Props = {
  isModalOpen: boolean,
  accountAddress: string,
  browserWallet: BrowserWallet,
  balance: number,
  selectedTab: string,
  asset: string,
  assetStatus: string,
  tokenSymbol: string,
  tokenExplorerUrl: string,
  accountExplorerUrl: string,
  address: string,
  authorizations: Array,
  handleChangeAddress: SyntheticInputEvent<Object> => void,
  tokenIsAdded: ?boolean,
  tokenIsListed: ?boolean,
  tokenIsRegistered: ?boolean,
  handleChangeTab: string => void,
  handleModalClose: void => void,
  handleChangeAsset: SyntheticInputEvent<Object> => void,
  handleDetectToken: SyntheticEvent<> => Promise<void>,
  handleAddToken: SyntheticEvent<> => Promise<void>,
  handleRegisterToken: SyntheticEvent<> => Promise<void>,
  handleAddBrowserWallet: void => void,
  handleRemoveBrowserWallet: void => void,
  handleToggleRequestConfirm: void =>  void,
  addTokenPending: boolean,
  registerTokenPending: boolean,
  recentTransactions: Array<Tx>,
  exchangeAddress: string,
  showRevokeModal: boolean,
  revokeAddress: string,
  handleToggleRevokeModal: (?string) => void,
  transactions: Array,
  tokenData: Array<TokenData>,
  passphrase: string,
  handleChangePassphrase: SyntheticInputEvent<Object> => void,
};

const WalletInfoRenderer = (props: Props) => {
  const {
    isModalOpen,
    handleModalClose,
    accountAddress,
    browserWallet,
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
    address,
    authorizations,
    handleChangeAddress,
    transactions,
    exchangeAddress,
    showRevokeModal,
    revokeAddress,
    handleToggleRevokeModal,
    tokenData,
    handleAddBrowserWallet,
    handleRemoveBrowserWallet,
    handleToggleRequestConfirm,
    passphrase,
    handleChangePassphrase
  } = props;

  return (
      <WalletInfoCard>
      <ButtonRow>
        <Button
          text="Portfolio"
          minimal
          small
          onClick={() => handleChangeTab("Portfolio")}
          active={selectedTab === "Portfolio"}
          intent={selectedTab === "Portfolio" ? 'primary' : ''}
        />
        <Button
          text="Add Token"
          minimal
          small
          onClick={() => handleChangeTab("Add Token")}
          active={selectedTab === "Add Token"}
          intent={selectedTab === "Add Token" ? 'primary' : ''}
        />
        <Button
          text="Authorizations"
          minimal
          small
          onClick={() => handleChangeTab('Authorizations')}
          active={selectedTab === 'Authorizations'}
          intent={selectedTab === 'Authorizations' ? 'primary' : ''}
        />
        <Button
          text="Browser Wallet"
          minimal
          small
          onClick={() => handleChangeTab('Browser Wallet')}
          active={selectedTab === 'Browser Wallet'}
          intent={selectedTab === 'Browser Wallet' ? 'primary' : ''}
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
              transactions={transactions}
              exchangeAddress={exchangeAddress}
              tokenData={tokenData}
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
        <Tab
          id="Authorizations"
          panel={
            <AuthorizationsPanel
              address={address}
              authorizations={authorizations}
              accountAddress={accountAddress}
              exchangeAddress={exchangeAddress}
              browserWallet={browserWallet}
              handleChangeAddress={handleChangeAddress}
              handleToggleRevokeModal={handleToggleRevokeModal}
            />
          }
        />
        <Tab
          id="Browser Wallet"
          panel={
            <BrowserWalletPanel
              browserWallet={browserWallet}
              passphrase={passphrase}
              handleChangePassphrase={handleChangePassphrase}
              handleAddBrowserWallet={handleAddBrowserWallet}
              handleToggleRevokeModal={handleToggleRevokeModal}
              handleToggleRequestConfirm={handleToggleRequestConfirm}
            />
          }
        />
        <RevokeAddressModal
          exchangeAddress={exchangeAddress}
          showRevokeModal={showRevokeModal}
          revokeAddress={revokeAddress}
          browserWallet={browserWallet}
          handleRemoveBrowserWallet={handleRemoveBrowserWallet}
          handleToggleRevokeModal={handleToggleRevokeModal}
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
    transactions,
    tokenData,
    exchangeAddress
  } = props

  return (
    <Box>
        <Box py={0}>
          <TextBox>
            <h3>Obyte Account</h3>
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
        <h3>Portfolio Overview</h3>
        <TokenBalanceChartBox>
          <TokenBalanceChart />
        </TokenBalanceChartBox>
        <h3>Recent Transactions</h3>
          <Box my={2}>
            <TransactionsTable 
              transactions={transactions}
              accountAddress={accountAddress}
              tokenData={tokenData}
              exchangeAddress={exchangeAddress}
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
                placeholder="asset ID (44 characters) or symbol"
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
          <Box pl={2} style={{display: "flex", alignItems: "center"}}>
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
  svg {
    overflow: visible;
  }
`

const ButtonRow = styled.span`
  display: flex;
  justify-content: flex-start;
  & .bp3-button {
    margin-left: 5px;
    text-align: center;
  }
`

const GRANTTEXT = styled.div`
  word-break: break-word;
`;

const AuthorizationsPanel = (props: *) => {
  const { 
    address,
    authorizations, 
    handleChangeAddress, 
    exchangeAddress, 
    handleToggleRevokeModal, 
    accountAddress,
    browserWallet
  } = props;
  let data = {
    grant: 1,
    address,
  };
  let base64data = btoa(JSON.stringify(data));
  const link = PROTOCOL + exchangeAddress + '?amount=10000&base64data=' + encodeURIComponent(base64data);

  const isValid = isValidAddress(address) && ![accountAddress, ...authorizations].includes(address)
  const message = !isValidAddress(address) ? 'Please input a valid address' 
    : address === accountAddress ? `You can't authorize your wallet address`: `You can't authorize the address that you authorized in the past`

  const openLink = () => {
    const alink = document.createElement('a');
    alink.href = link;
    alink.click();
  }

  const authorizedAddresses = !browserWallet.authorized ? authorizations : authorizations.filter(address => address !== browserWallet.address);

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <Box style={props}>
          <h3>
            Authorized Addresses
          </h3>

          <TextWrapper>
            <Text muted>Authorized addresses are allowed to trade on your behalf but are not allowed to withdraw your funds to any address but yours. You need them if you want to trade using <a href="https://github.com/byteball/odex-client">bots</a>.</Text>
          </TextWrapper>

          {authorizations.length === 0 && <Text muted>You don't have any authorized addresses</Text>}

          {authorizedAddresses.map(element => {

            return (
              <FlexRow py={2} key={element} alignItems="center">
                <FlexItem flex="1">
                  <GRANTTEXT>{element}</GRANTTEXT>
                </FlexItem>
                <Button icon="cross" intent="danger" minimal onClick={() => handleToggleRevokeModal(element)} />
              </FlexRow>
            );
          })}
          {
            browserWallet.authorized && (
              <FlexRow py={2} alignItems="center">
                <FlexItem flex="1">
                  <FlexRow>
                    <GRANTTEXT style={{ color: TextColors.PT_TEXT_SELECTION_COLOR }}>{browserWallet.address}</GRANTTEXT>
                    <Box pl={2} style={{display: "flex", alignItems: "center"}}>
                      <Help position={Position.BOTTOM} icon="globe-network">
                        This is browser address
                      </Help>
                    </Box>
                  </FlexRow>
                </FlexItem>
              </FlexRow>
            )
          }
          <h3>
            Add Authorizations
          </h3>
          <Flex py={2}>
            <FlexItem flex="1">
              <InputGroup
                name="address"
                placeholder="Address"
                intent={!isValid ? 'danger' : ''}
                onChange={handleChangeAddress}
                value={address}
                autoFocus
                fill
              />
            </FlexItem>
            <Button
              intent="primary"
              text="Authorize"
              disabled={!isValid}
              onClick={openLink}
            />
          </Flex>
          {!isValid && address !== '' && <Text muted intent="danger">{message}</Text>}
        </Box>
      )}
    </Spring>
  );
};

const RequestConfirmationCheck = styled(Checkbox)`
  margin: 0 !important;
`;

const Wrapper = styled.div`
`;

const TextWrapper = styled.div`
  padding: 3px 0;
`;

const BrowserWalletPanel = (props: *) => {
  const { 
    browserWallet, 
    passphrase, 
    handleAddBrowserWallet, 
    handleToggleRevokeModal,
    handleToggleRequestConfirm, 
    handleChangePassphrase
  } = props;
  
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <Box style={props}>
          <h3>
            About Browser Wallet
          </h3>
          <TextWrapper>
            <Text muted>Browser wallet allows you to quickly sign orders in browser with one or two clicks instead of confirming each order with your main Obyte wallet.</Text>
          </TextWrapper>
          
          {
            (browserWallet && browserWallet.address) &&
              <Wrapper>
                <TextWrapper>
                  <Text muted>The private key is stored in this browser but it is authorized only to trade on your behalf, not to withdraw your funds to arbitrary addresses.</Text>
                </TextWrapper>
                <FlexRow alignItems="center">
                  <FlexItem flex="1">
                    <h3>
                      Browser Address
                    </h3>
                  </FlexItem>
                  <RequestConfirmationCheck
                    checked={browserWallet.requestConfirm}
                    onChange={handleToggleRequestConfirm}
                  >
                    Request confirmation
                  </RequestConfirmationCheck>
                </FlexRow>
                <FlexRow alignItems="center">
                    <FlexItem flex="1">
                      <GRANTTEXT>{browserWallet.address}</GRANTTEXT>
                    </FlexItem>
                    <Button icon="cross" intent="danger" minimal onClick={() => handleToggleRevokeModal(browserWallet.address)} />
                </FlexRow>
              </Wrapper>
          }
          
          {
            (!browserWallet || !browserWallet.address) &&
              <Wrapper>
                <TextWrapper>
                  <Text muted>The private key will be stored in this browser but it will be authorized only to trade on your behalf, not to withdraw your funds to arbitrary addresses.</Text>
                </TextWrapper>
                <h3>
                  Generate Browser Wallet
                </h3>
                <Box>
                  <Flex py={2}>
                    <InputGroup
                      name="passphrase"
                      placeholder="Passphrase (Optional)"
                      onChange={handleChangePassphrase}
                      value={passphrase}
                      fill
                    />
                    <Box pl={3} style={{display: "flex", alignItems: "center"}}>
                      <Help position={Position.BOTTOM}>
                        For better security, you can optionally set a passphrase to encrypt your browser key. 
                        <br /> You'll need to enter it to sign orders if you were inactive for more than 30 minutes.
                      </Help>
                    </Box>
                  </Flex>
                  <Flex py={2} alignItems="center">
                    <FlexItem flex="1">
                      <Flex>
                        <RequestConfirmationCheck
                          checked={browserWallet.requestConfirm}
                          onChange={handleToggleRequestConfirm}
                        >
                          Request confirmation
                        </RequestConfirmationCheck>
                        <Box pl={3} style={{display: "flex", alignItems: "center"}}>
                          <Help position={Position.BOTTOM}>
                            When an order (cancel-order) is about to be signed, it will show a confirmation dialog that display the future operation details.
                          </Help>
                        </Box>
                      </Flex>
                    </FlexItem>
                    <Button
                      intent="primary"
                      text="Generate"
                      onClick={handleAddBrowserWallet}
                    />
                  </Flex>
                </Box>
              </Wrapper>
          }
        </Box>
      )}
    </Spring>
  );
};

const RevokeAuthorizationBox = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
`;

const RevokeAddressModal = (props: *) => {
  const { showRevokeModal, revokeAddress, exchangeAddress, browserWallet, handleRemoveBrowserWallet, handleToggleRevokeModal } = props;
  const revokeBase64Data = btoa(
    JSON.stringify({
      revoke: true,
      address: revokeAddress,
    })
  );

  const link = PROTOCOL + exchangeAddress + '?amount=10000&base64data=' + encodeURIComponent(revokeBase64Data);

  const isBrowserWallet = revokeAddress === browserWallet.address;
  const title = isBrowserWallet ?  'Revoke Browser Wallet' : 'Revoke Authorization';
  const text = `Do you really want to revoke ${isBrowserWallet ? 'browser wallet' : 'authorization'}?`

  const onClickRevoke = () => {
    if (isBrowserWallet) {
      handleRemoveBrowserWallet();
    }
    handleToggleRevokeModal();
  }

  return (
    <Modal
      title={title}
      width="400px"
      icon="info-sign"
      isOpen={showRevokeModal}
      onClose={() => handleToggleRevokeModal()}
    >
      <ModalBody>
        <Text muted>{text}</Text>

        <RevokeAuthorizationBox>
          <a
            onClick={() => {
              onClickRevoke();
            }}
            href={link}
          >
            Revoke
          </a>
        </RevokeAuthorizationBox>
      </ModalBody>
    </Modal>
  );
};

export default WalletInfoRenderer;