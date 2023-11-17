import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import { useContext, useEffect, useState } from 'react'
import AppContext from '@/context/app-context'
import NotConnected from "@/components/not-connected"
import { INVESTMENTS } from '@/config/dummy'
import Investment from '@/components/investments/investment'
import { Contract } from 'ethers'
import { InvestmentType } from '@/types/site'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  const appCtx = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [investments, setInvestments] = useState<InvestmentType[] | undefined>(undefined)


  const {connected, contract, signer} = appCtx;

  useEffect(() => {
    const getInvestments = async () => {
      const response = await (contract!.connect(signer!) as Contract).getAllInvestments()

      console.log(response)
      setInvestments(INVESTMENTS)
      setLoading(false)
    }

    if (connected) {
      setLoading(true)
      getInvestments()
    }
  }, [connected])

  if (!connected) {
    return <NotConnected />
  }

  if (loading) {
    return   <>
    <Header />
    <main
    className={`flex min-h-screen flex-col items-center justify-between mt-[78px] md:mt-[86px]`}
  >
    
    <div className={`min-h-[calc(100vh - 78px)]`}>
      <PaddedContainer className={``}>
        Loading
      </PaddedContainer>
      </div>
  </main>
  <Footer />
  </>
  }

  if (!investments) {
    return <>
    <Header />
    <main
    className={`flex min-h-screen flex-col items-center justify-between mt-[78px] md:mt-[86px]`}
  >
    
    <div className={`min-h-[calc(100vh - 78px)]`}>
      <PaddedContainer className={``}>
        None found
      </PaddedContainer>
      </div>
  </main>
  <Footer />
  </>
  }



  return (
    <>
      <Header />
      <main
      className={`flex min-h-screen flex-col items-center justify-between mt-[78px] md:mt-[86px]`}
    >
      
      <div className={`min-h-[calc(100vh - 78px)]`}>
      <PaddedContainer className={``}>
        <h1 className={`text-6xl font-semibold mb-4 text-center`}>Vetted Opportunites</h1>
        <p className={`text-normal mb-8 text-center`}>Stop unnessacary spending, set a goal save in public, earn more for your patience, build your portfolio.</p>
      
        <ul className={`grid md:grid-cols-2 gap-4`}>
          {investments!.map((investment, index) => {
            return <Investment key={index} 
            id={investment.id}
            title={investment.title}
            description={investment.description}
            depositPrice={investment.depositPrice}
            duration={investment.duration}
            percentInterest={investment.percentInterest}
            investmentParticipants={investment.investmentParticipants}
            open={investment.open}
            status={investment.status}
            />
          })}
        </ul>
      </PaddedContainer>
      </div>

    </main>
    </>
    
  )
}
