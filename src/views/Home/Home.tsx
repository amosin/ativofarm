import React from 'react'
import styled from 'styled-components'
import ativoLogo from '../../assets/img/logo-ativo.webp'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <div style={{display: 'flex'}}>
      <PageHeader
        icon={<img src={ativoLogo} height={120} />}
        title="Ativo Finance is Ready"
        subtitle="Stake Uniswap LP tokens to claim your very own ATIVO!"
      />

      <Container>
        <Balances />
      </Container>
      </div>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b> : ATIVO-ETH LP token pool yields 4.8x more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🔪 See the Menu" to="/farms"/>
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
