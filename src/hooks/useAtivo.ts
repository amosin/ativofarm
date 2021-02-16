import { useContext } from 'react'
import { Context } from '../contexts/AtivoProvider'

const useAtivo = () => {
  const { ativo } = useContext(Context)
  return ativo
}

export default useAtivo
