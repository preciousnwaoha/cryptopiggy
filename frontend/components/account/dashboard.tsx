import AppContext from '@/context/app-context'
import React, { useContext, useState } from 'react'
import Summary from './summary'
import { USER_TOKENS } from '@/config/dummy'
import Token from './token'
import { formatAddress } from '@/lib/utils'
import { Contract } from 'ethers'
import AddTelos from './add-telos'
import WithdrawTelos from './withdraw-telos'

const Dashboard = () => {
  const appCtx = useContext(AppContext)
  const [openAddTelos, setOpenAddTelos] = useState(false)
  const [openWithdrawTelos, setOpenWithdrawTelos] = useState(false)

  const {signerAddress, userTokens, user, contract, signer} = appCtx

  const handleOpenAddTelos = async () => {
    // const response = await (contract!.connect(signer!) as Contract).saveTelos()
    setOpenWithdrawTelos(false)
    setOpenAddTelos(true)
  }

  const handleOpenWithdrawTelos = async () => {
    // const response = await (contract!.connect(signer!) as Contract).withdrawTelos()
    setOpenAddTelos(false)
    setOpenWithdrawTelos(true)
  }




  return (
    <div className='w-full'>
      <h1 className={`my-4 text-2xl font-semibold`}>Hello {formatAddress(signerAddress!)} </h1>
        
        <Summary />

        

        <ul>

          <div className={"grid grid-cols-12 gap-4 rounded-lg p-4 pt-12 relative bg-stone-950 overflow-hidden mb-4"}>
          <div className="absolute top-0 left-0 rounded-br-lg bg-red-600 px-4 py-1.5 text-sm z-index-[-1]">
              TLOS
          </div>
          
          <div className=' col-span-6 sm:col-span-4'>
              <h4 className='text-3xl font-semibold mb-[4px]'>{user?.telosBalance} TLOS</h4>
              <div className='uppercase text-[10px]'>saved</div>
          </div>

          <div className=' col-span-6 sm:col-span-4'>
              <h4 className='text-normal  mb-2'>{user?.telosDuration} days left.</h4>
              <div className='text-normal '>{user?.rewardsEarned} PGY EARNED</div>
          </div>

          <div className=' col-span-12 sm:col-span-4 flex justify-between'>
              <button className='btn btn-contained btn-small' onClick={handleOpenAddTelos}>Add</button>
              <button className='btn btn-contained btn-small' onClick={handleOpenWithdrawTelos}>Withdraw</button>
          </div>
          {openAddTelos && <AddTelos />}
          {openWithdrawTelos && <WithdrawTelos />}
    </div>

          {userTokens.map((token, index) => {
            return <Token key={index}
              tokenAddress={token.tokenAddress}
              tokenBalance={token.tokenBalance}
              saveDuration={token.saveDuration}
              timeSaved={token.timeSaved}
              tokenRewards={token.tokenRewards}
            />
          })}
          {/* 
            EACH TOKEN SAVED
            AMOUNT
            REWORDS

          */}
        </ul>
    </div>
  )
}

export default Dashboard