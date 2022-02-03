import { CircularProgress } from '@mui/material'
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)



function SignedOut() {
  const [email, setEmail] = useState('')
  const sendEmail = async() => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email
    }) 
  }
  
  return (
    <div className='mt-5'>
      <div>
        <h1 className='my-2'>
          Sign In
        </h1>
        <div className='flex flex-col gap-2 text-black'>
          <div>
            <input onChange={e=>setEmail(e.target.value)} type="text" placeholder='Email' />
          </div>
          <div>
            <input type="password" placeholder='Password' />
          </div>
          <div className='bg-green-400 w-fit mx-auto px-2 rounded-lg'>
            <button onClick={sendEmail}>LOGIN</button>
          </div>
        </div>

      </div>
    </div>
  )
}

function TaskPage() {
  return (
    <div >
      Logged in
    </div>
  )
}



export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      setIsDark(true)
    }
  }, [])


  useEffect(() => {
    const getData = async () => {
      const session = supabase.auth.session()
      console.warn(session)
      if (session !== null) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
      setLoading(false)
    }
    getData()
  }, [])


  return (
    <div className={isDark ? 'dark' : ''}>
      <Head>
        <title>Task Manager</title>
      </Head>
      <main className='h-screen dark:bg-gray-800 dark:text-gray-100 text-center'>
        <div className=''>
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
        <div>
          {
            loading ? (
              <div className='grid place-items-center mt-10'>
                <CircularProgress />
              </div>
            ) : (
              <div>
                {
                  isAuth ? (
                    <TaskPage></TaskPage>
                  ) : (
                    <SignedOut></SignedOut>
                  )
                }
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}
