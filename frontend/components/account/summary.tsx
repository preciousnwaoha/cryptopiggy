import React from 'react'
import { useContext } from 'react'
import { AppContext } from '@/context/app-context'
import { ethers } from 'ethers'

const Summary = () => {
  const appCtx = useContext(AppContext)

  const {signerAddress, userTokens, user} = appCtx




  return (
    <div className='flex flex-col sm:flex-row justify-between rounded-lg bg-stone-950  p-4 mb-8'>
          <div className={``}>
            <div className='text-5xl font-semibold mb-4'>
              {ethers.formatEther(`${ user?.telosBalance}`)} <span className='uppercase text-sm'>tlos</span>
            </div>

            <div className={`flex`}>
              <div className={`mb-4  mr-8`}>
                <div className='text-lg font-semibold mb-[2px]'>
                  {ethers.formatEther(`${ user?.goal}`)} TLOS
                </div>
                <div className='uppercase text-[10px]'>is your target</div>
              </div>

              <div className={`mb-4`}>
                <div className='text-lg font-semibold mb-[2px]'>
                  {1 + userTokens.length} TOKENS
                </div>
                <div className='uppercase text-[10px]'> saved</div>
              </div>
            </div>
           
          </div>

          <div className='flex sm:block'>
            <div className={`mb-4 mr-8 sm:mr-0 `}>
              <div className='text-3xl font-semibold'>
                {ethers.formatEther(`${ user?.rewardsEarned}`)} <span className='uppercase text-sm'>pgy</span>
              </div>
              <div className='uppercase text-[10px]'>earned</div>
            </div>


            <div className={``}>
              <div className='text-lg font-semibold'>
                {user?.timeSaved}/{user?.telosDuration}
              </div>
              <div className='uppercase text-[10px]'>days left</div>
            </div>
          </div>
          
          

          
            
           
        </div>
  )
}

export default Summary