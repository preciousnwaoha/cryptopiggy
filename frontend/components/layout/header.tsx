import React, {useContext} from 'react'
import Nav from './nav'
import NavDrawer from './nav-drawer'
import {AppContext} from "@/context/app-context"
import { formatAddress } from '@/lib/utils'
// import {Pi } from "react-icons/pi"

const Header = () => {
  const appCtx = useContext(AppContext)

  const {connected, signerAddress, setup} = appCtx

  const handleConnect = () => {
    setup()
  }

  /*
    <div className="fixed left-0 top-0 z-[100] flex w-full px-8 py-6 md:pb-6 md:pt-8 items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  */

  return (
  
    <div className="fixed left-0 top-0 z-[100] flex w-full px-8 py-6 md:pb-6 md:pt-8 items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl bg-black lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4">
      <div className='text-red-600 font-bold text-lg'>CryptoPiggy</div>

      <Nav />

      <div className='flex items-center'>
        {!connected && <button className="btn btn-contained btn-small mr-4 hidden md:inline-block" onClick={handleConnect}>Connect</button>}
      <div className='mr-4 flex items-center'>
          <div className={`rounded-full w-4 h-4 mr-4 ${connected ? "bg-blue-400" : "bg-red-400"}`}></div>
          {connected && <div>{formatAddress(signerAddress!)}</div>}
      </div>
      <NavDrawer />
      </div>
      

    </div>
  )
}

export default Header