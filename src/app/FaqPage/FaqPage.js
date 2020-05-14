import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring'

import { EXCHANGE_ADDRESS } from '../../config/environment'

import { 
  Box, 
  Link,
  Paragraph,
  EmphasizedText
} from "../../components/Common"

import {
  Devices
} from '../../components/Common/Variables'

import FaqItem from './FaqItem';

class FaqPage extends React.PureComponent {
  render() {
    const { match } = this.props;

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => 
      <Container style={props}>
        <h1>ODEX Knowledge Base</h1>
        <FaqGrid>
          <FirstColumn>
          <FaqItem
            question="What is ODEX ?"
            match={match}
          >
            ODEX is a community-owned marketplace and decentralized exchange built on the Obyte DAG.
            ODEX trades are settled directly between the two exchanging parties without any intermediates. We do not 
            hold any funds and have no ability to do so. With ODEX, you can trade any Obyte token whether they
            represent native Obyte tokens or are tethered tokens representing other cryptocurrencies or fiat currencies.
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="What are the fees ?"
            match={match}
          >
            0.1% of traded amount, plus 1,000 bytes (0.000001 GBYTE) per trade. The % fee is charged in the quote currency of the traded pair. For example, when trading
            the GBYTE/USDC pair, the 0.1% fee will be charged in USDC.<br/><br/>

            Deposits are free (but you pay network fees of course), cancels are free, withdrawals cost 10,000 bytes (0.00001 GBYTE).
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="How is ODEX different from an exchange like Binance or Coinbase ?"
            match={match}
          >
            Unlike custodial and centralized exchanges, ODEX team does not hold any funds nor secret keys. You can deposit and withdraw
            your funds immediately and your account can not be compromised by a disgruntled employee or a database hack.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="Will you be adding more features to ODEX?"
            match={match}
          >
            Yes! However remember that we are only operators of this exchange, not the developers.  The exchange is developed by Obyte team and it is fully <a href="https://github.com/byteball/odex-wallet" target="_blank" rel="noopener">open source</a>. Here are some of the things that Obyte team is currently working on:
            <FaqList>
              <FaqListItem>• Improved usability and bug fixes</FaqListItem>
              <FaqListItem>• A mobile version of the site</FaqListItem>
              <FaqListItem>• More tokens pairs including stablecoins, tethered assets and financial instruments (shorts, options)</FaqListItem>
              <FaqListItem>• Prediction Markets</FaqListItem>
              <FaqListItem>• Enhanced charting</FaqListItem>
            </FaqList>
            You can follow the development, send suggestions, and contribute at <a href="https://github.com/byteball/odex-wallet" target="_blank" rel="noopener">Obyte github</a>.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="How do I setup an ODEX account?"
            match={match}
          >
            Getting started with trading on ODEX is easy! If you do not currently have an Obyte wallet, you 
            can go to <a href="https://obyte.org" target="_blank" rel="noopener">obyte.org</a> and click "Download wallet".  Your Obyte address is automatically created when you first start the wallet. 
            <br /><br />
            Once your Obyte wallet is set up, click "Login" button in the upper right corner of this website and you will be offered to confirm login with your Obyte wallet. There are no passwords to remember (and forget), your locally installed or mobile wallet is enough. You have the option to protect the wallet with a passcode for better security.
            <br /><br/>
            Now that you are logged in, you will be redirected to your wallet page. Here is a quick rundown of the basic actions needed
            to start trading:
            <br />
            <FaqList>
              <FaqListItem>• If you do not own any tokens or Bytes, you have to send some Bytes to your wallet.</FaqListItem>
              <FaqListItem>• If you have Bytes in your account and want to trade /GBYTE pairs, you will need to deposit some Bytes into your trading account</FaqListItem>
            </FaqList>
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="Do I need a pre-existing Obyte wallet to use ODEX ?"
            match={match}
          >
            Yes, but it is easy to set up one.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="How do I start trading ?"
            match={match}
          >
            Once you logged in to your ODEX account, you need to deposit some Bytes and/or tokens in order to trade. Click the "Deposit" button on your Wallet page, enter the amount you want to deposit, and your Obyte wallet will open with a prefilled payment, which you need to confirm.<br/><br/>
            
            The funds will be sent to the Autonomous Agent of the exchange. The agent is an autonomous program that stores your and other traders' money, executes trades by moving the funds between the balances of different traders, and allows you to withdraw your money at any time.<br/><br/>

            The agent is not controlled by anybody and cannot do anything it was not programmed to do. Its code is stored on the DAG and can never be changed.<br/><br/>

            Once your deposit is finalized, you can navigate to the trading page and place your first order.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="How fast is ODEX ?"
            match={match}
          >
            While ODEX is a decentralized exchange, it is as fast as its centralized counterparts:
            <FaqList>
              <FaqListItem>
                1) When you place an order, it is immediately added to the orderbook. No transaction is sent at this time (and no fee is paid either), the order is stored off-chain until it is matched or canceled.
              </FaqListItem>
              <FaqListItem>
                2) When you your order is matched, the results of the trade are immediately reflected on the exchange and you can immediately withdraw the tokens you just bought. The trade is later (in a few minutes) committed to the DAG when ODEX sends the two matching orders to the Autonomous Agent of the exchange. At this moment, the trade becomes irreversible.
              </FaqListItem>
              <FaqListItem>
                3) When you cancel your order, it is immediately removed from the orderbook and can no longer be matched against other orders. Canceling doesn't require sending a transaction and is therefore free.
              </FaqListItem>
            </FaqList>
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="How can I cancel an order ?"
            match={match}
          >
            If your order has not been matched yet, you can cancel your order by clicking the cancel button on the Orders table on the trading page. It is free and instant.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="How can I withdraw my money ?"
            match={match}
          >
            Navigate to the Wallet page, click "Withdraw" next to the token you want to withdraw, and enter the withdrawal amount. Your Obyte wallet will open with a prefilled withdrawal request, which you need to confirm.  The withdrawal will be executed within a few minutes.  Withdrawal fee is 10,000 bytes (0.00001 GBYTE).
          </FaqItem>

          <Box p={2} />
          </FirstColumn>

          <SecondColumn>
          <FaqItem
            question="Do I need any special tokens to pay for the exchange fees ?"
            match={match}
          >
            No, contrary to some other decentralized exchange protocols, you do not need any additional tokens (other than Bytes which are necessary to pay for network fees on Obyte) to trade on ODEX.
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="Is ODEX fully decentralized ?"
            match={match}
          >
            ODEX is a hybrid decentralized exchange. We maintain the orderbook and match orders with each other. Trades are then settled on the Obyte chain.
            This model allows us to provide a good user experience along with the benefits of centralized exchanges.
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="Do I have to pay gas fees to cancel an order like on other decentralized exchanges ?"
            match={match}
          >
            No. Contrary to most decentralized exchanges, making and canceling orders on ODEX is free. You only pay the trade fee
            if the order is successfully settled on the Obyte chain.
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="I sent funds to a wrong address."
            match={match}
          >
            Unfortunately, all DAG transactions are irreversible, so if you accidentally send funds to the wrong address, 
            there's nothing we, or anyone else, can do to help you.
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="How long will it take for my order to fill ?"
            match={match}
          >
            The ODEX matching-engine matches orders fast. When your order is matched, the corresponding trade is sent to a queue that will settle the trade
            on the Obyte chain as soon as possible. You will thus receive several messages: 
            <FaqList>
              <FaqListItem>1) An order matched message: Your order was successfully filled or partially filled and the corresponding transaction is waiting to be sent to the Obyte chain.</FaqListItem>
              <FaqListItem>2) An order pending message: The transaction has been sent to the Obyte chain and is currently pending. You can follow the transaction with the given explorer link.</FaqListItem>
              <FaqListItem>3) An order success message: Your order was finalized and settled on the Obyte chain and you have received your tokens.</FaqListItem>
            </FaqList>
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="How does ODEX secure my funds ?"
            match={match}
          >
            Here are some facts about ODEX security: 
            <FaqList>
              <FaqListItem>• We do not hold any of your Bytes or tokens. They are all stored on an Autonomous Agent that operates strictly according to the rules that cannot be changed by anybody, including us.  You can withdraw your funds from the AA at anytime through your Obyte wallet, even if this website goes down. </FaqListItem>
              <FaqListItem>• All ODEX source code can be read at https://github.com/byteball/odex-wallet </FaqListItem>
            </FaqList>
          </FaqItem>
          <Box p={2} />
          <FaqItem
            question="I forgot which address I used to log in to ODEX"
            match={match}
          >
            Check all the accounts in your Obyte wallet. You might have several accounts, switch between them through the burger menu (or swipe right on mobile). In each account's history, look for transcations sent to the exchange's Autonomous Agent address {EXCHANGE_ADDRESS}, such transactions are marked with "To AA" tag.
          </FaqItem>
          
          <Box p={2} />
          <FaqItem
            question="What is a limit order ?"
            match={match}
          >
            A limit order is an order placed to sell or buy a certain amount of tokens at a certain price or better. A limit order is not a market order, and thus may not 
            be executed if the price you've set cannot be met. The order will stay in the orderbook until it is completely filled or canceled.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="Is there API access for automated trading ?"
            match={match}
          >
            Yes!  See API description on <a href="https://github.com/byteball/odex-backend" target="_blank" rel="noopener">github</a>.
          </FaqItem>

          <Box p={2} />
          <FaqItem
            question="Can I run a similar exchange myself ?"
            match={match}
          >
            Absolutely!  You are welcome install a similar exchange using its <a href="https://github.com/byteball/odex-wallet" target="_blank" rel="noopener">open sources</a> and make decentralized, open, and safe trading available to your audience.<br/><br/>  
            
            All ODEX exchanges exchange liquidity among themselves, so you won't start with empty orderbooks. You can be either a matcher and earn a matching fee (0.1% by default) on all orders you match, or you can be an affiliate for other matchers and earn an affiliate fee, or you can be both a matcher and an affiliate. Either way, you set your fees.
          </FaqItem>
          <Box p={2} />
          </SecondColumn>
        </FaqGrid>
      </Container>
      }
      </Spring>
    );
  }
}

const Container = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
`

const FaqList = styled.ul`
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
`

const FaqListItem = styled.li`
  padding-top: 10px;
`

const FaqGrid = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr 1fr;

  @media ${Devices.tablet} {
    grid-template-columns: 1fr;
  }
`;

const FirstColumn = styled.div``

const SecondColumn = styled.div``

export default FaqPage;
