import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import PaddedContainer from '../layout/padded-container'
import useInput from '@/hooks/use-index'
import { DURATION_TYPES, VISIBILITY_TYPES } from '@/config/site-data'
import { durationToDaysAndTimeStamp, toWei } from '@/lib/utils'
import {useRouter} from "next/router"
import AppContext from '@/context/app-context'
import { Contract } from 'ethers'

const CreateGroup = () => {
    const router = useRouter()
    const appCtx = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [target, setTarget] = useState(0)
    const [duration, setDuration]= useState(0);
    const [durationType, setDurationType]= useState(0);
    const [visibility, setVisibility]= useState(0);

   

    const [titleHasError, setTitleHasError] = useState(false)
    const [descriptionHasError, setDescriptionHasError] = useState(false)
    const [targetHasError, setTargetHasError] = useState(false)
    const [durationHasError, setDurationHasError]= useState(false);
    const [visibilityHasError, setVisibilityHasError]= useState(false);

    const {signer, contract, connected} = appCtx


    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTarget(Number(e.target.value))
    }

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value))
    }

    const handleDurationTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDuration(Number(e.target.value))
    }

    const handleVisibilityChange =  (e: ChangeEvent<HTMLSelectElement>) => {
        setVisibility(Number(e.target.value))
    }


    let formIsValid = true;

    if (titleHasError || descriptionHasError || targetHasError || durationHasError) {
        formIsValid = false
    }

    const handleCreateGroup = async (e: FormEvent ) => {
        e.preventDefault()
        if (title.trim() === "") {
            setTitleHasError(true)
            return
        }

        if (description.trim() === "") {
            setDescriptionHasError(true)
            return
        }

        if (target <= 0) {
            setTargetHasError(true)
            return
        }

        if (duration <= 0) {
            setDurationHasError(true)
            return
        }

        const {days} = durationToDaysAndTimeStamp(duration, durationType)

        setLoading(true)

        const response = await (contract!.connect(signer!) as Contract)
        ["createGroup(uint256 _duration, uint256 _targetAmount, uint8 _visibility, string _title, string _description,  uint256 _category )"]
        ( BigInt(`${days}`), BigInt(toWei(`${target}`)), BigInt(`${visibility}`), title, description, BigInt("1"))

        response.wait().then((res: any) => {
            if (res.status === 1) {
                // its done
                console.log(res)
                setCreated(true)
                // get group id
                router.push("/saving-groups")
            }
        }).catch((err: any )=> {
            console.log(err)
        });

        setLoading(false)

        
    }


  return (
    <div className={`w-full`}>
        <PaddedContainer className={`flex justify-center`}>
            {created ? <div className='text-center p-4'>
                created
            </div> : <>
            {!loading ? <form className={`border w-full max-w-[500px] p-4`} onSubmit={handleCreateGroup}>
                <div className="w-full mb-4">
                    <label htmlFor='grp-title' className={` block mb-2`}>Title</label>
                    <input value={title} id="grp-title" placeholder="Save for your Vacation." onChange={handleTitleChange} className='rounded-lg px-4 py-2 w-full text-black bg-zinc-100 dark:bg-stone-900 dark:text-white ' />
                </div>

                <div className="w-full mb-4">
                    <label htmlFor='grp-title' className={` block mb-2`}>Description</label>
                    <div className='rounded-lg w-full h-[200px] overflow-hidden'>
                        <textarea value={description} id="grp-title" placeholder="Save for your Vacation." onChange={handleDescriptionChange} className=' px-4 py-4 w-full h-full text-black bg-zinc-100 dark:bg-stone-900 dark:text-white overflow-hidden' ></textarea>
                    </div>
                    
                </div>
                

                <div className='grid grid-cols-12 gap-4'>
                    <div className="w-full mb-4 text-center col-span-12 md:col-span-6  lg:col-span-4">
                        <label htmlFor='grp-target' className={`block mb-2 `}>Goal</label>
                        <input value={target}  type="number" id="grp-target" min="0"  step="0.0000001" placeholder="0" onChange={handleTargetChange} className='rounded-lg p-4 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white text-center' />
                    </div>
                    <div className="w-full mb-4 text-center col-span-12 md:col-span-6 lg:col-span-5">
                        <label htmlFor='grp-duration' className={` block mb-2`}>Duration</label>
                        <div className='grid gap-4 grid-cols-2'>
                            <select value={durationType} id="grp-duration" placeholder="days" onChange={handleDurationTypeChange} className='rounded-lg p-4 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white text-center'  >
                                {DURATION_TYPES.map((type, index) => {
                                    return <option key={index} value={index} className={`capitalize`}>{type}{(index === durationType) && ":"}</option>
                                })}
                            </select>

                            <input value={duration}  type="number" id="grp-target" placeholder="0 ETH" onChange={handleDurationChange} step="1" min="0" className='rounded-lg p-4 w-full text-black bg-zinc-100 dark:bg-stone-800 dark:text-white text-center' />
                        </div>
                    </div>

                    <div className=" w-full mb-4 text-center col-span-12 lg:col-span-3">
                        <label htmlFor='grp-visibility' className={`lg:block mb-2 mr-4 hidden `}>Visibility</label>
                        <select value={visibility} id="grp-visibility" placeholder="days" onChange={handleVisibilityChange} className='rounded-lg p-4 text-black bg-zinc-100 dark:bg-stone-800 dark:text-white text-center w-full'  >
                                {VISIBILITY_TYPES.map((type, index) => {
                                    return <option key={index} value={index} className={`capitalize`}>{type}</option>
                                })}
                            </select>
                    </div>
               
                </div>


               
               <button className='btn btn-contained my-4' type={"submit"}>Create Group</button>

            </form> : <div className='text-center p-4'>
                                Loading...
                </div>}
            </>}
            
        </PaddedContainer>
    </div>
  )
}

export default CreateGroup