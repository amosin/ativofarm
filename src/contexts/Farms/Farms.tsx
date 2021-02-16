import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useAtivo from '../../hooks/useAtivo'

import { bnToDec } from '../../utils'
import { getAtivoFarmContract, getEarned } from '../../ativo/utils'
import { getFarms } from '../../ativo/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const ativo = useAtivo()
  const { account } = useWallet()

  const farms = getFarms(ativo)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
