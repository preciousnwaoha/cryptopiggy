import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import {Router, useRouter} from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { GroupType, InvestmentType } from '@/types/site'
import AppContext from '@/context/app-context'
import GroupView from '@/components/groups/group-view'
import { INVESTMENTS } from '@/config/dummy'
import InvestmentView from '@/components/investments/investment-view'
import NotConnected from '@/components/not-connected'
import InvalidRoute from '@/components/invalid-route'
import { Contract } from 'ethers'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}



export default function Home() {
  const router = useRouter()
  const appCtx = useContext(AppContext)
  const [investment, setInvestment] = useState<InvestmentType | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const {connected, contract, signer } = appCtx
  const investmentId = Number(router.query.id)

  

  
  useEffect(() => {

    const getInvestment = async () => {
      // const response = await (contract!.connect(signer!) as Contract).getInvestmentById(investmentId)
      // console.log(response)

      const item = INVESTMENTS.filter((investment, index) => investment.id === investmentId)[0]
      setInvestment(item)
      setLoading(false)
    }

    if (connected) {
      setLoading(true)
      getInvestment()

    }
  }, [connected])

  console.log({investmentId})

  if ((typeof investmentId === 'number') && (investmentId)  ) {
    return <InvalidRoute />
  }

  


  if (!connected) {
    return <NotConnected />
  }


  if (!investment) {
    return <p>Investment not found</p>
  }


 

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between mt-[78px] md:mt-[86px] `}
    >
      <Header />
      <div className={``}>
      <PaddedContainer className={``}>
        <InvestmentView investment={investment} />
      </PaddedContainer>
      </div>
     


    </main>
  )
}
