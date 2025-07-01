'use client'
import React from 'react'
import HomeComponent from './LandingPage/DrawerAppBar'
import ProgramComponent from './LandingPage/ProgramComponent'
import CommitmentSection from './LandingPage/CommitmentSection'
import ChooseClassSection from './LandingPage/ChooseClassSection'
import OurTrainersSection from './LandingPage/OurTrainersSection'
import SubscribeSection from './LandingPage/SubscribeSection'
import Footer from './LandingPage/Footer'
import { useLocale, useTranslations } from 'next-intl'

const page = () => {
  const t = useTranslations('page')
  const lang = useLocale()
  console.log(t("title"))
  console.log(lang)


  return (
    <div >
      
        <HomeComponent />
        <ProgramComponent />
        <CommitmentSection />
        <ChooseClassSection />
        <OurTrainersSection />
        {/* <SubscribeSection /> */}
        <Footer />
    </div>
  )
}

export default page