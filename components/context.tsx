import { ReactNode, createContext, useState } from "react";

type freelance = {
    id: string,
    name: string,
    email: string,
    whatsapp: string,
    instagram: string,
    price: number,
    address: string,
    description: string | null,
    status: string,
    bankAgency: string | null,
    bankNumber: string | null,
}

export const Context = createContext({
    campuses: [""],
    setCampuses: (campuses: string[]) => { },
    freelancers: [{} as freelance],
    setFreelancers: (freelance: freelance[]) => { },
})

function ContextProvider({ children }: { children: ReactNode }) {
    const [campuses, setCampuses] = useState([""])
    const [freelancers, setFreelancers] = useState({} as freelance[])

    return (
        <Context.Provider value={{ campuses, setCampuses, freelancers, setFreelancers }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider