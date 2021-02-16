import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getAtivoFarmContract, getFarms } from '../ativo/utils'
import useAtivo from './useAtivo'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const farms = getFarms(ativo)
  const ativoFarmContract = getAtivoFarmContract(ativo)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(ativoFarmContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, ativoFarmContract, ativo])

  useEffect(() => {
    if (account && ativoFarmContract && ativo) {
      fetchAllBalances()
    }
  }, [account, block, ativoFarmContract, setBalance, ativo])

  return balances
}

export default useAllEarnings
