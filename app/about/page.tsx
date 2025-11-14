import AboutHero from '@/components/about/abouthero'
import OurJourney from '@/components/about/OurJourney'
import OurMission from '@/components/about/OurMission'
import OurValues from '@/components/about/OurValues'
import ServingRating from '@/components/about/ServingRating'
import React from 'react'

const page = () => {
  return (
    <div>
        <AboutHero />
        <OurMission />
        <OurValues />
        <OurJourney />
        <ServingRating />
    </div>
  )
}

export default page