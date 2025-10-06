"use client";

import { createContext, useMemo, useState } from "react";
import Toaster from "@/components/Toaster";

export const Context = createContext("unknown");

export default function ToasterContext({ children }){
    const [toaster, setToaster] = useState({
        title: "",
        show: false, 
        message: "",
        type: "", 
    });
    const value = useMemo(() => ({ toaster, setToaster}), [toaster]);

    return (
        <Context.Provider value={value}>
            {children}
            <Toaster 
                title={toaster.title}
                message={toaster.message}
                type={toaster.type}
                showToast={toaster.show}
                onClose={() => setToaster({ ...toaster, show: false})}
            />
        </Context.Provider>
    )
}