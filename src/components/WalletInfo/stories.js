// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import WalletInfoRenderer from './WalletInfoRenderer';
import WalletInfo from './WalletInfo';
import { Card } from '@blueprintjs/core';

storiesOf('Wallet Info', module)
  .addDecorator(withKnobs)
  .add(
    'Wallet Info (Default)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfo 
            accountAddress="0x1" 
            gbyteBalance={20} 
            listedTokens={["0x3", "0x4"]}
            userTokens={["0x3", "0x4"]}
            registeredTokens={["0x3", "0x4"]}
            detectToken={action("detectToken")}
            addToken={action("addToken")}
            registerToken={action("registerToken")}
            recentTransactions={[]}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Portfolio)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer
            isModalOpen={false}
            accountAddress="0x1"
            balance={20}
            accountExplorerUrl=""
            selectedTab="Portfolio"
            asset=""
            tokenSymbol=""
            tokenExplorerUrl=""
            recentTransactions={[]}
            addTokenPending={false}
            registerTokenPending={false}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsListed={false}
            tokenIsRegistered={false}
            handleChangeTab={action("handleChangeTab")}
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleModalClose={action("handleModalClose")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            recentTransactions={[]}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer 
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset=""
            tokenSymbol=""
            tokenExplorerUrl=""
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsListed={false}
            tokenIsRegistered={false}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token - Contract Detected)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer 
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsListed={false}
            tokenIsRegistered={false}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
    .add(
    'Wallet Info Renderer (Add Token - Contract Detected - Token added/registered/listed)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer 
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={true}
            tokenIsListed={true}
            tokenIsRegistered={true}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token - Contract Detected - Token not added/registered/not listed)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsListed={false}
            tokenIsRegistered={true}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token - Contract Detected - Token not added/not registered/not listed)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsListed={false}
            tokenIsRegistered={false}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token - Contract Detected - Token  added/not registered/not listed)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={true}
            tokenIsRegistered={false}
            tokenIsListed={false}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )
  .add(
    'Wallet Info Renderer (Add Token - Contract Detected - Token  not added/registered/not listed)',
    withInfo({ source: false })(() => (
      <Card className="bp3-dark">
        <WalletInfoRenderer
            isModalOpen={false}
            handleModalClose={action("handleModalClose")}
            accountAddress="0x1"
            balance={20}
            handleChangeTab={action("handleChangeTab")}
            selectedTab="Add Token"
            asset="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            tokenSymbol="USDC"
            tokenExplorerUrl="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            handleChangeAsset={action("handleChangeAsset")}
            handleDetectToken={action("handleDetectToken")}
            handleAddToken={action("handleAddToken")}
            handleRegisterToken={action("handleRegisterToken")}
            assetStatus=""
            tokenIsAdded={false}
            tokenIsRegistered={true}
            tokenIsListed={false}
            recentTransactions={[]}
            accountExplorerUrl=""
            addTokenPending={false}
            registerTokenPending={false}
        />
      </Card>
    ))
  )



