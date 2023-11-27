import {useContext} from "react"
import Header from '@/components/layout/header'
import Image from 'next/image'
import Link from "next/link"
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import BottomCall from '@/components/bottom-call'
import {AppContext} from "@/context/app-context"
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  const appCtx = useContext(AppContext)

  const {connected, setup} = appCtx

  const handleConnect
= () => {
  setup()
}

  return (
    <>
      <Header />
      <main
      className={`flex min-h-[calc(100vh - 78px)] flex-col items-center justify-between  mt-[78px] md:mt-[86px]`}
    >
      
      <div className={`min-h-[calc(100vh - 78px)] text-center`}>
      <PaddedContainer className={``}>
        <h1 className={`text-6xl font-semibold mb-6`}>Hold your the Crypto</h1>
        <p className={`text-lg mb-4 `}>Stop unnessacary spending, set a goal, save in public, earn from your savings, and build your wallet portfolio.</p>

        {connected ? 
        <Link href="/account">
        <button className={`btn btn-contained`}>
     Go to Account
    </button>
        </Link>
      : <button className={`btn btn-contained`} onClick={handleConnect}>
      Connect Wallet
    </button>}
      </PaddedContainer>
      </div>
     

      <div className='w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-5xl mb-6 text-center`}>A New Protocol for Savings and a Dedicated Ecosystem</h2>
            <p className={"text-4xl mb-6 font-light"}>
              We are introducing a system were us crypto users are incentivized to <span className="text-primay-600 underline">save socially</span>, while being able to turn our savings into awesome low risk fair investments. All while maintaining a decentralized <span className="text-primay-600 underline">turstless</span> governing structure.
            </p>  
        </PaddedContainer>
      </div>
      

      <div className='w-full'>
        <PaddedContainer className={``}>
        <h2 className={`text-5xl mb-6 text-center`}>What can you find here?</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className='rounded-lg bg-stone-950 p-4 col-span-2 sm:col-span-1 '>
            <h4 className={`text-2xl mb-4`}>True Banklessness, True Security</h4>
            <p className={"text-xl mb-6 font-light"}>
                Why keep your cryopto in a wallet in 2023. Private keys get compromised everday. Smart contracts don&apos;t have private keys. Your funds are saver here.
              </p> 
            </div>

            <div className='rounded-lg bg-stone-950 p-4 col-span-2 sm:col-span-1 '>
            <h4 className={`text-2xl mb-4`}>Get Paid to Save</h4>
            <p className={"text-xl mb-6 font-light"}>
                Why keep your cryopto in a wallet in 2023. Private keys get compromised everday. Smart contracts don&apos;t have private keys. Your funds are saver here.
              </p> 
            </div>
        </div>
         
          


            
        </PaddedContainer>
      </div>

     
      <div className='w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-5xl mb-6 text-center`}>Introducing the <br /><span className={`text-red-400`}>FIS</span> protocol</h2>

          <p className='mb-8 text-center text-lg'>This is the latest protocol built solely for you to maximize what&apos; possible with your savings. </p>

          <div className="grid grid-cols-2 gap-4 ">
          <div className='rounded-lg bg-stone-950 p-4 col-span-2 sm:col-span-1 '>
            <h4 className={`text-2xl mb-4`}>Incentivized to Save.</h4>
            <p className={"text-xl mb-6 font-light"}>
                Why keep your cryopto in a wallet in 2023. Private keys get compromised everday. Smart contracts don&apos;t have private keys. Your funds are saver here.
              </p> 
            </div>

            <div className='rounded-lg bg-stone-950 p-4 col-span-2 sm:col-span-1 '>
            <h4 className={`text-2xl mb-4`}>Turn savings into Investment.</h4>
            <p className={"text-xl mb-6 font-light"}>
                Why keep your cryopto in a wallet in 2023. Private keys get compromised everday. Smart contracts don&apos;t have private keys. Your funds are saver here.
              </p> 
            </div>

            <div className='rounded-lg bg-stone-950 p-4 col-span-2 sm:col-span-1 mx-auto inline-block '>
            <h4 className={`text-2xl mb-4`}>Do it as a community</h4>
            <p className={"text-xl mb-6 font-light"}>
                Why keep your cryopto in a wallet in 2023. Private keys get compromised everday. Smart contracts don&apos;t have private keys. Your funds are saver here.
              </p> 
            </div>
        </div>
         
            
        </PaddedContainer>
      </div>

      {/* <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>Features</h2>

          
            
        </PaddedContainer>
      </div> */}

      <BottomCall />

    </main>

    
    <Footer />
    </>
    
  )
}
