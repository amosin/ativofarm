import { useCallback } from 'react'

import useAtivo from './useAtivo'
import { useWallet } from 'use-wallet'

import { harvest, getAtivoFarmContract } from '../ativo/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(ativoFarmContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, ativo])

  return { onReward: handleReward }
}

export default useReward
