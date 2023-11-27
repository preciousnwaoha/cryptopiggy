import Link from 'next/link'
import React from 'react'
import { GroupType } from '@/types/site'

const Group = ({title, id}: GroupType) => {

  return (
    <div className='rounded-xl p-8 shadow-4 text-black bg-zinc-100 dark:bg-stone-900 dark:text-white'>
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