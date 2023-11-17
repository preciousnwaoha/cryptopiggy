import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import Dashboard from '@/components/account/dashboard'
import { useEffect, useState, useContext } from 'react'
import AppContext from '@/context/app-context'
import NotConnected from '@/components/not-connected'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  const appCtx = useContext(AppContext)

  const {connected, getUser, user, getUserTokens} = appCtx

  useEffect(() => {
    if (connected) {
      getUser()
      getUserTokens()
    }
  }, [connected, getUser])

  if (!connected) {
    return <NotConnected />
  }

  if (!user) {
    return <>
     <Header />
     <main
      className={`flex flex-col items-center justify-between `}
    >
      <div className={`min-h-[calc(100vh -78px)]   mt-[78px] w-full`}>
      <PaddedContainer className={``}>
        User not yet found!
      </PaddedContainer>
      </div>
    </main>
    
    <Footer />
    </>
  }

  return (
    <main
      className={`flex flex-col items-center justify-between `}
    >
      <Header />
      <div className={`min-h-[calc(100vh -78px)]   mt-[78px] w-full`}>
      <PaddedContainer className={``}>
        <Dashboard />
      </PaddedContainer>
      </div>
      <Footer />

    </main>
  )
}
