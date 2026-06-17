import React, { createContext, useContext, useState, useEffect, type Dispatch, type ReactNode } from "react";

type UserContextType = {
    userName: string
    userEmail: string
    userId: string
    setUserName: Dispatch<React.SetStateAction<string>>
    setUserEmail: Dispatch<React.SetStateAction<string>>
    setUserId: Dispatch<React.SetStateAction<string>>
    logout: () => void
}

const userContextData: UserContextType = {
    userName: "",
    userEmail: "",
    userId: "",
    setUserName: (() => { }),
    setUserEmail: (() => { }),
    setUserId: (() => { }),
    logout: () => { }
}

const userContext = createContext<UserContextType>(userContextData);

export const useUserContext = () => useContext(userContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage
    const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "");
    const [userEmail, setUserEmail] = useState<string>(localStorage.getItem("userEmail") || "");
    const [userId, setUserId] = useState<string>(localStorage.getItem("userId") || "");

    // Update localStorage whenever state changes
    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userEmail", userEmail);
        } else {
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
        }
    }, [userId, userName, userEmail]);

    const logout = () => {
        setUserId("");
        setUserName("");
        setUserEmail("");
    };

    return (
        <userContext.Provider value={{ userName, userEmail, userId, setUserName, setUserEmail, setUserId, logout }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider
