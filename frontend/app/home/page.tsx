import Head from 'next/head'
import PagesOverview from '@/components/PagesOverview'
import UserSession from '@/components/UserSession'

import HomePage from '@/components/HomePage'
import { getSession, GetSessionParams } from 'next-auth/react'

const Home = () => {
  return (
    <>
      <Head>
        <title>FairTalAI</title>
        <meta
          name="description"
          content="A simple chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />

      {/* <UserSession /> */}
      {/* <hr className="my-8" />

      <PagesOverview /> */}
    </>
  )
}

export default Home
