import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useAtivo from '../../../hooks/useAtivo'
import { getAtivoAddress, getAtivoSupply } from '../../../ativo/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import AtivoCoinLogo from '../../../assets/img/ativoCoinSmaller.png'
import { useIntl } from 'react-intl'
import { KEYS } from '../../../i18n'


const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const ativo = useAtivo()
  const ativoBalance = useTokenBalance(getAtivoAddress(ativo))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  const intl = useIntl();

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getAtivoSupply(ativo)
      setTotalSupply(supply)
    }
    if (ativo) {
      fetchTotalSupply()
    }
  }, [ativo, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div>
                <img src={AtivoCoinLogo} height="45" />
              </div>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text={intl.formatMessage({ id: KEYS.BALANCE_TITLE })} />
                <Value
                  value={!!account ? getBalanceNumber(ativoBalance) : intl.formatMessage({ id: KEYS.BALANCE_STATUS })}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
        {intl.formatMessage({ id: KEYS.PENDING_HARVEST })}
          <FootnoteValue>
            <PendingRewards /> ATIVO
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text="Total ATIVO Supply" />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : intl.formatMessage({ id: KEYS.BALANCE_STATUS })}
          />
        </CardContent>
        <Footnote>
        {intl.formatMessage({ id: KEYS.NEW_REWARDS_PER_BLOCK })}
          <FootnoteValue>100 ATIVO</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[100]};
  border-top: solid 1px ${(props) => props.theme.color.grey[200]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
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

export default Balances