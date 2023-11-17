import AppContext from '@/context/app-context'
import React, { ChangeEvent, useContext, useState } from 'react'
import { Contract } from 'ethers'

interface propTypes {
    tokenAddress: string
}

const WithdrawToken = ({tokenAddress}: propTypes) => {
    const appCtx = useContext(AppContext)
      const [amount, setAmount] = useState(0)


      const {user, contract, signer} = appCtx

      const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
      }


      const handleWithdraw = async () => {
        if (amount <= 0) {
          
          return
      }
        const response = await (contract!.connect(signer!) as Contract).WithdrwaTokens(tokenAddress, amount, )
        console.log(response)
      }


  return (
    <form className={`w-full max-w-[500px] p-4`} onSubmit={handleWithdraw}>
                <div className="w-full mb-4">
                    <label htmlFor='grp-amount' className={`block mb-2`} >Amount</label>
                    <input value={amount} id="grp-amount" placeholder="0.00" min="0" onChange={handleChangeAmount} className='rounded-lg px-4 py-2 w-full bg-stone-950 ' />
                </div>


               
               <button className='btn btn-contained my-4' type={"submit"}>Create Group</button>

            </form>
  )
}

export default WithdrawToken