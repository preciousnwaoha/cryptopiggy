import AppContext from '@/context/app-context'
import { ChangeEvent, useContext, useState, FormEvent } from 'react'
import { Contract, parseEther } from 'ethers'



const WithdrawTelos = () => {
    const appCtx = useContext(AppContext)
      const [amount, setAmount] = useState("")
      const [loading, setLoading] = useState(false)

      const {user, contract, signer} = appCtx

      const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]+?\.?[0-9]*$/.test(e.target.value) || (e.target.value === "")) {
          setAmount(e.target.value)
        }
      }


      const handleWithdraw = async (e: FormEvent ) => {
        e.preventDefault()
        if (!Number(amount) || (Number(amount) <= 0) ) {
            return
        }

        setLoading(true)
        const tx = await (contract!.connect(signer!) as Contract)
        ["withdrawTelos(uint)"](parseEther(amount))
        console.log({tx})

        await tx.wait().then((res: any) => {
          if (res.status === 1) {
              // its done
              console.log({res})
              // router.reload()
          }
        }).catch((err: any )=> {
          console.log(err)
        });

        setLoading(false)

      }


  return (
    <form className={`w-full p-4 flex flex-col justify-center items-center`} onSubmit={handleWithdraw}>
                <div className="w-full mb-4">
                    <label htmlFor='grp-amount' className={`block mb-2`} >Amount</label>
                    <input value={amount} id="grp-amount" placeholder="0.00"  onChange={handleChangeAmount} className='rounded-lg px-4 py-2 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white ' />
                </div>


               
               {loading ? <div className='text-center my-4'>Loading</div>
                : <button className='btn btn-contained my-4' type={"submit"}>Withdraw Telos</button>}

            </form>
  )
}

export default WithdrawTelos