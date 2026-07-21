import React, { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";

type UserContextType = {
    userName: string
    userEmail: string
    userId: string
    setUserName: Dispatch<React.SetStateAction<string>>
    setUserEmail: Dispatch<React.SetStateAction<string>>
    setUserId: Dispatch<React.SetStateAction<string>>
}

const userContextData: UserContextType = {
    userName: "",
    userEmail: "",
    userId: "",
    setUserName: (() => { }),
    setUserEmail: (() => { }),
    setUserId: (() => { }),
}

const userContext = createContext<UserContextType>(userContextData);

export const useUserContext = () => useContext(userContext);

const userContextProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    return (
        <userContext.Provider value={{ userName, userEmail, userId, setUserName, setUserEmail, setUserId }}>
            {children}
        </userContext.Provider>
    )
}

export default userContextProvider
