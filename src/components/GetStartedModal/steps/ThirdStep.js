// @flow
import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Intent } from '@blueprintjs/core'
import { ModalFooter, ModalBody, FlexColumn } from '../../Common'
import { DISCORD_URL } from '../../../config/urls'

import { Spring } from 'react-spring'

type Props = {
  step: string,
  goToFirstStep: void => void,
  goToSecondStep: void => void,
  goToThirdStep: void => void,
  userHasBytes: boolean,
  GBYTEBalance: number,
  address: string,
  handleClose: void => void,
  redirectToTradingPage: void => void,
  redirectToFAQPage: void => void,
  showHelpModalChecked: boolean,
  toggleShowHelpModalCheckBox: void => void,
}

const Thirdstep = (props: Props) => {
  const {
    handleClose,
    redirectToTradingPage,
    redirectToFAQPage,
    showHelpModalChecked,
    toggleShowHelpModalCheckBox,
    goToFirstStep
  } = props

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} >
    {animation =>
      <FlexColumn width="100%" style={animation}>
        <ModalBody>
          <Box>
            <h2>You have everything you need to start trading!</h2> 
            <h2>Choose what to do next:</h2>
            <ButtonGroupBox>
              <ButtonBox>
                <Button intent={Intent.PRIMARY} onClick={redirectToTradingPage}>
                  View Trading page
                </Button>
              </ButtonBox>
              <ButtonBox>
                <Button intent={Intent.PRIMARY} onClick={handleClose}>
                  View Portfolio
                </Button>
              </ButtonBox>
              <ButtonBox>
                <Button intent={Intent.PRIMARY} onClick={redirectToFAQPage}>
                  Frequently asked questions
                </Button>
              </ButtonBox>
              <ButtonBox>
                <Button intent={Intent.PRIMARY} onClick={goToFirstStep}>
                  Go back to introduction page
                </Button>
              </ButtonBox>
            </ButtonGroupBox>
            <ContactLinksBox>
              <p>Join our <a href={DISCORD_URL}>Discord</a> channel</p>
            </ContactLinksBox>
          </Box>
        </ModalBody>
        <ModalFooter>
          <FooterBox>
            <Checkbox checked={showHelpModalChecked} onClick={toggleShowHelpModalCheckBox}>
              Do not show again
            </Checkbox>
            <Button onClick={handleClose}>Close</Button>
          </FooterBox>
        </ModalFooter>
      </FlexColumn>
    }
    </Spring>
  )
}

const Box = styled.div`
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  h2 {
    line-height: 24px;
  }
`

const ButtonBox = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const ButtonGroupBox = styled.div`
  margin: auto;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  align-content: center;
`

const FooterBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`

const ContactLinksBox = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Thirdstep
