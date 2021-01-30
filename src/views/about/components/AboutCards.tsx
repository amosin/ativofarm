import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import { useIntl } from 'react-intl'
import { KEYS } from '../../../i18n'

const AboutCards: React.FC = () => {
  const intl = useIntl();
  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <Label text="" />
          <Value
            value="DeFI Forum 🗣"
          />
        </CardContent>
        <Footnote>
        <Button size="sm" text={intl.formatMessage({ id: KEYS.TAKE_ME_THERE })} to="/social"></Button>
        </Footnote>
      </Card>
      
      <Spacer />

      <Card>
        <CardContent>
          <Label text="" />
          <Value
            value={intl.formatMessage({ id: KEYS.MORE_ATIVO_DOCUMENTATION })}
          />
        </CardContent>
        <Footnote>
        <Button size="sm" text={intl.formatMessage({ id: KEYS.LEARN_MORE })} href="https://docs.ativo.finance"></Button>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default AboutCards