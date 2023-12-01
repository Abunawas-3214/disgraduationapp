'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Icons } from "@/components/icons"
import { useState, SyntheticEvent } from "react"
import { signIn } from "next-auth/react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { toast } = useToast()
    const router = useRouter()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        const res = await signIn('credentials', {
            name,
            password,
            redirect: false
        });

        if (res?.error) {
            setName('')
            setPassword('')

            toast({
                variant: "destructive",
                title: "Login Error!",
                description: "Username or password is incorrect",
            })
        } else {
            toast({
                title: "Login Success!",
                description: "You have successfully logged in",
            })
            router.refresh()
        }

        setIsLoading(false)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            UsernameEmail
                        </Label>
                        <Input
                            id="name"
                            placeholder="username or email"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            autoCorrect="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} type="submit">
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn('google')}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    )
}
