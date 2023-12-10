import Navbar from '@/components/site-header'
import React from 'react'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className='px-44'>
                {children}
            </main>
        </>
    )
}
