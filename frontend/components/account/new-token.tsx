import AppContext, { CONTRACT_ADDRESS } from '@/context/app-context'
import { ChangeEvent, FormEvent, useContext, useState, useEffect } from 'react'
import { Contract, formatEther, parseEther } from 'ethers'

import erc20Artifact from "@/config/utils/ERC20.json"
import { SUPPORTED_TOKENS } from '@/config/site-data'


const NewToken = () => {
    const appCtx = useContext(AppContext)
    const [openNewToken, setOpenNewToken] = useState(false)

      const [amount, setAmount] = useState("")
      const [tokenAddress, setTokenAddress] = useState(SUPPORTED_TOKENS[0].address)
      const [allowance, setAllowance] = useState("")

      const [loading, setLoading] = useState(false)
      const [approved, setApproved] = useState(false)

      const {user, contract, signer, provider, connected, signerAddress} = appCtx

      useEffect(() => {
        const getAllowance = async () => {
            const tokenContract = new Contract(
                tokenAddress,
                erc20Artifact.abi,
                provider
              );

            const tx = await (tokenContract!.connect(signer!) as Contract)
            ["allowance(address _owner, address _spender)"]
            (signerAddress, CONTRACT_ADDRESS)

            setAllowance(formatEther(tx))
        }
        if (connected && tokenAddress) {
            getAllowance()
        }
      }, [openNewToken])

      const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^[0-9]+?\.?[0-9]*$/.test(e.target.value) || (e.target.value === "")) {
          setAmount(e.target.value)
        }
      }

      const handleTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTokenAddress(e.target.value)
      }


      const handleApprove = async (e: FormEvent) => {
        e.preventDefault()
        if (!Number(amount) || (Number(amount) <= 0) ) {
            return
        }

        if (!tokenAddress) {
            return
        }

        setLoading(true)

        if (parseEther(allowance || "0") >= parseEther(amount)) {
            setApproved(true)
            return
        }
        

        const tokenContract = new Contract(
            tokenAddress,
            erc20Artifact.abi,
            provider
          );

        const tx = await (tokenContract!.connect(signer!) as Contract)
        ["approve(address _, uint256)"]
        (CONTRACT_ADDRESS, parseEther(amount))
          
        console.log({tx})

        await tx.wait().then((res: any) => {
          if (res.status === 1) {
              // its done
              console.log({res})
              setApproved(true)
          }
        }).catch((err: any )=> {
          console.log(err)
        });

        setLoading(false)
      }


      const handleSaveToken = async () => {
        if (!Number(amount) || (Number(amount) <= 0) ) {
            return
        }

        setLoading(true)

        const tx = await (contract!.connect(signer!) as Contract)
        ["saveTokens(address tokenAddress, uint256 amount, uint duration)"]
        (tokenAddress, parseEther(`${amount}`), BigInt(`${30}`))
          
        console.log({tx})

        await tx.wait().then((res: any) => {
          if (res.status === 1) {
              // its done
              console.log({res})
              setOpenNewToken(false)
          }
        }).catch((err: any )=> {
          console.log(err)
        });

        setLoading(false)
      }


    return <div className='mb-8 '>

        
        {!openNewToken && <button className="btn btn-contained " onClick={() => {
            setOpenNewToken(true)
        }}>New Token</button>}

        

       {openNewToken && <div className='flex flex-col'>
       <button className='btn btn-contained btn-icon mb-4 self-end' onClick={() => {
            setApproved(false)
            setOpenNewToken(false)
        }}>&times;</button>

        <p className='uppercase font-light mb-6 text-center'>Contract is allowed to save <span className='text-red-500 dark:text-red-600 font-semibold '>{allowance} PGY</span></p>
        {approved ? <div className='flex text-center flex-col items-center'>
            
            <h4 className='text-4xl font-light mb-8'>You about to save {formatEther(parseEther(amount || "0"))} PGY</h4>
            <button className='btn btn-contained' onClick={handleSaveToken}>Confirm Save</button>
        </div>
        : 
        <form className={`w-full p-4 flex flex-col justify-center items-center`} onSubmit={handleApprove}>

            

                            
                            
                        <div className=''>
                            <label htmlFor='token-amount' className={` block mb-2 text-center`}>Duration</label>
                            <select value={tokenAddress} id="token-amount" placeholder="days" onChange={handleTokenChange} className='rounded-lg p-4 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white text-center mb-4'  >
                                {SUPPORTED_TOKENS.map((token, index) => {
                                    return <option key={index} value={token.address} className={`capitalize`}>{token.name} {`(${token.symbol})`}</option>
                                })}
                            </select>

                        <div className="w-full mb-4">
                            <label htmlFor='grp-amount' className={`block mb-2 text-center`} >Amount</label>
                            <input value={amount} id="grp-amount" placeholder="0.00" onChange={handleChangeAmount} className='rounded-lg px-4 py-2 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white ' />
                        </div>

                    </div>
                    
                    {loading ? <div className='text-center my-4'>Loading</div>
                : <button className='btn btn-contained my-4' type={"submit"}>Start Saving</button>}
            </form>}
       </div>}
    </div>

}   

export default NewToken