import { TokenSavingDataType } from '@/types/site'
import React, { useState } from 'react'
import WithdrawToken from './withdraw-token'
import AddToken from './add-token'


const Token = ({tokenAddress, tokenBalance, saveDuration, timeSaved, tokenRewards }: TokenSavingDataType) => {
    const [openAdd, setOpenAdd] = useState(false)
    const [openWithdraw, setOpenWithdraw] = useState(false)


    const tokenSymbol = "USDT" // get token name and symbol

    const timeRemaining = timeSaved - saveDuration

    const handleAddToSavings = () => {
        setOpenWithdraw(false)
        setOpenAdd(true)
    }

    const handleWithdrawToken = () => {
        setOpenAdd(false)
        setOpenWithdraw(true)
    }
    

  return (
    <div className={"z-[-1] grid grid-cols-12 gap-4 rounded-lg p-4 pt-12 relative bg-stone-950 overflow-hidden mb-4"}>
        <div className="absolute top-0 left-0 rounded-br-lg bg-red-600 px-4 py-1.5 text-sm z-index-[-1]">
            {tokenSymbol}
        </div>
        
        <div className=' col-span-6 sm:col-span-4'>
            <h4 className='text-3xl font-semibold mb-[4px]'>{tokenBalance} {tokenSymbol}</h4>
            <div className='uppercase text-[10px]'>saved</div>
        </div>

        <div className=' col-span-6 sm:col-span-4'>
            <h4 className='text-normal  mb-2'>{timeRemaining} days left.</h4>
            <div className='text-normal '>{tokenRewards} PGY EARNED</div>
        </div>

        <div className=' col-span-12 sm:col-span-4 flex justify-between'>
            <button className='btn btn-contained btn-small' onClick={handleAddToSavings}>Add</button>
            <button className='btn btn-contained btn-small' onClick={handleWithdrawToken}>Withdraw</button>
        </div>

        {openAdd && <AddToken tokenAddress={tokenAddress} />}
        {openWithdraw && <WithdrawToken tokenAddress={tokenAddress} />}
    </div>
  )
}

export default Token