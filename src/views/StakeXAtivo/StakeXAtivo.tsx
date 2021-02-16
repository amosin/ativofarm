import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useAtivo from '../../hooks/useAtivo'
import {getContract} from '../../utils/erc20'
import UnstakeXAtivo from './components/UnstakeXAtivo'
import StakeAtivo from "./components/StakeAtivo";

import {contractAddresses} from '../../ativo/lib/constants'
import {getXAtivoSupply} from "../../ativo/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";
import { CHAIN_ID } from '../../ativo/lib/constants'

const StakeXAtivo: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xAtivo[CHAIN_ID],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const ativo = useAtivo()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXAtivoSupply(ativo)
      setTotalSupply(supply)
    }
    if (ativo) {
      fetchTotalSupply()
    }
  }, [ativo, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXAtivo
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeAtivo
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xAtivo held relative the weight of the staking. xAtivo can be minted
              by staking Ativo. To redeem Ativo staked plus swap fees convert xAtivo
              back to Ativo. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xATIVO in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXAtivo
