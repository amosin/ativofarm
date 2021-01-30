import React, { useState } from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import LanguageButton from './components/LanguageButton';
import Button from './../Button/Button';
import { useIntl } from 'react-intl'
import { KEYS } from '../../i18n'
import { NavLink } from 'react-router-dom'

const TopBar = () => {
  const [IsMenuHidden, setIsMenuHidden] = useState(true);
  const intl = useIntl();

  const handleMenuClick = () => setIsMenuHidden(!IsMenuHidden);

  const menuActions = (): JSX.Element => (
    <>
      <StyledNav>
        <StyledLink exact activeClassName="active" to="/">
          {intl.formatMessage({ id: KEYS.HOME })}
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/farms">
          {intl.formatMessage({ id: KEYS.MENU })}
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/about">
          {intl.formatMessage({ id: KEYS.ABOUT })}
        </StyledLink>
      </StyledNav>
      <StyledAccountButtonWrapper>
        <AccountButton />
        <StyledTopGear>
          <Button size="sm">
            <LanguageButton />
          </Button>
        </StyledTopGear>
      </StyledAccountButtonWrapper>
    </>
  )

  return (
    <StyledTopBar>
      <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '3px' }}>{intl.formatMessage({ id: KEYS.TESTNET_ALERT })}</div>

      <StyledTopBarInner>
        <Container size="lg" spacing={0}>
          <StyledTopBarInner>
            <div style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
              <StyledLogoWrapper>
                <Logo />
              </StyledLogoWrapper>
              <StyledBurgerMenu>
                <button type="button" onClick={handleMenuClick}>
                  <StyledSvg>
                    {!IsMenuHidden ? (
                      <path
                        height="8.0556vw"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                        <path
                        height="8.0556vw"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                  </StyledSvg>
                </button>
              </StyledBurgerMenu>
            </div>
            {<StyledMenuActions> {menuActions()} </StyledMenuActions>}
            <StyledMenuActionsMobile>{!IsMenuHidden && menuActions()}</StyledMenuActionsMobile>
          </StyledTopBarInner>
        </Container>
      </StyledTopBarInner>
    </StyledTopBar>
  )
}

const StyledMenuActions = styled.div`
  display: inline-flex;
  @media (max-width: 660px) {
    display: none;
  }
`

const StyledMenuActionsMobile = styled.div`
  @media (min-width: 660px) {
    display: none;
  }
`

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 660px) {
    flex-direction: column;
    margin: 5px;
  }
`

const StyledLink = styled(NavLink)`
  color: #a1a1a7;
  font-weight: 700;
  display: block;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[100]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledLogoWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  @media (max-width: 400px) {
    width: auto;
  }
`
const StyledBurgerMenu = styled.div`
  margin-left: 160px;
  @media (min-width: 660px) { // raise this
      display: none;
  }
`
const StyledSvg = styled.svg`
 width: 1.5rem;
 height: 1.5rem;
 fill: currentColor;
`

const StyledTopBar = styled.div``

const StyledTopGear = styled.div`
  margin: 2px;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  width: 100%;
  background-color: #152b44;
  padding: 0px;
  @media (max-width: 660px) {
    justify-content: center;
    flex-direction: column;
    width: auto;
    height: auto;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: 660px) {
    justify-content: center;
    width: auto;
    margin-top: 10px;
    margin-bottom: 5px;
  }
`
export default TopBar