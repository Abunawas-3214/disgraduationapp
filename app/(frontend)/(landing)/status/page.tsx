'use client'
import { useSession } from "next-auth/react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Status() {
    const { data: session } = useSession()
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-12 py-24'>
            <div>
                <h1 className='text-5xl font-bold capitalize'>Status anda: {session?.user.status}</h1>
            </div>
            <div>
                <Button>
                    <Link href='/'>
                        Back
                    </Link>
                </Button>
            </div>
        </div>
    )
}
