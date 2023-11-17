import React, { useContext } from 'react'
import Footer from './layout/footer'
import Header from './layout/header'
import PaddedContainer from './layout/padded-container'
import Link from 'next/link'

const InvalidRoute = () => {
  


  return (
    <>
    <Header />

      <main
    className={`flex min-h-screen flex-col items-center justify-between mt-[78px] md:mt-[86px]`}
  >
      <PaddedContainer className='flex flex-col items-center'>
        <h1 className='text-6xl font-semibold text-center mt-8 mb-8'>
          You&apos; not connected :(
        </h1>
        
        <Link href="/">
        <button className='btn btn-contained' >
          Go Home
        </button>
        </Link>
        
      </PaddedContainer> 
      
    </main>

    <Footer />
    </>
    
  )
}

export default InvalidRoute