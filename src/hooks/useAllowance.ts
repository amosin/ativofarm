import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useAtivo from './useAtivo'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getAtivoFarmContract } from '../ativo/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ativo = useAtivo()
  const ativoFarmContract = getAtivoFarmContract(ativo)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      ativoFarmContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, ativoFarmContract, lpContract])

  useEffect(() => {
    if (account && ativoFarmContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, ativoFarmContract, lpContract])

  return allowance
}

export default useAllowance
