// @flow
import React from 'react'
import styled from 'styled-components'
import { Button , ModalBody, ModalFooter, Header, FlexRow, FlexColumn, Text, Link } from '../../Common'
import Modal from '../../Modal'
import { DISCORD_URL, MEDIUM_URLS } from '../../../config/urls'


import { Callout, Checkbox, Tabs, Tab } from '@blueprintjs/core'

type Props = {
  step: string,
  goToSecondStep: void => void,
  goToThirdStep: void => void,
  userHasBytes: boolean,
  GBYTEBalance: number,
  address: string,
  showHelpModalChecked: boolean,
  toggleShowHelpModalCheckBox: void => void,
  currentTab: string,
  handleChangeTab: string => void, 
}

const FirstStep = (props: Props) => {
  const { currentTab, handleChangeTab } = props;
  return (
    <React.Fragment>
      <SideMenu ml={3} mt={3}>
        <Button
          my={1}
          text="Get Started"
          onClick={() => handleChangeTab('default')}
          active={currentTab === 'default'}
          intent={currentTab === 'default' ? 'primary' : 'none'}
        />
        <Button
          my={1}
          text="Basics"
          onClick={() => handleChangeTab('basics')}
          active={currentTab === 'basics'}
          intent={currentTab === 'basics' ? 'primary' : 'none'}
        />
        <Button
          my={1}
          text="Security"
          onClick={() => handleChangeTab('security')}
          active={currentTab === 'security'}
          intent={currentTab === 'security' ? 'primary' : 'none'}
        />
        {/* <Button
          my={1}
          text="How to trade"
          onClick={() => handleChangeTab('startTrading')}
          active={currentTab === 'startTrading'}
          intent={currentTab === 'startTrading' ? 'primary' : 'none'}
          // intent={currentTab === "startTrading" && "primary"}
        /> */}
        
        <Button
          my={1}
          text="Community/News"
          onClick={() => handleChangeTab('news')}
          active={currentTab === 'news'}
          intent={currentTab === 'news' ? 'primary' : 'none'}
          // intent={currentTab === "news" && "primary"}
        />
      </SideMenu>
      <Tabs selectedTabId={currentTab}>
        <Tab id="default" panel={<GetStartedSectionRenderer {...props} />} />
        <Tab id="basics" panel={<BasicsSectionRenderer {...props} />} />
        <Tab id="security" panel={<SecuritySectionRenderer {...props} />} />
        <Tab id="news" panel={<NewsSectionRenderer {...props} />} />
        <Tab id="startTrading" panel={<StartTradingContentRenderer {...props} />} />
      </Tabs>
    </React.Fragment>
  );
};

const GetStartedSectionRenderer = (props: Props) => {
  const {
    goToSecondStep,
    goToThirdStep,
    showHelpModalChecked,
    toggleShowHelpModalCheckBox
  } = props

  return (
    <React.Fragment>
      <ModalBody>
        <ModalText>
        <Callout intent='warning' >
        Please take some time to read the below information before you start trading
        </Callout>
        <br />
        <Header>Welcome</Header>
        <p>• ODEX is an open-source decentralized cryptocurrency exchange for Obyte tokens.</p>
        <p>• All trades and other operations are executed by an Autonomous Agent strictly according to a program associated with the AA. The program is open-source, published on the Obyte DAG, and nobody can change it or intervene with its operation.</p>
        <p>
          • Trades performed on ODEX are immediately settled on the Obyte DAG. For better performance and UX,
          the orderbook is kept off-chain and can be shared by multiple exchanges built on ODEX technology.
        </p>
        <p>• We do not control your account and therefore cannot help you recover your funds if you send them to the wrong address or lose your private key. 
        You are fully responsible for your security.</p>
        <br />
        <Header>🛡️ Security advice</Header>
        <p>• Verify that you are on https://odex.ooo everytime you log in</p>
        <p>• We recommend to use Obyte Wallet for the most secure trading experience</p>
        <p>• We do not control your account and therefore cannot help you recover your funds if you send them to the wrong address or lose your private key. You are fully responsible for your security.</p>
        <p>• Only invest and trade what you can afford to risk</p>
        <br />
        <Header>❔ Ask for help or join the ODEX community</Header>
        <p>• If you have any suggestions, or want to get involved with the project, join us on <a href={DISCORD_URL}>Obyte Discord</a> in #odex channel.</p>
        <br />
        </ModalText>
      </ModalBody>
      <ModalFooter>
        <FooterBox>
          <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
            Do not show again
          </Checkbox>
          <div>
            <Button onClick={goToThirdStep}>Skip</Button>
            <Button onClick={goToSecondStep} intent='primary'>
              I understand. Let's get started!
            </Button>
          </div>
        </FooterBox>
      </ModalFooter>
    </React.Fragment>
  )
}

