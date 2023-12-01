import axios from "axios"
import { User } from "@prisma/client"
import { KeyRound } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Rupiah } from "@/components/rupiah"
import { banks } from "@/components/data/bank"
import { Button } from "@/components/ui/button"
import ProfileEdit from "@/components/profile/profile-edit"
import DescriptionEdit from "@/components/profile/description-edit"
import PaymentEdit from "@/components/profile/payment-edit"

export default async function Profile() {
    const session = await getServerSession(authOptions)
    const { data: user }: { data: User } = await axios.get(`http://localhost:3000/api/user/${session?.user.id}`)

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-bold">{session?.user.name}</h1>
                        <ProfileEdit user={user} />
                    </div>
                    <p className="text-muted-foreground">{session?.user.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-8 max-w-lg">
                    <div>
                        <p className="text-lg font-medium">Whatsapp Number</p>
                        <p className="text-muted-foreground">+{user?.whatsapp}</p>
                    </div>

                    <div>
                        <p className="text-lg font-medium">Instagram</p>
                        <p className="text-muted-foreground">{user?.instagram}</p>
                    </div>

                    <div>
                        <p className="text-lg font-medium">Address</p>
                        <p className="text-muted-foreground">{user?.address}</p>
                    </div>

                    <div>
                        <p className="text-lg font-medium">Price per Hour</p>
                        <p className="text-muted-foreground">{Rupiah(user?.price)}</p>
                    </div>
                </div >
            </div>

            <div>
                {user.description ? (
                    <div className="p-4 bg-secondary rounded-md grid grid-cols-8">
                        <p className="text-muted-foreground col-span-7">{user.description}</p>
                        <DescriptionEdit user={user} />
                    </div>
                ) : (
                    <DescriptionEdit user={user} />
                )}
            </div>

            <div>
                {(user.bankAgency || user.bankNumber) ? (
                    <>
                        <div className="flex items-center gap-8">
                            <h1 className="text-2xl font-bold">Payment Account</h1>
                            <div className="flex gap-2 items-center">
                                <PaymentEdit user={user} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-4 gap-y-8 max-w-lg">
                            <div className=" ">
                                <p className="text-lg font-medium">Bank</p>
                                <p className="text-muted-foreground">{banks.find((bank) => bank.code === user?.bankAgency)?.name}</p>
                            </div>

                            <div className="">
                                <p className="text-lg font-medium">Bank Number</p>
                                <p className="text-muted-foreground">{user?.bankNumber}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <PaymentEdit user={user} />
                )}

            </div>

            <Button
                variant={user.password ? "ghost" : "default"}
            >
                <KeyRound className="h-4 w-4 mr-2" />
                {user.password ? "Change Password" : "Set New Password"}
            </Button>

        </div >

    )
}
