import React from 'react'
import styled from 'styled-components'
import ativoLogo from '../../assets/img/logo-ativo.webp'
import Button from '../../components/Button'
import coins from '../../assets/img/coins.png'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import { useIntl } from 'react-intl';
import { KEYS } from '../../i18n'

const About: React.FC = () => {
  const intl = useIntl();
  return (
    <Page>
      <PageHeader
        icon={<img src={ativoLogo} height={120} />}
        title={intl.formatMessage({ id: KEYS.ABOUT_TITLE })}
      />
      <Spacer size="lg" />
      <StyledInfo>
        <b>Who are we ? </b> : {intl.formatMessage({ id: KEYS.ABOUT_TEXT })}
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="See Farming pools" to="/farms">
              <img src={coins} style={{height: 20, marginRight: 10}} alt="coins-logo"/>
          </Button>
      </div>
    </Page>
  )
}

const StyledInfo = styled.div`
  color: #cccccc;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  max-width: 800px;
  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default About