import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getAtivoFarmContract } from '../ativo/utils'
import useAtivo from './useAtivo'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(ativoFarmContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, ativo])

  useEffect(() => {
    if (account && ativo) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, ativo])

  return balance
}

export default useStakedBalance
