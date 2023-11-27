import AppContext from '@/context/app-context'
import React, { useContext, useState } from 'react'
import { Contract } from 'ethers'

interface propTypes {
    groupId: number
}

const GroupView = ({groupId}: propTypes) => {
    const appCtx = useContext(AppContext)
    const {connected, savingGroups, contract, signer} = appCtx
    const [joinLoading, setJoinLoading] = useState(false)


    const group = savingGroups.filter((group, index) => group.id = groupId)[0]

    if (!group) {
        return <p>Group not found</p>
    }


    const handleJoinGroup = async () => {
        setJoinLoading(true)
        const response = await (contract!.connect(signer!) as Contract)["joinGroup(uint256)"](groupId)

        response.wait().then((res: any) => {
            if (res.status === 1) {
                // its done
                console.log(res)
            }
        }).catch((err: any )=> {
            console.log(err)
        });

        setJoinLoading(false)
    }

    
    const percentageSaved = group.savedAmount / group.targetAmount * 100;

    const timeLeftInWords = `${group.duration} days left`

    const barWidth = percentageSaved ? `w-[${percentageSaved}%]` : "w-1"

    const classGen = `${barWidth} h-full bg-red-600 rounded-full`
    

  return (
    <div>
        <h1 className={`text-3xl font-semibold mb-8`}>{group.title}</h1>

        <p className={`mb-4 `}>Lets see what we can do. You know you if you know you deserve a vacation, Let us save up!</p>
        
        <div className='flex items-center mb-4'>
            
            <div className={`w-full h-3 bg-gray-100 rounded-full`}>
                <div className={classGen}>

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

            {!joinLoading ? <button className='btn btn-contained mb-4' onClick={handleJoinGroup}>
                Join Group
            </button> : <div className='my-8 text-2xl mx-auto text-center text-red-600 '>
                Joining Group...</div>}

            {group.groupMembers.length > 0 ? <>
            <h3 className='text-center text-lg font-semibold mb-2'>Members</h3>
            <div className='text-sm '>
                {group.groupMembers.map((member, index )=> {
                    return <div key={index} className='mb-2'>
                       {"1: "} { member}
                    </div>
                })}
            </div>
            </> : <h3 className='text-center text-lg font-semibold'>No Members</h3>}
            
        </div>
        
    </div>
  )
}

export default GroupView