import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import { useContext, useEffect, useState } from 'react'
import AppContext from '@/context/app-context'
import NotConnected from '@/components/not-connected'
import Group from '@/components/groups/group'
import Link from 'next/link'
import CreateGroup from '@/components/groups/create-group'
import {Contract} from 'ethers'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
    const appCtx = useContext(AppContext)

    const {connected, contract, signer, } = appCtx



    if (!connected) {
        return <NotConnected />
    }

    

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Header />
    
        <div className={`border mt-[78px] md:mt-[86px]`}>
            

            <PaddedContainer className={``}>
                <h1 className='text-5xl font-sembold text-center mb-4'>Create a Savings Group</h1>
            </PaddedContainer>
        </div>

        <CreateGroup />
      


       

        
      <Footer />

    </main>
  )
}
