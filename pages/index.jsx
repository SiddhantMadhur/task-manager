import { CircularProgress } from '@mui/material'
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)



function SignedOut(props) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const sendEmail = async () => {
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
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder='Email' />
          </div>
          <div className='bg-green-400 w-fit mx-auto px-2 rounded-lg'>
            <button onClick={sendEmail}>Send Magic Link</button>
          </div>
        </div>

      </div>
    </div>
  )
}

function TaskPage(props) {

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  const user = props.user
  const [content, setContent] = useState('')

  const createData = async() => {
    const { data, error } = await supabase.from('tasks').insert([
      {
        user_id: user.id,
        content: content
      }
    ])
    setContent('')
  }

  

  return (
    <div >
      <div>
        <button onClick={signOut}>sign out</button>
      </div>
      <div className='flex flex-col gap-y-5'>
        <div>
          <h1 className='text-xl'>
            Hi, {user.user_metadata.username}
            
          </h1>
        </div>
        <div className='flex mx-auto gap-2 w-1/2'>
            <input onChange={e=>setContent(e.target.value)} value={content} className='dark:bg-gray-600 border-2 w-full px-2  py-1 border-black rounded-lg'></input> 
            <button onClick={createData} className='text-xl bg-green-300 my-auto hover:bg-green-500 transition rounded-xl'>📨</button>
        </div>
      </div>

    </div>
  )
}



export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      setIsDark(true)
    }
  }, [])


  const [user, setUser] = useState()
  useEffect(() => {
    const getData = async () => {
      const session = supabase.auth.session()
      const user = supabase.auth.user()
      setUser(user)
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
        <title>Tecna Tasks</title>
      </Head>
      <main className='h-screen dark:bg-gray-800 dark:text-gray-100 text-center'>
        <div className=''>
          <br />
          <h1 className='text-4xl'>
            Tecna Tasks
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
                    <TaskPage user={user}></TaskPage>
                  ) : (
                    <SignedOut setError={setError}></SignedOut>
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