const SecuritySectionRenderer = (props: Props) => {
  const { showHelpModalChecked, toggleShowHelpModalCheckBox } = props;

  return (
    <React.Fragment>
      <ModalBody>
        <ModalText>
          <Callout intent="warning">
            Please take some time to read the information below before you start trading
          </Callout>
          <br />
          <Header>Stay secure</Header>
            <p>• Verify that you are on https://odex.ooo everytime you log in.</p>
            <p>• We recommend to use Obyte Wallet for the most secure trading experience.</p>
            <p>• We cannot recover your funds or freeze your account if you visit a phising ite or lose your private key.</p>
            <p>• All transactions on the DAG are irreversible. We cannot undo a transaction you've just sent. </p>
            <p>• Never disclose your wallet seed, private keys, backups, or other authentication elements of your Obyte wallet to anyone.</p>
            <p>• Be diligent to keep your Obyte wallet safe.</p>
          <br />        
          <Header>Scams and Hacks</Header>
          <p>• Do not store your wallet seed unencrypted in Dropbox, Google Drive or other cloud storage. If that account is compromised, your funds will be stolen.</p>
          <p>• If you log in to a phishing website, they might trick you to sending a fake "deposit" to their address. </p>
          <p>• Do not trust messages or links sent to you randomly via email, Slack, Discord, Reddit, Twitter, etc.</p>
          <p>• Always navigate directly to a site before you enter information. Do not enter information after clicking a link
            from a message or email. </p>
          <p>• Do not run remote-access software (Teamviewer).</p>
          <p>• Do not click on advertisements.</p>
          <br />
          <Header>Technology Risks</Header>
          <p>• Distributed ledgers is a new emergent technology, therefore bugs, security vulnerabilities, hacks, and downtimes are never excluded.</p>
          <br />
          <Header>Financial Risks</Header>
          <p>• Only invest and trade what you can afford to lose.</p>
          <p>• Obyte tokens are highly volatile.</p>
          <p>• Obyte token values are strictly determined by the value market participants place on them through their transactions, which means 
          a loss of confidence may lead to an abrupt drop in value. </p>
          <br />
        </ModalText>
      </ModalBody>
      <ModalFooter>
        <FooterBox>
          <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
            Do not show again
          </Checkbox>
        </FooterBox>
      </ModalFooter>
    </React.Fragment>
  );
};

const NewsSectionRenderer = (props: Props) => {
  const { toggleShowHelpModalCheckBox, showHelpModalChecked } = props;

  return (
    <React.Fragment>
      <ModalBody>
        <ModalText>
          <Callout>
            The latest news on everything ODEX
          </Callout>
          <br />
          <Link url={MEDIUM_URLS.ODEX_INTRODUCTION}>
            <Header>🛸 Quick Introduction to the ODEX decentralized exchange</Header>
          </Link>
          <p>A quick introduction to the ODEX decentralized and everything you can do with it.</p>


          <Header mt={5}>❔ Ask for help or join the ODEX community</Header>
          <p>• If you have any suggestions, or want to get involved with the project, join us on <Link url={DISCORD_URL}>Discord</Link>, channel #odex.</p>
          <p>• If you'd like to contribute to ODEX and make it better, or run your own ODEX based exchange, see our <Link url="https://github.com/byteball/odex-wallet">Github</Link>.</p>
        </ModalText>
      </ModalBody>
      <ModalFooter>
        <FooterBox>
          <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
            Do not show again
          </Checkbox>
        </FooterBox>
      </ModalFooter>
    </React.Fragment>
  );
}

const BasicsSectionRenderer = (props: Props) => {
  const { toggleShowHelpModalCheckBox, showHelpModalChecked } = props;

  return (
    <React.Fragment>
      <ModalBody>
        <ModalText>
          <br />
          <Header>Where can I get Bytes ?</Header>
          <p>Buy Bytes on exchanges listed on <Link url="https://obyte.org/#exchanges">Obyte website</Link>. <Link url="https://global.bittrex.com/Market/Index?MarketName=BTC-GBYTE">Bittrex</Link> is currently the most liquid exchange trading Bytes.</p>
          <br />
          <Header>What happens when I deposit my coins to ODEX ?</Header>
          <p>Your coins are stored on ODEX Autonomous Agent and you can withdraw them at any time. Nobody but you has access to these coins, only you can send orders to exchange one token for another. </p>
          <br />
        </ModalText>
      </ModalBody>
      <ModalFooter>
        <FooterBox>
          <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
            Do not show again
          </Checkbox>
        </FooterBox>
      </ModalFooter>
    </React.Fragment>
  );
};

const StartTradingContentRenderer = (props: Props) => {
  const { toggleShowHelpModalCheckBox, showHelpModalChecked } = props;

  return (
    <React.Fragment>
      <ModalBody>
        <ModalText>
          <Callout intent="warning">
            Start trading
          </Callout>
          <br />
          <Header>What is ODEX ?</Header>
          <p>• ODEX is an open-source decentralized cryptocurrency exchange for Obyte tokens.</p>
          <p>• All trades and other operations are executed by an Autonomous Agent strictly according to a program associated with the AA. The program is open-source, published on the Obyte DAG, and nobody can change it or interveve with its operation.</p>
          <p>
            • Trades performed on ODEX are immediately settled on the Obyte DAG. For better performance and UX,
            the orderbook is kept off-chain and can be shared by multiple exchanges built on ODEX technology.
          </p>
          <br />
          <Header>Security advice</Header>
          <p>• Verify that you are on https://odex.ooo everytime you log in.</p>
          <p>• We recommend to use Obyte Wallet for the most secure trading experience.</p>
          <p>
            • We do not control your account and therefore cannot help you recover your funds if you send them to the
            wrong address or lose your private key. You are fully responsible for your security.
          </p>
          <p>• Only invest and trade what you can afford to risk.</p>
          <br />
        </ModalText>
      </ModalBody>
      <ModalFooter>
        <FooterBox>
          <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
            Do not show again
          </Checkbox>
        </FooterBox>
      </ModalFooter>
    </React.Fragment>
  );
};




const SideMenu = styled(FlexColumn)``;

const ModalContent = styled(FlexRow)``;

const ModalText = styled.div`
  overflow-y: scroll;
  max-height: 400px;
`

const FooterBox = styled.div`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
`

export default FirstStep
