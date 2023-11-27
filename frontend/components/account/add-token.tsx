import AppContext from '@/context/app-context'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Contract, parseEther } from 'ethers'
import { DURATION_TYPES } from '@/config/site-data'
interface propTypes {
    tokenAddress: string
}



const AddToken = ({tokenAddress}: propTypes) => {
    const appCtx = useContext(AppContext)
      const [amount, setAmount] = useState("")
    const [duration, setDuration]= useState(0);
    const [durationType, setDurationType]= useState(0);

      const [loading, setLoading] = useState(false)

      const {user, contract, signer} = appCtx

      const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        
        if (/^[0-9]+?\.?[0-9]*$/.test(e.target.value) || (e.target.value === "")) {
          setAmount(e.target.value)
        }
      }

      const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value))
    }

    const handleDurationTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDuration(Number(e.target.value))
    }

      const handleApprove = async () => {
        // approval
      }


      const handleAddTokens = async (e: FormEvent) => {
        e.preventDefault()
        if (!Number(amount) || (Number(amount) <= 0) ) {

            return
        }

        setLoading(true)

        const tx = await (contract!.connect(signer!) as Contract)
        ["saveTokens(address tokenAddress, uint256 amount, uint duration)"]
        (tokenAddress, parseEther(amount), BigInt(`${user?.telosDuration}`))
          
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
    <form className={`w-full p-4 flex flex-col justify-center items-center`} onSubmit={handleAddTokens}>
                <div className="w-full mb-4">
                    <label htmlFor='grp-amount' className={`block mb-2`} >Amount</label>
                    <input value={amount} id="grp-amount" placeholder="0.00" onChange={handleChangeAmount} className='rounded-lg px-4 py-2 w-full bg-stone-900 ' />
                </div>

                <div className='grid grid-cols-12 gap-4'>
                    <div className="w-full mb-4 text-center col-span-12 md:col-span-6 lg:col-span-5">
                        <label htmlFor='grp-duration' className={` block mb-2`}>Duration</label>
                        <div className='grid gap-4 grid-cols-2'>
                            <select value={durationType} id="grp-duration" placeholder="days" onChange={handleDurationTypeChange} className='rounded-lg p-4 w-full bg-stone-900 text-center'  >
                                {DURATION_TYPES.map((type, index) => {
                                    return <option key={index} value={index} className={`capitalize`}>{type}{(index === durationType) && ":"}</option>
                                })}
                            </select>

                            <input value={duration}  type="number" id="grp-target" placeholder="0 ETH" onChange={handleDurationChange} step="1" min="0" className='rounded-lg p-4 w-full bg-stone-900 text-center' />
                        </div>
                    </div>
                </div>               
               
                {loading ? <div className='text-center my-4'>Loading</div>
                : <button className='btn btn-contained my-4' type={"submit"}>Add Tokens</button>}


            </form>
  )
}

export default AddToken