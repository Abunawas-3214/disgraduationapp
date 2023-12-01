'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function ErrorAuthPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-12'>
            <div>
                <h1 className='text-5xl font-bold capitalize'>{error}</h1>
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
