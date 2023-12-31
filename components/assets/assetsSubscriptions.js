import React from 'react';

import { IcoDash } from '../components/icons'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'

import Divider from '../components/divider'

import Btn from '../components/btn'
import BtnUp from '../components/btnUp'

import Container from '../components/container'
import ContainerCol_4 from '../components/containerCol_4'

import SubscriptionItem from '../components/subscriptionItem'


export default function AssetsUserManagement() {

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
    
      
      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        
        {/*  Content per PAGE  */}
        <section>

          <Container>
            {/* Title + subtitles */}
            <TextH1 text="Subscriptions Overview" />
            <TextH2 text="An overiew of all your current subscriptions are listed below." />
            
            <Divider />
            
            <ContainerCol_4>
                  
                  <SubscriptionItem invoice="T15M-0002" activated="2020-11-30" until="2021-01-31" percentageExpended="32" />
                  
                  <SubscriptionItem invoice="ACSS-2MT1" activated="2020-12-21" until="2021-02-11" percentageExpended="85" />
                  
                  <SubscriptionItem invoice="T15M-0777" activated="2020-12-22" until="2020-12-28" percentageExpended="100" />
                  
                  <SubscriptionItem isEmpty />
            </ContainerCol_4>

          </Container>
            
  
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}
