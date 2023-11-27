import React, { useContext } from 'react'
import PaddedContainer from './layout/padded-container'
import AppContext from '@/context/app-context'
import Link from 'next/link'


const BottomCall = () => {
    const appCtx = useContext(AppContext)

    const {connected, setup} = appCtx

    const handleConnect
 = () => {
    setup()
 }

 
  return (
    <div className=' w-full flex items-center flex-col text-center mt-12'>
    <PaddedContainer className={``}>
      <h2 className={`text-4xl md:text-6xl mb-8 md:mb-12`}>Lets Save Crypto</h2>

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

  )
}

export default BottomCall