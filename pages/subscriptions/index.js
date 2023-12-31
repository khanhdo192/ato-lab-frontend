import React, { useState, useMemo } from 'react';
import Router from 'next/router'

import useSWR from 'swr'

import { postFetcher, getFetcher } from '@/lib/fetcher'
import { progress } from '@/utils/calculate'

import { toArrayBuffer } from '@/utils/parser'

import Nav from '@/components/nav'
import Header from '@/components/header'
import UserThumb from '@/components/userThumb'

import Breadcrumb from '@/components/breadcrumb'
import BreadcrumbItem from '@/components/breadcrumbItem'

import TextH1 from '@/components/textH1'
import TextH2 from '@/components/textH2'

import Divider from '@/components/divider'
import BtnUp from '@/components/btnUp'

import Container from '@/components/container'
import ContainerCol_4 from '@/components/containerCol_4'

import FeedbackMsg from '@/components/feedbackMsg'
import Spinner from '@/components/spinner'

import SubscriptionItem from '@/components/subscriptionItem'
import axios from 'axios';

export default function SubscriptionsPage({ user }) {

  // default states
  const defaultFeedback = { isFeedback: false, type: '', message: '' }

  // states
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const [feedback, setFeedback] = useState(defaultFeedback)
  const [pdfUrl, setPdfUrl] = useState('')

  // handlers
  const handleDownloadInvoice = async (subscription) => {
    try {
      const data = await postFetcher({ productTypeId: Number(subscription?.productType?.id) }, { responseType: 'arraybuffer' })('/pp/invoices/download')
      const Url = window.URL.createObjectURL(new Blob([toArrayBuffer(data?.data)], { type: "application/pdf" }))
      window.open(Url)
      return setPdfUrl(Url)
    }
    catch(e) {
      console.log('error', e)
    }
  }

  // Data fetch
  const { data, error } = useSWR('/subscrs/getSubscriptionList', postFetcher({userId: user?.id}));

  const subscriptions = useMemo(() => {
    try {
    
      if (data && !subscriptions) {
        const subscriptionsListWithProgress = data?.result?.data.map((subscr) => { return { ...subscr, progress: progress(subscr) } });
        return subscriptionsListWithProgress
      }
  
      if (error && !feedback.isFeedback)
        setFeedback({ isFeedback: true, type: 'error', message: 'The subscriptions could not be loaded.' })
    } catch (error) {
      setFeedback({ isFeedback: true, type: 'error', message: error.message })
    }
  }, [data?.result?.data, error?.data])
  

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">

      {/*  Sidebar  */}
      <Nav status={isSideBarOpen} setStatus={setIsSideBarOpen} activeSection={'subscriptions'} />

      {/*  Content  */}
      <div className="relative z-0 w-full p-2 pt-20 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu 2xl:ml-0 py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>

          {/*  Breadcrumbs  */}

          <Breadcrumb>
            <BreadcrumbItem isFirst label="subscriptions" />
          </Breadcrumb>

          {/*  User info  */}

          <div>
            {/* User UI  img="/images/user-fake.jpg"   */}
            <UserThumb alt={!!user ? user.name : ""} />
          </div>
        </Header>

      {/*  Content  */}
      <div className="w-full p-2 lg:py:0 lg:px-8">

        {/*  Content per PAGE  */}
        <section>
          
          { feedback.isFeedback 
            ? 
            <Container>
              <FeedbackMsg type={feedback.type} text={feedback.message}/>
            </Container>
            : null
          }

          <Container>
            {/* Title + subtitles */}
            <TextH1 text="Subscriptions Overview" />
            <TextH2 text="An overiew of all your current subscriptions are listed below." />

            <Divider />

            {
              subscriptions
              ? 
                <ContainerCol_4>
                  {subscriptions.map((subscription, index) =>
                    <SubscriptionItem
                      invoice={subscription.invoice}
                      subscriptionCode={subscription.subscriptionCode}
                      activated={new Date(subscription.activated).toLocaleDateString()}
                      until={new Date(subscription.validUntil).toLocaleDateString()}
                      service={subscription.productType.name}
                      percentageExpended={subscription.progress}
                      isEmpty={subscription.status !== "Is_Subscrs" ? true : false}
                      key={index} 
                      onClick={() => handleDownloadInvoice(subscription)}
                    />
                  )}
                </ContainerCol_4>
              : 
                <div className="justify-center">
                  <Spinner isLoading />
                </div>
            }

          </Container>

        </section>

        <BtnUp />

      </div>
      </div>
    </main>
  )
}
