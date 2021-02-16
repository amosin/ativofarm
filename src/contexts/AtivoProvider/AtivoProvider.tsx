import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Ativo } from '../../ativo'

export interface AtivoContext {
  ativo?: typeof Ativo
}

export const Context = createContext<AtivoContext>({
  ativo: undefined,
})

declare global {
  interface Window {
    ativosauce: any
  }
}

const AtivoProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [ativo, setAtivo] = useState<any>()

  // @ts-ignore
  window.ativo = ativo
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const ativoLib = new Ativo(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setAtivo(ativoLib)
      window.ativosauce = ativoLib
    }
  }, [ethereum])

  return <Context.Provider value={{ ativo }}>{children}</Context.Provider>
}

export default AtivoProvider
