// @flow
import React from 'react';
import TradesTableRenderer from './TradesTableRenderer';
import { EXPLORER_URL } from '../../config/urls'
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core'

import type Trade from '../../types/trades';
import type { TokenPair } from '../../types/tokens';
import type { Node } from 'react'
import type { DisplayMode } from '../../types/account'

type State = {
  selectedTabId: string,
  isOpen: boolean,
};

type Props = {
  authenticated: boolean,
  trades: Array<Trade>,
  userTrades: Array<Trade>,
  currentPair: TokenPair,
  onCollapse: string => void,
  onExpand: string => void,
  onResetDefaultLayout: void => void,
  displayMode: DisplayMode
};

class TradesTable extends React.PureComponent<Props, State> {

  state = {
    selectedTabId: 'Market',
    isOpen: true,
  };

  changeTab = (tabId: string) => {
    this.setState({ selectedTabId: tabId });
  };

  openExplorerLink = (txHash: string) => {
    if (txHash !== "") window.open(`${EXPLORER_URL}#${txHash}`)
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.props.onCollapse('tradesTable')
  };

  expand = () => {
    this.props.onExpand('tradesTable')
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

  

  render() {
    const {
      props: { trades, userTrades, currentPair, authenticated, displayMode },
      state: { selectedTabId, isOpen },
      changeTab,
      toggleCollapse,
      openExplorerLink,
      expand,
      renderContextMenu
    } = this;

    return (
      <TradesTableRenderer
        selectedTabId={selectedTabId}
        currentPair={currentPair}
        onChange={changeTab}
        trades={trades}
        userTrades={userTrades}
        isOpen={isOpen}
        toggleCollapse={toggleCollapse}
        openExplorerLink={openExplorerLink}
        expand={expand}
        onContextMenu={renderContextMenu}
        authenticated={authenticated}
        displayMode={displayMode}
      />
    );
  }
}

export default ContextMenuTarget(TradesTable)
