import Link from 'next/link'
import React, {useState} from 'react'

const NAV_ITEMS = [
  {
    text: "home",
    link: "/"
  },
  {
    text: "account",
    link: "/account"
  },
  // {
  //   text: "news",
  //   link: "/news"
  // },
  {
    text: "invest",
    link: "/investments"
  },
  {
    text: "groups",
    link: "/saving-groups"
  },
  {
    text: "PIGGY",
    link: "/piggy"
  },
  {
    text: "about",
    link: "/about"
  },

]

const NavContent = () => {


    return <>

        
        


        <ul className='w-full block'>
          {NAV_ITEMS.map((item, index) => {
            return <Link key={index} href={item.link} >
            <li className={`block px-4 py-2 my-0 mb-4 rounded-lg bg-stone-900 capitalize  hover:bg-stone-800`}>
              {item.text}
              </li>
            </Link>
  
          })}
        
        </ul>
      </>
}


const NavDrawer = () => {
    const [open, setOpen] = useState(false)

    const handleToggleOpen = () => {
        setOpen(prev => !prev)
      }

  return (
    <>
        <button onClick={handleToggleOpen} className='inline-block md:hidden'>
            Menu
        </button>

        <div className={`fixed top-0 w-[230px] z-[100] h-screen bg-stone-950 ${open ? "right-0": "right-[-230px]"} p-4 block md:hidden`}>
        <div className='flex flex-col mb-4'>
        <button className='btn btn-icon self-end bg-stone-900 ' onClick={handleToggleOpen}>
          &times;
        </button>
        </div>
        <NavContent />
        </div>
        
    </>
  )
}

export default NavDrawer