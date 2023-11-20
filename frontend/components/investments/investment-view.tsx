import AppContext from '@/context/app-context'
import { InvestmentType } from '@/types/site'
import React, { useContext, useEffect, useState } from 'react'
import { Contract } from 'ethers'

interface propTypes {
    investment: InvestmentType
}


const InvestmentView = ({investment}: propTypes) => {
    const appCtx = useContext(AppContext)
    const {connected, contract, signer} = appCtx


    const handleInvest = async () => {
      const response = await (contract!.connect(signer!) as Contract).invest(investment.id)

      console.log(response)
    }
    
    const durationInWords = "6 months left"

  return (
    <div>
        <h1 className={`text-3xl font-semibold mb-8`}>{investment.title}</h1>

        <p className={`mb-4 `}>{investment.description}</p>

        <p className={`mb-4 `}>{investment.percentInterest}% Interest</p>


        <p className={`mb-4 `}>This investment is for {investment.duration} days</p>

        <p className={`mb-4 `}>Minimum of {investment.depositPrice} TLOS</p>
        
        <button className="btn btn-contained" onClick={handleInvest}>

        </button>
        
    </div>
  )
}

export default InvestmentView