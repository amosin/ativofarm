import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ativoLogo from '../../assets/img/logo-ativo.webp'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={ativoLogo} height="32" style={{ marginTop: -4 }} />
      <StyledText>
      Ativo.Finance
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Reem Kufi', sans-serif;
  font-size: 20px;
  width: 100%;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    width: 100%;
    display: none;
  }
`

const MasterChefText = styled.span`
  font-family: 'Kaushan Script', sans-serif;
`

export default Logo
