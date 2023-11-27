import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import BottomCall from '@/components/bottom-call'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  return (

    <>
    <Header />
    <main
      className={`flex min-h-screen mt-[78px] flex-col items-center justify-between `}
    >
      
      <div className={` `}>
      <PaddedContainer className={``}>
        <h1 className={`text-6xl font-semibold mb-16`}>About CryptoPiggy</h1>
        <p className={`text-lg md:text-2xl mb-4 font-light`}>
          CryptoPiggy is you one stop platform of saving any ERC20 Token the right way. Ww are building and updating our protocols that facilitates our mission.
        </p>
      </PaddedContainer>
      </div>
     

      <div className={`w-full`}>
      <PaddedContainer className={`text-center`}>
        <h1 className={`text-4xl font-semibold mb-6 md:mb-12`}>The Team</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-white'>
        <div className='flex flex-col rounded-xl justify-center rounder-2xl px-4 py-8 bg-stone-900 '>
          <h4 className='mb-4 text-xl font-semi-bold'>Precious Nwaoha</h4>
            <p className={`text-normal mb-4 `}>
              Web and Blockchain Dev.
            </p>
            <div><a className='text-blue-400'>@pincode </a></div>
        </div>

        <div className='flex flex-col rounded-xl justify-center rounder-2xl px-4 py-8 bg-stone-900'>
          <h4 className='mb-4 text-xl font-semi-bold'>Adams Dave</h4>
            <p className={`text-normal mb-4 `}>
              Smart Contract Developer
            </p>
            <div><a className='text-blue-400'>@adamsdavee </a></div>
        </div>

        </div>
        
      </PaddedContainer>
      </div>
     

    

      <BottomCall />

      

    </main>
    <Footer />
    </>
    
  )
}
