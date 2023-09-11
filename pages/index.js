import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState([]);
  const user = useSession();
  console.log(user)

  async function getSpotifyData () {
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: user?.data?.accessToken
      })
    })

    if (response.ok) {
      const data = await response.json()
      setData(data)
    }
  }

  async function logout() {
    await signOut()
  }

  useEffect(() => {
    getSpotifyData()
  }, [user])

  console.log(data)

  return (
    <Layout>
      <button onClick={() => console.log(getSpotifyData())}>
        get data
      </button>
      <button onClick={() => logout()}>
        Signout
      </button>
    </Layout>
  )
}
