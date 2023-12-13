import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RegisterButton from "@/components/landing-register-button"
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <div className="text-center h-screen flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold mb-2">Welcome To</h2>
        <h1 className="text-7xl font-extrabold">DISGRADUATION APP</h1>
        <p className="text-xl text-primary opacity-50 font-normal mt-24">The ultimate platform crafted solely for graduation Photographers. Seamlessly connecting Photographers with potential clients, our user-friendly interface enables professionals to bid on job listings, manage bookings, and communicate effortlessly. Elevate your photography career with Disgraduation, your dedicated portal for capturing unforgettable graduation moments.</p>
        <div className="flex gap-4 mt-12 justify-center">
          {session?.user.level !== "ADMIN" && (
            session?.user.status === "APPROVED" ? (
              <Link href="/jobs">
                <Button
                  size="lg"
                >
                  Find Job
                </Button>
              </Link>

            ) : (
              <RegisterButton />
            ))}

          <Button
            variant="outline"
            size="lg"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  )
}
