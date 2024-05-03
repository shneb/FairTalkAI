import Head from 'next/head'
import HomePage from '@/components/HomePage'

const Home = () => {
  return (
    <>
      <Head>
        <title>FairTalAI</title>
        <meta name="description" content="FairTalAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  )
}

export default Home
