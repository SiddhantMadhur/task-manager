import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      setIsDark(true)
    }
  }, [])



  return (
    <div className={isDark ? 'dark' : ''}>
      <Head>
        <title>Task Manager</title>
      </Head>
      <main className='h-screen dark:bg-gray-800 dark:text-gray-100'>
        <div className='text-center '>
          <br />
          <h1 className='text-4xl'>
            Task Manager
          </h1>
          <h4>
            made by @siddhantmadhur <br />
            open sourced on <span className='text-blue-500 hover:text-blue-800'><a target={'_blank'} href='https://github.com/SiddhantMadhur/task-manager'>Github</a></span>

          </h4>
          <h6 className='text-sm'>
            {
              !isDark ? (
                <button onClick={() => {
                  setIsDark(true)
                  localStorage.setItem('dark', 'true')
                }}>
                  enable dark mode
                </button>
              ) : (
                <button onClick={() => {
                  setIsDark(false)
                  localStorage.removeItem('dark')
                }}>
                  enable light mode
                </button>
              )
            }


          </h6>
        </div>
      </main>
    </div>
  )
}
