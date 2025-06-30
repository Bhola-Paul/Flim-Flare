import React from 'react'
import { assets } from '../assets/assets'
import { GithubIcon, LinkedinIcon } from 'lucide-react'

function Footer() {
  return (
    <footer className="px-6 mt-30 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-14 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img className="w-36 h-auto" src={assets.flimflare} alt="logo" />
          <p className="mt-6 text-sm">
            This is a personal project showcasing a movie booking experience. Inspired by real-world platforms, it demonstrates front-end and back-end integration.
          </p>
          <div className="flex items-center gap-2 mt-4">
            {/* <img src={assets.googlePlay} alt="google play" className="h-10 w-auto " />
            <img src={assets.appStore} alt="app store" className="h-10 w-auto" /> */}
            <div className='flex flex-col items-center gap-2'>
                <img src="/github-mark-white.png" alt="" className='w-9 h-9' />
                <a href="" className='text-sm text-gray-400 hover:scale-95 transition hover:text-white'>Click Here</a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91 6909467041</p>
              <p>paulbhola1987@gmail.com</p>
              <div className='flex gap-2'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © Bhola Paul. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
