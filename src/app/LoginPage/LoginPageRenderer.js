import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled  from 'styled-components'
import { Spring } from 'react-spring'
import ReactGA from 'react-ga'
import QRCode from 'qrcode.react'
import { CHATBOT_URL } from '../../config/urls'

import { 
  Spinner, 
  Button
} from '@blueprintjs/core'

import { 
  Centered, 
  Divider, 
  LargeText, 
  SmallText,
  LinkText, 
  Colors, 
  Flex, 
  Indent,
  FlexRow,
  Box,
  TwitterShareLink,
  Card
} from '../../components/Common'

import {
  Devices
} from '../../components/Common/Variables'


type Props = {
  view: string,
  showLoginMethods: () => void,
  loginWithApp: void => void,
}

const LoginPageRenderer = (props: Props) => {
  const {
    view,
    loginWithApp,
    sessionId,
    showLoginMethods,
  } = props

  const views = {
    loginMethods: (
      <LoginMethodsView
        loginWithApp={loginWithApp}
        sessionId={sessionId}
      />
    ),
    loading: (
      <Centered>
        <Spinner large intent="primary" />
        <Divider />
        <LargeText intent="primary">Logging In ...</LargeText>
      </Centered>
    ),
  }

  return views[view]
}

const LoginMethodsView = (props: Props) => {
  
  const { 
    loginWithApp,
    sessionId,
  } = props

  const link = CHATBOT_URL + sessionId

  const loginWithAppAndGA = () => {

    loginWithApp();

    ReactGA.event({
      category: 'ODEX',
      action: 'Login',
    });

  }

  return (
    <FlexRow p={5} pb={6} justifyContent="space-between">
      <Box />
      <LoginMethodsBox>
          <Centered>
            <h1>
              <FormattedMessage {...messages.loginMethods} />
            </h1>
            <LoginCards>
                <Flex flexDirection="column" width="100%">
                  <Flex flexDirection="column" alignItems="center" py={1}>
                    Click this link or scan the QR code to open your Obyte app and confirm login:<br/><br/>
                    <LargeText><a onClick={loginWithAppAndGA} href={link}>Log in with Obyte app</a><br/></LargeText>
                    <QRCode value={link} level="L" fgColor="#293742" bgColor="#FFFFFF" includeMargin={true} /><br/>
                    <SmallText muted>If you don't have Obyte wallet yet, <a href="https://obyte.org/#download" target="_blank">download it</a>.</SmallText>
                    {/*
                    <StyledButton 
                      onClick={loginWithApp} 
                      large 
                      intent="primary"
                      fill
                    >
                      <FormattedMessage {...messages.obyteapp} />
                    </StyledButton>
                    */}
                  </Flex>
                  {/* {<Flex flexDirection="column" py={1}>
                    <StyledButton onClick={showWalletLoginForm} large intent="primary" fill>
                      <FormattedMessage {...messages.wallet} />
                    </StyledButton>
                    <Flex p={1} justifyContent="flex-end">
                      <LinkText onClick={showCreateWallet}>→ Create a new wallet</LinkText>
                    </Flex>
                  </Flex>*/}
                </Flex>
            </LoginCards>
          </Centered>
      </LoginMethodsBox>
      <Box />
    </FlexRow>
  )
}

export default LoginPageRenderer


const StyledButton = styled(Button)`
  box-shadow: ${"0 3px 20px " + Colors.BLUE1 + "!important;"}
  &hover: {
    background-color: ${Colors.BLUE5}
    box-shadow: ${"0 3px 20px " + Colors.BLUE5 + "!important;"}
  }
`

const WelcomeCard = styled(Card)`
  width: 500px;
`

const LoginMethodsBox = styled(Box)`
  width: 30%;

  @media ${Devices.tablet} {
    width: 60%;
  }

  @media ${Devices.mobileL} {
    width: 100%;
  }
`

const WidgetWrapper = styled.div`
  width: 600px;
  margin: 60px auto;
`;

const Reminder = styled.div``;

const LoginMethodsHeading = styled.h3`
  display: flex;
  justify-content: center;
  padding-top: 1em;
`;

const LoginCards = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AnnouncementMessages = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const WelcomeMessage = styled.div`
  font-size: 40px;
`

const messages = defineMessages({
  announcement: {
    id: 'loginPage.announcement',
    defaultMessage: 'Make sure you are visiting {link} to prevent any phishing attacks.',
  },
  noPlugins: {
    id: 'loginPage.noPlugins',
    defaultMessage: "Never trade more value than you are willing to lose.",
  },
  thisAppIsInBeta: {
    id: 'loginPage.thisAppIsInBeta',
    defaultMessage: "This app is in beta. Please expect a certain amount of bugs for upcoming weeks.",
  },
  exchangeLaws: {
    id: 'loginPage.exchangeLaws',
    defaultMessage: ' To adhere to international securities and exchange laws, ODEX prohibits use of this platform by US residents. By using this platform, you are confirming that you are not excluded from use by this criteria.',
  },
  tokenListing: {
    id: 'loginPage.tokenListing',
    defaultMessage: 'For inquiries about listing your token, contact us at support@proofsuite.com.'
  },
  loginMethods: {
    id: 'loginPage.loginMethodsHeading',
    defaultMessage: 'Log in to ODEX to trade',
  },
  obyteapp: {
    id: 'loginPage.obyteapp',
    defaultMessage: 'Obyte App',
  },
});
