import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSections() {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img src={assets.marvelLogo} alt="" />
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5' /> 2018
        </div>
        <div className='flex items-center  gap-1'>
          <ClockIcon className='w-4.5 h-4.5' /> 2h 18m
        </div>
      </div>
      <p className='max-wd-md text-gray-300'>A group of misfits becomes unlikely heroes as they fight to protect the galaxy from powerful threats.<br/>
        Action-packed, hilarious, and full of heart — this team doesn’t play by the rules.</p>
      <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 bg-primary px-6 py-3 text-sm hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore More 
        <ArrowRight className='w-5 h-5'/>
      </button>
    </div>
  )
}

export default HeroSections
