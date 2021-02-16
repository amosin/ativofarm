import {useCallback} from 'react'

import useAtivo from './useAtivo'
import {useWallet} from 'use-wallet'

import {leave, getXAtivoStakingContract} from '../ativo/utils'

const useLeave = () => {
  const {account} = useWallet()
  const ativo = useAtivo()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXAtivoStakingContract(ativo),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ativo],
  )

  return {onLeave: handle}
}

export default useLeave
