import { TokenSavingDataType } from '@/types/site'
import { useState, useEffect, useContext } from 'react'
import WithdrawToken from './withdraw-token'
import AddToken from './add-token'
import erc20Artifact from "@/config/utils/ERC20.json"
import { formatEther, Contract } from 'ethers'
import AppContext, { CONTRACT_ADDRESS } from '@/context/app-context'

const Token = ({tokenAddress, tokenBalance, saveDuration, timeSaved, tokenRewards }: TokenSavingDataType) => {
    const appCtx = useContext(AppContext)
    const [openAdd, setOpenAdd] = useState(false)
    const [openWithdraw, setOpenWithdraw] = useState(false)
    const [symbol, setSymbol] = useState("")

    const {provider, signer, signerAddress, connected} = appCtx

    console.log(tokenAddress)

    useEffect(() => {
        const getSymbol = async () => {
            const tokenContract = new Contract(
                tokenAddress,
                erc20Artifact.abi,
                provider
              );

            const tx = await (tokenContract!.connect(signer!) as Contract).symbol()
                console.log({tx})
            setSymbol(tx)
        }
        if (connected && !symbol) {
            getSymbol()
        }
    }, [])



    const timeRemaining = timeSaved - saveDuration

    const handleAddToSavings = () => {
        setOpenWithdraw(false)
        setOpenAdd(true)
    }

    const handleWithdrawToken = () => {
        setOpenAdd(false)
        setOpenWithdraw(true)
    }
    

  return (
    <div className='rounded-lg p-4 pt-12 bg-stone-950 relative overflow-hidden '>
        <div className="absolute top-0 left-0 rounded-br-lg bg-red-600 px-4 py-1.5 text-sm z-index-[-1]">
            {symbol || "----"}
        </div>
         <div className={"z-[-1] grid grid-cols-12 gap-4   mb-4"}>
        
        
        <div className=' col-span-6 sm:col-span-4'>
            <h4 className='text-3xl font-semibold mb-[4px]'>{formatEther(`${tokenBalance}`)} {symbol}</h4>
            <div className='uppercase text-[10px]'>saved</div>
        </div>

        <div className=' col-span-6 sm:col-span-4'>
            <h4 className='text-normal  mb-2'>{timeRemaining} secs left.</h4>
            <div className='text-normal '>{formatEther(`${tokenRewards}`)} PGY EARNED</div>
        </div>

        <div className=' col-span-12 sm:col-span-4 flex justify-between'>
            <button className='btn btn-contained btn-small' onClick={handleAddToSavings}>Add</button>
            <button className='btn btn-contained btn-small' onClick={handleWithdrawToken}>Withdraw</button>
        </div>

        
    </div>
    {openAdd && <AddToken tokenAddress={tokenAddress} />}
        {openWithdraw && <WithdrawToken tokenAddress={tokenAddress} />}
    </div>
   
  )
}

export default Token