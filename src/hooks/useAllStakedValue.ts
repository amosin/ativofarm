import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getAtivoFarmContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../ativo/utils'
import useAtivo from './useAtivo'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const farms = getFarms(ativo)
  const ativoFarmContract = getAtivoFarmContract(ativo)
  const wethContact = getWethContract(ativo)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            ativoFarmContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, ativoFarmContract, ativo])

  useEffect(() => {
    if (account && ativoFarmContract && ativo) {
      fetchAllStakedValue()
    }
  }, [account, block, ativoFarmContract, setBalance, ativo])

  return balances
}

export default useAllStakedValue
