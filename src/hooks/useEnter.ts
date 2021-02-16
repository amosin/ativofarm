import {useCallback} from 'react'

import useAtivo from './useAtivo'
import {useWallet} from 'use-wallet'

import {enter, getXAtivoStakingContract} from '../ativo/utils'

const useEnter = () => {
  const {account} = useWallet()
  const ativo = useAtivo()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXAtivoStakingContract(ativo),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ativo],
  )

  return {onEnter: handle}
}

export default useEnter
