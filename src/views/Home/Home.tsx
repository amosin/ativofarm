import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import coins from '../../assets/img/coins.png';
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={120} />}
        title="Ativo Finance is Ready"
        subtitle="Stake Uniswap LP tokens to claim your very own ATIVO!"
      />

      {/*<Spacer size={'lg'}/>*/}
      {/*<Spacer size={'lg'}/>*/}
      {/*<Spacer size={'lg'}/>*/}
      {/*<Spacer size={'lg'}/>*/}
      <Container>
        {/*<Card>*/}
          {/*<CardContent>*/}
            {/*<StyledTitle>Ativo Finance is Ready</StyledTitle>*/}
            {/*<StyledSubtitle>Stake Uniswap LP tokens to claim your very own ATIVO!</StyledSubtitle>*/}
          {/*</CardContent>*/}
        {/*</Card>*/}
        {/*<Spacer size={'sm'}/>*/}
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆&nbsp;<b>Pro Tip</b>:  ATIVO-ETH LP token pool yields 4.8x more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button to="/farms" variant="secondary" ><img src={coins} height={17}/>&nbsp;See Farming Pools</Button>
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Home
