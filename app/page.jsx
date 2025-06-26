import React from 'react'
import HomeComponent from './LandingPage/DrawerAppBar'
import ProgramComponent from './LandingPage/ProgramComponent'
import CommitmentSection from './LandingPage/CommitmentSection'
import ChooseClassSection from './LandingPage/ChooseClassSection'
import OurTrainersSection from './LandingPage/OurTrainersSection'
import SubscribeSection from './LandingPage/SubscribeSection'
import Footer from './LandingPage/Footer'

const page = () => {
  return (
    <div >
        <HomeComponent />
        <ProgramComponent />
        <CommitmentSection />
        <ChooseClassSection />
        <OurTrainersSection />
        <SubscribeSection />
        <Footer />
    </div>
  )
}

export default page