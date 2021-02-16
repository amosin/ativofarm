import {useCallback} from 'react'

import useAtivo from './useAtivo'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getAtivoContract,
  getXAtivoStakingContract
} from '../ativo/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const lpContract = getAtivoContract(ativo)
  const contract = getXAtivoStakingContract(ativo)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
