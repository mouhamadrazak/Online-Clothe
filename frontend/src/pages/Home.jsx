// eslint-disable-next-line no-unused-vars
import React from 'react'
import Hero from '../componens/Hero'
import LatestCollection from '../componens/LatestCollection'
import BestSeller from '../componens/BestSeller'
import OurPolicy from '../componens/OurPolicy'
import NewsLetterBox from '../componens/NewsLetterBox'


const Home = () => {
  return (
    <div>
   <Hero/> 
   <LatestCollection/> 
   <BestSeller/>
   <OurPolicy/>
   <NewsLetterBox/>
    </div>
  )
}

export default Home
