import ProfileForm from "@/components/onboarding/profile-form"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function OnBoarding() {
    const session = await getServerSession(authOptions)
    return (
        <div className="hidden space-y-6 md:block max-w-2/3 mx-auto mb-8">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Welcome {(session?.user.name)?.split(" ")[0]} to DIS Graduation App</h2>
                <p className="text-muted-foreground">
                    Fill out the form below to get started.
                </p>
            </div>
            <Separator className="my-6" />
            <ProfileForm id={session?.user.id} />
        </div>
    )
}
