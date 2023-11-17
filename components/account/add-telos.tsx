import AppContext from '@/context/app-context'
import React, { ChangeEvent, useContext, useState } from 'react'
import { Contract } from 'ethers'
import { toWei } from '../../context/app-context'


const AddTelos = () => {
    const appCtx = useContext(AppContext)
      const [amount, setAmount] = useState(0)

      const {user, contract, signer} = appCtx

      const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
      }




      const handleAdd = async () => {
        if (amount <= 0) {
          
            return
        }
        const wei = toWei(`${amount}`);

        const response = await (contract!.connect(signer!) as Contract).saveTelos({value: wei, gasLimit: 100000})
        console.log(response)
        

      }


  return (
    <form className={`w-full max-w-[500px] p-4`} onSubmit={handleAdd}>
                <div className="w-full mb-4">
                    <label htmlFor='grp-amount' className={`block mb-2`} >Amount</label>
                    <input value={amount} id="grp-amount" placeholder="0.00" min="0" onChange={handleChangeAmount} className='rounded-lg px-4 py-2 w-full bg-stone-950 ' />
                </div>


               
               <button className='btn btn-contained my-4' type={"submit"}>Create Group</button>

            </form>
  )
}

export default AddTelos