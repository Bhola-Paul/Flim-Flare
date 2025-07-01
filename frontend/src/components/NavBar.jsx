import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { BrainIcon, HeartIcon, MenuIcon, SearchIcon, Ticket, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import BlurCircle from './BlurCircle';
import LogoutButton from './LogoutButton';

function NavBar() {
  const [isOpen,setIsOpen]=useState(false);
  const {user}=useUser();
  const {openSignIn}=useClerk();
  const navigate=useNavigate();
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'> 
        {/* logo */}
      <Link to='/' className='max-md:flex-1 '>
        <img src={assets.flimflare} alt="" className='w-36 h-auto backdrop-blur bg-white/10 border border-white/20 rounded-full p-2 shadow-md'/>
      </Link>

      {/* menu items */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-4 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-200/20 
        overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon onClick={()=>setIsOpen(!isOpen)} className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'/>
        <Link to="/" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='text-sm'>Home</Link>
        <Link to="/movies" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='text-sm'>Movies</Link>
        <Link to="/" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='text-sm'>Theaters</Link>
        <Link to="/" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='text-sm'>Releases</Link>
        <Link to="/my-bookings" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='text-sm'>Bookings</Link>
        <Link to="/ask-ai" onClick={()=>{scrollTo(0,0);setIsOpen(!isOpen)}} className='flex items-center gap-1'>
          <BrainIcon className='color-primary fill-primary w-6 h-6' strokeWidth={1}/>
          <p className='text-sm font-semi-bold text-white md:hidden lg:block'><span className='text-yellow-400'>AI</span> Assist</p>
        </Link>
      </div>
      
        {/* login and search */}
      <div className='flex items-center gap-8 '>
        {/* <SearchIcon className='max-md:hidden w-9 h-9 cursor-pointer backdrop-blur bg-white/10 border border-white/20 rounded-full p-1 shadow-md'/> */}
        
        <Link to="/favorite" onClick={()=>{scroll(0,0)}}>
          <HeartIcon className='w-7 h-7 text-white fill-primary hover:scale-95 transition ' strokeWidth={1}/>
        </Link>
        {
            user ? (<button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>) : 
            // (<UserButton>
            //     <UserButton.MenuItems>
            //         <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')} />
            //     </UserButton.MenuItems>
            // </UserButton>)
            (<LogoutButton className='w-4 h-4'/>)
        }
      </div>

      {/* menu icon for mobile */}
      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>
    </div>
  )
}

export default NavBar
