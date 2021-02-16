import { useCallback } from 'react'

import useAtivo from './useAtivo'
import { useWallet } from 'use-wallet'

import { unstake, getAtivoFarmContract } from '../ativo/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(ativoFarmContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, ativo],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
