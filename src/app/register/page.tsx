"use client";

import Link from "next/link";
import RegistrationForm  from "@/components/forms/RegistrationForm";

export default function Registration(){
    return (
        <div className="flex flex-col pr-100 place-items-center pt-50 justify-self-center align-middle ">
            <div className="flex flex-row justify-center-safe align-middle">
                <div className=" flex flex-col justify-center flex-3/4">
                    <div className=" text-center px-100">
                        <h1 className="text-red-600">
                            Welcome to Postman!
                        </h1>
                        <p className="">
                            This is a new social media site that will allow you to share your thoughs and 
                            experiences with your friends. Register now and start enjoying! <br/>
                            Or If you already have an account, please 
                            <Link href="/login">Login</Link>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col flex-1/4">
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    );
}