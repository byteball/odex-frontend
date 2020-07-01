import React from 'react';
import Colors from './Colors';
import styled from 'styled-components';
import Indent from './Indent'
import odexLogo from '../../assets/odex_logo_black.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '../Common/Icons/faTwitter'
import { faDiscord } from '../Common/Icons/faDiscord'
import { faGithub } from '../Common/Icons/faGithub'
import { faYoutube } from '../Common/Icons/faYoutube'
import { faFacebook } from '../Common/Icons/faFacebook'
import { faMedium } from '../Common/Icons/faMedium'

import {
  Box
} from './Box'

import {
  Devices
} from './Variables'


const Footer = () => (
  <Wrapper>
    <Container>
      <TopSection>
        <LogosWrapper>
        <img src={odexLogo} className="Profile-image"  height="120" alt=""/>
        <FooterText mt={3}>
            <FooterSatoshiQuote>"03/Jan/2009 Chancellor on brink of second bailout for banks"</FooterSatoshiQuote>
            <FooterFirstBlock>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa in Block 1</FooterFirstBlock>
        </FooterText>
        </LogosWrapper>
        <LinksWrapper className="content">
          <List hideOnMobile>
            <HeadListItem>About</HeadListItem>
            <NormalListItem>
                <LinkText
                    href="https://obyte.org/" 
                    target="_blank"
                    rel="noopener"
                    >
                    Obyte
                </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                  href="https://medium.com/obyte/whats-next-for-obyte-a-decentralized-exchange-fd7164569a9d" 
                  target="_blank"
                  rel="noopener"
                >
                  ODEX
              </LinkText>
            </NormalListItem>
            {/* {<NormalListItem>
              <LinkText
                  href="#terms" 
                >
                  Terms
              </LinkText>
            </NormalListItem>} */}
          </List>
          <List hideOnMobile>
            <HeadListItem>Dapps</HeadListItem>
            <NormalListItem>
              <LinkText
                  href="https://ostable.org" 
                  target="_blank"
                  rel="noopener"
                >
                  Stablecoins
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                  href="" 
                  target="_blank"
                  rel="noopener"
                  >
                  Prediction markets
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                  href="https://tokens.ooo" 
                  target="_blank"
                  rel="noopener"
                >
                  Token registry
              </LinkText>
            </NormalListItem>
          </List>
          <List>
            <HeadListItem>Links</HeadListItem>
            <NormalListItem>
              <LinkText
                href="https://twitter.com/obyteorg" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
                <Indent />
                Twitter
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                href="https://discord.obyte.org" 
                target="_blank"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faDiscord} />
                <Indent />
                Discord
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                href="https://www.facebook.com/obyte.org" 
                target="_blank"
                rel="noopener noreferrer"
                >
                <FontAwesomeIcon icon={faFacebook} />
                <Indent />
                Facebook
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                href="https://medium.com/obyte" 
                target="_blank"
                rel="noopener"
                >
                <FontAwesomeIcon icon={faMedium} />
                <Indent />
                Medium
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                href="https://github.com/byteball/odex-wallet" 
                target="_blank"
                rel="noopener"
                >
                <FontAwesomeIcon icon={faGithub} />
                <Indent />
                Github
              </LinkText>
            </NormalListItem>
            <NormalListItem>
              <LinkText
                href="https://www.youtube.com/channel/UCYAjbxT5zHfeTtXe_hr9Gxg" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />            
                <Indent />
                Youtube
              </LinkText>
            </NormalListItem>
          </List>
          <List>
            <HeadListItem>Contact</HeadListItem>
            <NormalListItem>
              <LinkText
                href="https://discord.obyte.org" 
                target="_blank"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faDiscord} />
                <Indent />
                Discord
              </LinkText>
            </NormalListItem>
            <NormalListItem />
          </List>
        </LinksWrapper>
      </TopSection>
    </Container>
  </Wrapper>
);
export default Footer;

const Wrapper = styled.div.attrs({
  className: 'footer',
})`
  background-color: ${Colors.DARK_GRAY4};
  width: 100%;
  color: ${Colors.LIGHT_GRAY5};
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 0 0 rgba(16, 22, 26, 0), 0 -1px 1px rgba(16, 22, 26, 0.4);
`;

const Container = styled.div`
  width: 80%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media ${Devices.laptop} {
    width: 100%;
  }
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px 0px 30px;
  margin-bottom: 15px;

  @media ${Devices.laptop} {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const LogosWrapper = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LinksWrapper = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;

  @media ${Devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const List = styled.ul`

  @media ${Devices.mobileL} {
    display: flex;
    flex-direction: column;

    align-self: flex-start;
    padding-inline-start: 0px;
  

    ${props => props.hideOnMobile && "display: none;" }
  }
`;

const NormalListItem = styled.li`
  margin: 10px auto;

  @media ${Devices.mobileL} {
    margin: 10px 0px;
    display: flex;
    align-self: flex-start;
  }

`;

const HeadListItem = styled.li`
  color: ${Colors.GRAY2};
`;

const FooterText = styled(Box)`
  
`;

const FooterSatoshiQuote = styled.div`
  color: ${Colors.GRAY5};
  font-size: 12px;
  text-align: center;
`

const FooterFirstBlock = styled.div`
  width: 370px;
  color: ${Colors.GRAY1};
  font-size: 10px;
  text-align: right;
`;

const LinkText = styled.a`
`;
