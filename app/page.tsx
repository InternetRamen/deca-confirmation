import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='w-screen h-screen'>
        <a href="https://jaden.mov" className='underline text-blue-500'>Go Home</a>
        <p>You can close the tab.</p>
    </main>
  )
}
