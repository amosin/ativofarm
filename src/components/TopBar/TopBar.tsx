import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '3px'}}>This is a project on testnet. There is no ATIVO token yet. Do not get scammed.</div>

      <StyledTopBarInner>
        <Container size="lg" spacing={0}>
          <StyledTopBarInner>
            <StyledLogoWrapper>
              <Logo />
            </StyledLogoWrapper>
            <Nav />
            <StyledAccountButtonWrapper>
              <AccountButton />
            </StyledAccountButtonWrapper>
          </StyledTopBarInner>
        </Container>
      </StyledTopBarInner>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 260px;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.color.grey[200]};
  padding: 0px;
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`
export default TopBar
