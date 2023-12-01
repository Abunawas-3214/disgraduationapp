import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
export default async function Home() {
  const session = await getServerSession(authOptions)
  // if (!session) {
  //   throw new Error("no session")
  // }

  return (
    <>
      <div className="flex flex-col">
        <p>usrname: {(session?.user.name)}</p>
        <p>id: {(session?.user.id)}</p>
        <p>email: {(session?.user.email)}</p>
        <p>level: {(session?.user.level)}</p>
        <p>status: {(session?.user.status)}</p>
        <p>jwt:</p>
      </div>

    </>
  )
}
