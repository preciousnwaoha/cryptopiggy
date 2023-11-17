import AppContext from '@/context/app-context'
import React, { useContext } from 'react'
import { Contract } from 'ethers'

interface propTypes {
    groupId: number
}

const dumdum =
{
    id: 2,
    creator: "0x7476deB582C24610511D16266E972DF5d2895bc7",
    targetAmount: 100,
    title: "Save for your business",
    description: "Setup a personal savings goal for your Business.",
    duration: 10,
    visibility: 1,
    groupMembers: [],
}

const GroupView = ({groupId}: propTypes) => {
    const appCtx = useContext(AppContext)
    const {connected, savingGroups, contract, signer} = appCtx


    const group = savingGroups.filter((group, index) => group.id = groupId)[0]

    if (!group) {
        return <p>Group not found</p>
    }


    const handleJoinGroup = async () => {
        
        const response = await (contract!.connect(signer!) as Contract).joinGroup(groupId)

        console.log(response)
      
    }

    
    const percentageSaved = group.savedAmount / group.targetAmount * 100;

    const timeLeftInWords = "6 months left"
    

  return (
    <div>
        <h1 className={`text-3xl font-semibold mb-8`}>{group.title}</h1>

        <p className={`mb-4 `}>Lets see what we can do. You know you if you know you deserve a vacation, Let us save up!</p>
        
        <div className='flex items-center mb-4'>
            
            <div className={`w-full h-3 bg-gray-100 rounded-full`}>
                <div className={`w-[63%] h-full bg-red-600 rounded-full`}>

                </div>
            </div>

            <div className='text-2xl  whitespace-nowrap ml-4 text-red-600'>
            {percentageSaved}%
            </div>
        </div>

        <div className={`bg-red-600 text-white rounded-lg p-4 flex justify-between divide-x text-center text-xl divide-[#fba3a3] mb-4`}>
            <div className={`w-1/2`}>
                <div>
                {group.savedAmount} ETH
                </div>
            </div>

            <div className={`w-1/2`}>{group.targetAmount} ETH</div>
        </div>

        <div className={`mb-4 text-center text-xl `}>
           {timeLeftInWords}
        </div>

        <div className={``}>

            <button className='btn btn-contained' onClick={handleJoinGroup}>
                Join Group
            </button>
        
        </div>
        
    </div>
  )
}

export default GroupView