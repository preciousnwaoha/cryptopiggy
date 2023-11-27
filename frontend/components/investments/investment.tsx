import Link from 'next/link'
import React from 'react'
import { InvestmentType } from '@/types/site'
import { toWei } from '@/lib/utils'
import { ethers } from 'ethers'

const Investment = ({title, id, duration, status, depositPrice, percentInterest }: InvestmentType) => {


    const durationInWords = duration

  return (
    <div className='rounded-2xl p-8 shadow-4 text-black bg-zinc-100 dark:bg-stone-900 dark:text-white max-w-[400px] md:max-w-none mx-auto'>
        <h4 className="text-2xl font-semibold mb-4">{title}</h4>

        <div className='flex justify-between items-end'>
        <p className='font-light text-3xl mb-4'>{ethers.formatEther(`${depositPrice}`)} TLOS</p>
        <p className='font-light text-normal mb-4'>{durationInWords} seconds</p>
        </div>
        

        <div className='flex justify-between items-end'>
        <Link href={`/investments/${id}`}>
        <button className='btn btn-contained btn-small uppercase' >
            view investment
        </button>
    </Link>

            <div className='text-sm font-light '><span className='text-red-600 font-semibold italic'>{percentInterest}%</span> interest</div>
        </div>
    
        

    </div>
  )
}

export default Investment