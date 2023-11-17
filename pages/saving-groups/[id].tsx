import Header from '@/components/layout/header'
import Image from 'next/image'
import PaddedContainer from '@/components/layout/padded-container'
import Footer from '@/components/layout/footer'
import {Router, useRouter} from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { GroupType } from '@/types/site'
import AppContext from '@/context/app-context'
import GroupView from '@/components/groups/group-view'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// ${inter.className}

export default function Home() {
  const router = useRouter()
  const appCtx = useContext(AppContext)
  const [group, setGroup] = useState<GroupType | undefined>()

  const {connected, savingGroups, getAllSavingGroups } = appCtx
  const savingGroupId = Number(router.query.id)

  
  useEffect(() => {
    if (connected) {
      getAllSavingGroups()
    }
  }, [connected, getAllSavingGroups])


  if ((typeof savingGroupId === 'number') && (savingGroupId)  ) {

  }

  


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Header />
      <div className={`border mt-[78px] md:mt-[86px]`}>
      <PaddedContainer className={``}>
        <GroupView groupId={savingGroupId} />
      </PaddedContainer>
      </div>
    </main>
  )
}
