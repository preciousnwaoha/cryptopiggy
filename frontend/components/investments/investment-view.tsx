import AppContext from '@/context/app-context'
import { InvestmentType } from '@/types/site'
import React, { useContext, useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import { toWei } from '@/lib/utils'
import { useRouter } from 'next/router'

interface propTypes {
    investment: InvestmentType
}


const InvestmentView = ({investment}: propTypes) => {
  const router = useRouter()
    const appCtx = useContext(AppContext)
    const {connected, contract, signer, signerAddress} = appCtx
    const [loading, setLoading] = useState(false)
    const [invested, setInvested] = useState(false)


    const handleInvest = async () => {
      setLoading(true)
      const response = await (contract!.connect(signer!) as Contract)
      ["invest(uint256)"]
      (BigInt(`${investment.id}`))

      response.wait().then((res: any) => {
        if (res.status === 1) {
            console.log(res)
            setInvested(true)
            router.reload()
        }
    }).catch((err: any )=> {
        console.log(err)
    });
    setLoading(false)
    }
    

  return (
    <div>
        <h1 className={`text-3xl font-semibold mb-8`}>{investment.title}</h1>

        <p className={`mb-4 `}>{investment.description}</p>

        <p className={`mb-4 `}>{investment.percentInterest}% Interest</p>


        <p className={`mb-4 `}>This investment is for {investment.duration} days</p>

        <p className={`mb-4 `}>Minimum of {ethers.formatEther(`${investment.depositPrice}`)} TLOS</p>
        
        
        {!investment.investmentParticipants.includes(signerAddress!) && <>
        {loading?  <div className='text-center my-4'>Pending...</div>
        : <button className="btn btn-contained" onClick={handleInvest}>
          Invest
        </button>}
        </>}

        {investment.investmentParticipants.length > 0 ? <>
            <h3 className='text-center text-lg font-semibold mb-2'>Investors</h3>
            <div className='text-sm '>
                {investment.investmentParticipants.map((inverstorAddr, index )=> {
                    return <div key={index} className='mb-2'>
                       {"1: "} { inverstorAddr}
                    </div>
                })}
            </div>
            </> : <h3 className='text-center text-lg font-semibold'>No Investors</h3>}
        
    </div>
  )
}

export default InvestmentView