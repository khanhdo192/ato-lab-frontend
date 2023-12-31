import React from 'react';

import { IcoDash } from '../components/icons'

import TextH1 from '../components/textH1'
import TextH2 from '../components/textH2'
import TextH4 from '../components/textH4'

import Divider from '../components/divider'

import Btn from '../components/btn'

import FormItemInput from '../components/formItemInput'

import BtnUp from '../components/btnUp'

import Container from '../components/container'
import ContainerCol_2 from '../components/containerCol_2'

import FeedbackMsg from '../components/feedbackMsg'


export default function AssetsProfile() {

  return (
    <main className="flex w-full min-h-screen 2xl:min-h-main m-auto max-w-screen-2xl 2xl:my-8">
    
      
      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        
        {/*  Content per PAGE  */}
        <section>

          <Container>
            {/* Title + subtitles */}
            <TextH1 text="Hello" highliteText="Eddie ELITT Huang" />
            <TextH2 text="Password must containt at least 8 characters - including Uppercase, Lowercase, Special & Number characters." isInfo/>
            
            <Divider />
            
            <ContainerCol_2>
                <Container hasBorder>
                    <TextH4 text="User Information" />
                    
                    <div className="mb-6">
                      <FeedbackMsg type="success" text="This is a Success message, please read it" />
                      <FeedbackMsg type="error" text="This is a Success message, please read it" />
                    </div>
                    
                    <FormItemInput id="u0" label="Name" value="Eddie ELITT Huang" />
  
                    <FormItemInput id="u1" type="email" label="Email" value="eddie.huang+elitt@atomworks.io" />
                    
                    <Btn ico="save" label="Save" />
                </Container>
                <Container hasBorder>
                    <TextH4 text="Change Password" />
                    
                    {/*  ERRORRRSSS / Success for Passwords
                    <div className="mb-6">
                      <FeedbackMsg type="success" text="This is a Success message, please read it" />
                      <FeedbackMsg type="error" text="This is a Success message, please read it" />
                    </div> */}
  
                    <FormItemInput id="p0" type="password" label="Current Password" placeholder="Enter Current Password" />
                    
                    <FormItemInput id="p1" type="password" label="New Password" placeholder="Enter New Password" />
                    
                    <FormItemInput id="p2" type="password" label="Confirm new Password" placeholder="Enter New Password" />
                    
                    <Btn label="Change password" secondary />
                </Container>
            </ContainerCol_2>

          </Container>
            
  
        </section>
        
        <BtnUp />
        
      </div>
    </main>
  )
}
