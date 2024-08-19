import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[40px] text-center mt-16'>
            <span className='text-[#5417d7]'>Discover your next adventures with AI:</span>Personalised itineraries at your Fingertips
        </h1>
        <p className='text-l text-gray-500 text-center'>
            Your personal trip planner and travel curator,creating custom itineraries tailored to your interests
        </p>
        <Link to={'/create-trip'}>
        <Button>Get Started </Button>
        </Link>
        
    </div>
  )
}

export default Hero