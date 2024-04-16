import PagesOverview from '@/components/PagesOverview'
import UserSession from '@/components/UserSession'

const Home = async () => {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight text-gray-900">
        FairTalkAI - Django & Next.js starter kit
      </h1>

      <p className="mb-12 mt-2 max-w-4xl text-base leading-relaxed text-gray-600">
        FairTalkAI is minimal and opiniated starter kit for Django & Next.js
        projects connected via REST API. For the documentation please visit
        GitHub repository and in case of some feedback, dont hesitate to raise a
        ticket in{' '}
        <a
          href="https://github.com/unfoldadmin/fairtalkai/issues"
          className="underline text-purple-600"
        >
          Issues section
        </a>
        .
      </p>

      <UserSession />

      <hr className="my-8" />

      <PagesOverview />
    </>
  )
}

export default Home
