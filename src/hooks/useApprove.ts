import { useCallback } from 'react'

import useAtivo from './useAtivo'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getAtivoFarmContract } from '../ativo/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, ativoFarmContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, ativoFarmContract])

  return { onApprove: handleApprove }
}

export default useApprove
