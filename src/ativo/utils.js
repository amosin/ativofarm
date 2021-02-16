import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getAtivoFarmAddress = (ativo) => {
  return ativo && ativo.ativoFarmAddress
}
export const getAtivoAddress = (ativo) => {
  return ativo && ativo.ativoAddress
}
export const getWethContract = (ativo) => {
  return ativo && ativo.contracts && ativo.contracts.weth
}

export const getAtivoFarmContract = (ativo) => {
  return ativo && ativo.contracts && ativo.contracts.ativoFarm
}
export const getAtivoContract = (ativo) => {
  return ativo && ativo.contracts && ativo.contracts.ativo
}

export const getXAtivoStakingContract = (ativo) => {
  return ativo && ativo.contracts && ativo.contracts.xAtivoStaking
}

export const getFarms = (ativo) => {
  return ativo
    ? ativo.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'ATIVO',
          earnTokenAddress: ativo.contracts.ativo.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (ativoFarmContract, pid) => {
  const { allocPoint } = await ativoFarmContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await ativoFarmContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (ativoFarmContract, pid, account) => {
  return ativoFarmContract.methods.pendingAtivo(pid, account).call()
}

export const getTotalLPWethValue = async (
  ativoFarmContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that ativoFarmContract owns
  const balance = await lpContract.methods
    .balanceOf(ativoFarmContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(ativoFarmContract, pid),
  }
}

export const approve = async (lpContract, ativoFarmContract, account) => {
  return lpContract.methods
    .approve(ativoFarmContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getAtivoSupply = async (ativo) => {
  return new BigNumber(await ativo.contracts.ativo.methods.totalSupply().call())
}

export const getXAtivoSupply = async (ativo) => {
  return new BigNumber(await ativo.contracts.xAtivoStaking.methods.totalSupply().call())
}

export const stake = async (ativoFarmContract, pid, amount, account) => {
  return ativoFarmContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (ativoFarmContract, pid, amount, account) => {
  return ativoFarmContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (ativoFarmContract, pid, account) => {
  return ativoFarmContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (ativoFarmContract, pid, account) => {
  try {
    const { amount } = await ativoFarmContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (ativoFarmContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return ativoFarmContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
