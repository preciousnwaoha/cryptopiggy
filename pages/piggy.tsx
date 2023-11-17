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
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Header />
      <div className={`min-h-[calc(100vh - 78px)] mt-[78px] w-full`}>
      <PaddedContainer className={``}>
        <h1 className={`text-6xl font-semibold mb-6 text-center`}>Introducing the <br/>PIGGY Coin</h1>
        <p className={`text-lg mb-4 text-center`}>You should be incentivised to save, Saving is a good deed.</p>

        <div className='grid grid-cols-3 gap-4 mt-16'>
          <div className='rounded-lg p-4 bg-stone-950 text-center'>
              <h4 className='text-2xl mb-2 text-red-600'>10 million</h4>
              <p className='text-sm uppercase'>in circulation</p>
          </div>
          <div className='rounded-lg p-4 bg-stone-950 text-center'>
              <h4 className='text-2xl mb-2 text-red-600'>1 PGY</h4>
              <p className='text-sm uppercase'>per day</p>
          </div>
          <div className='rounded-lg p-4 bg-stone-950 text-center'>
              <h4 className='text-2xl mb-2 text-red-600'>ON TELOS</h4>
              <p className='text-sm uppercase'>blockchain</p>
          </div>
        </div>

        <div className='italic text-lg font-light my-8 text-center'>PIGGY Coin is used to reward you in the FIS protocol.</div>
      </PaddedContainer>
      </div>

      <div className={` mt-[78px] w-full`}>
      <PaddedContainer className={``}>
        <h1 className={`text-4xl font-semibold mb-6 text-center`}>What does PIGGY Do? </h1>

        <div className='grid grid-cols-2 gap-4 mt-16'>
          <div className='rounded-lg p-4 bg-stone-950'>
              <h4 className='text-2xl mb-2 text-red-600'>Pays you to Save.</h4>
              <p className='text-normal '>in circulation</p>
          </div>
          <div className='rounded-lg p-4 bg-stone-950 '>
              <h4 className='text-2xl mb-2 text-red-600'>FAIR Investment</h4>
              <p className='text-normal '>per day</p>
          </div>
          <div className='rounded-lg p-4 bg-stone-950'>
              <h4 className='text-2xl mb-2 text-red-600'>Build Ecosystem</h4>
              <p className='text-normal '>blockchain</p>
          </div>
        </div>
      </PaddedContainer>
      </div>
      
      <BottomCall />

      <Footer />

    </main>
  )
}
