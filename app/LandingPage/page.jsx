"use client";
import React from 'react'
import HomeComponent from './DrawerAppBar'
import ProgramComponent from './ProgramComponent'
import CommitmentSection from './CommitmentSection'
import ChooseClassSection from './ChooseClassSection'
import OurTrainersSection from './OurTrainersSection'
import SubscribeSection from './SubscribeSection'
import Footer from './Footer'

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