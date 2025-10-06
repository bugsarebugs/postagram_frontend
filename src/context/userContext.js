"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create context
export const UserContext = createContext(null);

// Provider component
export default function UserProvider({ children }) {
    const [user, setUser] = useState("anonymous");

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth?.user) {
            setUser(auth.user);
        }
    }, []);

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// Hook for easy usage
export const useUser = () => useContext(UserContext);
