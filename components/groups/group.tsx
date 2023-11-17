import Link from 'next/link'
import React from 'react'
import { GroupType } from '@/types/site'

const Group = ({title, id}: GroupType) => {

  return (
    <div className='rounded-xl p-8 shadow-4 bg-stone-950'>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>

    <Link href={`/saving-groups/${id}`}>
        <button className='btn btn-contained btn-small uppercase'>
            view group
        </button>
    </Link>
        
    </div>
  )
}

export default Group