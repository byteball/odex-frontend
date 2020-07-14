// @flow
import React from 'react'
import styled from 'styled-components'
import IdleTimer from 'react-idle-timer'
import { IntlProvider } from 'react-intl'
import { NavLink } from 'react-router-dom'
import Notifier from '../../components/Notifier'
import odexLogo from '../../assets/odex_logo_white.png'
import ConnectionStatus from '../../components/ConnectionStatus'


import { 
  Footer, 
  NavbarHeading,
  NavbarGroup,
  NavbarDivider
   } from '../../components/Common'

import {
  Devices
} from '../../components/Common/Variables'

import { ReferenceCurrencySelect, StandardSelect } from '../../components/SelectMenu'

import {
  Alignment,
  Button,
  Menu,
  Navbar,
  Popover,
  Position
} from '@blueprintjs/core'

import type { 
  Node,
} from 'react'

import type {
  Location
} from '../../types/common'

import type { DisplayMode } from '../../types/account'

export type Props = {
  children?: Node,
  authenticated: boolean,
  accountLoading: boolean,
  address: string,
  locale: string,
  messages: string,
  referenceCurrencies: Array<string>,
  updateReferenceCurrency: void => string,
  currentReferenceCurrency: string,
  displayModes: Array<DisplayMode>,
  currentDisplayMode: DisplayMode,
  updateDisplayMode: void => string,
  queryAppData: void => void,
  location: Location,
  currentPair: string,
  updatePassphrase: string => void,
}

type State = {}

class Layout extends React.PureComponent<Props, State> {

  componentDidMount() {
    this.props.queryAppData()
  }

  onIdle = () => {
    this.props.updatePassphrase('')
  }

  render() {
    const {
      children,
      authenticated,
      locale,
      messages,
      referenceCurrencies,
      currentReferenceCurrency,
      updateReferenceCurrency,
      currentDisplayMode,
      displayModes,
      updateDisplayMode,
      location,
      currentPair
    } = this.props

    const showReferenceCurrency = authenticated
    const showDisplayMode = authenticated
    const showLoginButton = (location !== "/login")

    const menu = (
      <Menu>
        <MenuItem>
          <MenuItemLink to="/logout" icon="log-out">
            Logout
          </MenuItemLink>
        </MenuItem>
      </Menu>
    )

    return (
      // <IntlProvider locale={locale} messages={messages}>
      <IntlProvider locale={locale} >
        <Wrapper>
          <IdleTimer
            onIdle={this.onIdle}
            timeout={1000 * 60 * 30}
            startOnLoad
          />
          <Notifier />
          <Header>
            <Navbar>
              <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>
                  <NavbarHeaderBox>
                    <img src={odexLogo} className="Profile-image" height={25}  alt="ODEX Logo" />
                  </NavbarHeaderBox>
                </NavbarHeading>
                {authenticated && <NavbarLink to="/wallet">Wallet</NavbarLink>}    
                {authenticated && <NavbarLink to="/markets">Markets</NavbarLink>}
                <NavbarLink to={`/trade/${currentPair ? currentPair: ""}`}>Exchange</NavbarLink>
                {false && <NavbarLink to="/settings" hideOnMobile>Settings</NavbarLink>}
                <NavbarLink to="/faq">FAQ</NavbarLink>
                <NavbarDivider hideOnMobile />
                {showReferenceCurrency &&
                  <ReferenceCurrencyBox>
                    <ReferenceCurrencySelect
                      items={referenceCurrencies}
                      item={currentReferenceCurrency}
                      handleChange={(item) => updateReferenceCurrency(item)}
                      type="text"
                    />
                  </ReferenceCurrencyBox>
                }
                {
                  showDisplayMode &&
                  <DisplayModeBox>
                    <StandardSelect
                      items={displayModes}
                      item={currentDisplayMode}
                      handleChange={(item) => updateDisplayMode(item)}
                      type="text"
                    />
                  </DisplayModeBox>
                }                
              </NavbarGroup>
              <NavbarGroup align={Alignment.RIGHT}>
              {!authenticated && <NavbarLink to="/login">Login</NavbarLink>}
              {authenticated && (
                  <React.Fragment>
                    <ConnectionStatusBox>
                      <ConnectionStatus />
                    </ConnectionStatusBox>
                    <Popover content={menu} position={Position.BOTTOM_RIGHT} minimal>
                      <Button icon="key" text="Menu" />
                    </Popover>
                  </React.Fragment>
                )}
              </NavbarGroup>
            </Navbar>
          </Header>
          <MainContent>{children}</MainContent>

          <Footer />
        </Wrapper>
      </IntlProvider>
    )
  }
}

const Wrapper = styled.div.attrs({ className: 'bp3-dark' })`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.header``

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  
`

const NavbarHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media ${Devices.tablet} {
    display: none;
  }
`

const ReferenceCurrencyBox = styled.div`
  @media ${Devices.tablet} {
    display: none;
  }
`

const DisplayModeBox = styled.div`
  margin-left: 10px;

  @media ${Devices.tablet} {
    display: none;
  }
`

const ConnectionStatusBox = styled.div`
  @media ${Devices.tablet} {
    display: none;
  }
`

const NavbarLink = styled(NavLink).attrs({
  activeClassName: 'bp3-active bp3-intent-primary',
  className: 'bp3-button bp3-minimal',
  role: 'button'
})`

    @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && "display: none;"}
  }
`

const MenuItem = styled.li``

const MenuItemLink = styled(NavLink).attrs({
  activeClassName: 'bp3-active bp3-intent-primary',
  className: props => `bp3-menu-item bp3-popover-dismiss bp3-icon-${props.icon}`,
  role: 'button'
})``


export default Layout
