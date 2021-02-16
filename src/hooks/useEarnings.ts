import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getAtivoFarmContract } from '../ativo/utils'
import useAtivo from './useAtivo'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(ativoFarmContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, ativoFarmContract, ativo])

  useEffect(() => {
    if (account && ativoFarmContract && ativo) {
      fetchBalance()
    }
  }, [account, block, ativoFarmContract, setBalance, ativo])

  return balance
}

export default useEarnings
