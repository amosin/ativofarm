import React from 'react'
import styled from 'styled-components'
import ativoLogo from '../../assets/img/ativoCoinSmaller.png'
import coins from '../../assets/img/coins.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { KEYS } from '../../i18n'
import { useIntl } from 'react-intl'

const Home: React.FC = () => {
  const intl = useIntl();
  return (
    <Page>
      <PageHeader
        icon={<img src={ativoLogo} height={120} />}
        title={intl.formatMessage({ id: KEYS.HOME_TITLE })}
        subtitle={intl.formatMessage({ id: KEYS.HOME_SUBTITLE })}
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b> : {intl.formatMessage({ id: KEYS.TIP })}
      </StyledInfo>
      <Spacer size="lg" />
      <StyledFarmsButton>
          <Button text="See Farming pools" to="/farms">
              <img src={coins} style={{height: 20, marginRight: 10}} alt="coins-logo"/>
          </Button>
      </StyledFarmsButton>
    </Page>
  )
}

const StyledFarmsButton = styled.div`
  margin: '0 auto',
`

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