// @flow
import React from 'react';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

import { Box } from '../../components/Common';

import { Devices } from '../../components/Common/Variables'
import { Spring } from 'react-spring'

import type { Address } from '../../types/common'

type Props = {
  authenticated: bool
}

type State = {
}

class SettingsPage extends React.PureComponent<Props, State> {
  state = {
  };

  render() {

    if (!this.props.authenticated) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <Spring from={{ opacity: 0 }} to= {{ opacity: 1}} >
      {props =>
        <Box style={props}>
          {/* {<WalletSettingsFormBox p={2} pt={3}>
            <WalletSettingsForm wallets={wallets} removeWallet={this.removeWallet} />
          </WalletSettingsFormBox>
          <SignerSettingsFormBox p={2} pb={3}>
            <SignerSettingsForm />
          </SignerSettingsFormBox>} */}
        </Box>
      }
      </Spring>
    );
  }
}

const WalletSettingsFormBox = styled(Box)`
  width: 500px;
  
  @media ${Devices.mobileL} {
    width: 100%;
  }
`

const SignerSettingsFormBox = styled(Box)`
  width: 500px;

  @media ${Devices.mobileL} {
    width: 100%;
  }
`

export default SettingsPage;
