import React from 'react'
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { KEYS } from '../../../i18n';

const Nav: React.FC = () => {
  const intl = useIntl();

  return (
    <StyledNav>
      {/* <StyledLink exact activeClassName="active" to="/">
        {intl.formatMessage({ id: KEYS.HOME })}
      </StyledLink> */}
      <StyledLink exact activeClassName="active" to="/farms">
      {intl.formatMessage({ id: KEYS.MENU })}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/about">
      {intl.formatMessage({ id: KEYS.ABOUT })}
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: #a1a1a7;
  font-weight: 700;
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

export default Nav
