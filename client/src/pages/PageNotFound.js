import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
<div className='text-center min-h-screen h-50vh flex flex-col items-center justify-center'>
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Page Not Found</h1>
  <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">OOps! Something went Wrong.</p>
  <Link to="/" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
    Go Back
    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
    </svg>
  </Link>
</div>
    </Layout>
  )
}

export default PageNotFound