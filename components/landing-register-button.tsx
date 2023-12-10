'use client'
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function RegisterButton() {
    return (
        <Button
            size="lg"
            onClick={() => signIn()}
        >
            Join Us
        </Button>
    )
}
