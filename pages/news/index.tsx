import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Header />
      <div className={`min-h-screen border mt-[78px]`}>
      <PaddedContainer className={``}>
        <h1 className={`text-6xl font-semibold mb-6`}>Crypt the Crypts</h1>
        <p className={`text-lg mb-4 `}>Stop unnessacary spending, set a goal save in public, earn more for your patience, build your portfolio.</p>

        <button className={`btn btn-contained`}>
          Connect Wallet
        </button>
      </PaddedContainer>
      </div>
     

      <div className='border'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>A New Protocol for Savings and Dedicated Ecosystem</h2>

          
            
        </PaddedContainer>
      </div>
      

      <div className='border'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>True Banklessness, True Security</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>Get paid to hold your crypto</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>A New Savings Protocol and Ecosystem</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>Introducing the <span className={`text-red-400`}>FIS</span> protocol</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}><span className={`text-red-400`}>Social</span> savings.</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>Features</h2>

          
            
        </PaddedContainer>
      </div>

      <div className='border w-full'>
        <PaddedContainer className={``}>
          <h2 className={`text-4xl`}>Lets Save Crypto</h2>

          <button className={`btn btn-contained`}>
          Connect Wallet
        </button>
            
        </PaddedContainer>
      </div>

      <Footer />

    </main>
  )
}
