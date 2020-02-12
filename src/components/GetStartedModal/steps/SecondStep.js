// @flow
import React from 'react'
import styled from 'styled-components'
import { formatNumber } from 'accounting-js'

import { Button, Callout, Slider, Icon, Spinner, Checkbox, InputGroup, ControlGroup } from '@blueprintjs/core'
import SmallTxNotification from '../../SmallTxNotification'

import { 
  ModalBody, 
  ModalFooter,
  FlexColumn,
  FlexRow,
  XLText,
  Colors,
  Box,
  EmphasizedText
} from '../../Common'

import {
  Fonts
} from '../../Common/Variables'

import type { Token } from '../../../types/tokens';
import type { AccountBalance } from '../../../types/accountBalances';

import TokenSuggest from '../../TokenSuggest';
import { PROTOCOL } from '../../../config/urls'
import { EXCHANGE_ADDRESS } from '../../../config/environment'

type Props = {
  step: string,
  goToFirstStep: void => void,
  goToSecondStep: void => void,
  goToThirdStep: void => void,
  balances: { [string]: number },
  tokens: Array<Token>,
  userHasBytes: boolean,
  GBYTEBalance: number,
  address: string,
  showHelpModalChecked: boolean,
  toggleShowHelpModalCheckBox: void => void,
}

const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const FooterActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  `
type State = {
  amount: string,
  token: Token,
  inputToken: ?Token,
  showTokenSuggest: boolean,
};

class SecondStep extends React.PureComponent<Props, State> {

  state = {
    amount: '',
    token: this.props.tokens[0],
    inputToken: null,
    showTokenSuggest: false,
  };

  handleAmountInputChange = (e: SyntheticInputEvent<>) => {
    this.setState({ amount: e.target.value });
  };

  toggleTokenSuggest = () => {
    this.setState({ showTokenSuggest: !this.state.showTokenSuggest });
  };

  handleChangeToken = (e: Object) => {
    this.setState({ inputToken: e });
  };

  handleSubmitChangeToken = async (e: SyntheticEvent<>) => {
    const newToken = this.state.inputToken || this.state.token;
    this.setState({ showTokenSuggest: false, token: newToken });
    // this.subscribe(newToken);
  };

  render() {
    const {
      goToThirdStep,
      userHasBytes,
      GBYTEBalance,
      balances,
      tokens,
      address,
      showHelpModalChecked,
      toggleShowHelpModalCheckBox,
    } = this.props

    const { token } = this.state

    const balance = balances[token.symbol] || 0;
    const amountInSmallestUnits = parseFloat(this.state.amount || 0) * Math.pow(10, token.decimals);



    return (
      <div style={{width: '100%'}}>
        <ModalBody>
          <Callout intent='success' style={{width: '100%'}}>
            You don't have any tokens in your wallet. Send some tokens now or skip this step. 
          </Callout>
          <WaitingFormBox>
            <AmountBox>
              <InputGroup
                type="number"
                placeholder="Amount"
                rightElement={<TokenNameBox>{token.symbol}</TokenNameBox>}
                value={this.state.amount}
                onChange={this.handleAmountInputChange}
              />
            </AmountBox>
            <a href={PROTOCOL+EXCHANGE_ADDRESS+"?asset="+encodeURIComponent(token.asset)+"&amount="+amountInSmallestUnits}>Deposit {this.state.amount} {token.symbol}</a>
            <CurrentBalanceBox>
              (Your current balance is {balance} {token.symbol})
            </CurrentBalanceBox>
            <AnotherTokenBox>
              {this.state.showTokenSuggest ? (
                <ControlGroup>
                  <Button onClick={this.toggleTokenSuggest} text="Cancel" minimal />
                  <TokenSuggest tokens={tokens} token={token} onChange={this.handleChangeToken} />
                  <Button intent="primary" text="Confirm" onClick={this.handleSubmitChangeToken} />
                </ControlGroup>
              ) : (
                <ControlGroup>
                  <Button onClick={this.toggleTokenSuggest} text="Deposit another token" />
                </ControlGroup>
              )}
            </AnotherTokenBox>
          </WaitingFormBox>
        </ModalBody>
        <ModalFooter>
          <FooterBox>
            <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
              Do not show again
            </Checkbox>
            <Button onClick={goToThirdStep}>Next</Button>
          </FooterBox>
        </ModalFooter>
      </div>
    )
  }
}

const SpinnerBox = styled.div`
  padding-top: 40px;
`

const FooterBox = styled.div`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const WaitingFormBox = styled.div`
  margin: auto;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`

const CurrentBalanceBox = styled.div`
  padding-top: 4px;
`

const Address = styled.div`
  padding-top: 40px;
  font-weight: bold;
`



const BalanceText = styled(Box)`
  font-size: ${Fonts.FONT_SIZE_XL + 'px'};
  color: ${props => (props.intent ? Colors[props.intent] : props.muted ? Colors.TEXT_MUTED : Colors.TEXT)}
`

const BalanceValueText = styled(Box)`
  font-size: ${Fonts.FONT_SIZE_XL + 'px'};
  color: ${props => (props.intent ? Colors[props.intent] : props.muted ? Colors.TEXT_MUTED : Colors.TEXT)}
`

const BalanceBox = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AmountBox = styled.div`
  padding-bottom: 20px;
`;

const TokenNameBox = styled.div`
  padding-right: 5px;
  padding-top: 6px;
`;

const AnotherTokenBox = styled.div`
  padding-top: 20px;
`;

export default SecondStep
