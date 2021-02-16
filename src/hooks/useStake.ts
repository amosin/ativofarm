import { useCallback } from 'react'

import useAtivo from './useAtivo'
import { useWallet } from 'use-wallet'

import { stake, getAtivoFarmContract } from '../ativo/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const ativo = useAtivo()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getAtivoFarmContract(ativo),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, ativo],
  )

  return { onStake: handleStake }
}

export default useStake
