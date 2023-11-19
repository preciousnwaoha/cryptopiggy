import {useState} from "react"
import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import { useContext, useEffect } from 'react'
import AppContext from '@/context/app-context'
import NotConnected from '@/components/not-connected'
import Group from '@/components/groups/group'
import Link from 'next/link'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}


export default function Home() {
    const appCtx = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    const {connected, savingGroups, getAllSavingGroups} = appCtx


    useEffect(() => {
        if (connected) {
            getAllSavingGroups()
        }
    }, [connected])



    if (!connected) {
        return <NotConnected />
    }

    if (!savingGroups || (savingGroups.length === 0)) {
        return <main
        className={`flex min-h-screen flex-col items-center justify-between `}
      >
        <Header />
      
          <div className={`border mt-[78px] md:mt-[86px]`}>
  
              <PaddedContainer className={``}>
                  <p className='text-3xl font-sembold text-center mb-4'>No Groups Yet!</p>
            </PaddedContainer>
        </div>

    </main>
    }


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Header />
    
        <div className={`mt-[78px] md:mt-[86px]`}>
            

            <PaddedContainer className={``}>
                <h1 className='text-5xl font-sembold text-center mb-4'>Join a Saving Group to Earn More</h1>

                <p className='text-lg mb-4 text-center'>Earn more benefits</p>

                <div className={`flex items-center justify-center`}>
                  <Link href={"/saving-groups/create"}>
                    <button className={`btn btn-contained `}>Create Group</button>
                  </Link>
                  
                </div>
            </PaddedContainer>
        </div>

        <div>
          <PaddedContainer>
          <ul className={`grid grid-cols-2 lg:grid-cols-3 gap-4`}>
                    {savingGroups.map((group, index) => {
                        return <Group key={index}
                        id={group.id}
                        targetAmount={group.targetAmount}
                        savedAmount={group.savedAmount}
                        duration={group.duration} 
                        visibility={group.visibility}
                        groupMembers={group.groupMembers}
                        creator={group.creator}
                        title={group.title}
                        description={group.description}
                        createdAt={group.createdAt}
                        />
                    })}
                </ul>
          </PaddedContainer>
        </div>
 
      <Footer />

    </main>
  )
}
