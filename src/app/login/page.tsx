import Link from "next/link"
import LoginForm from "@/components/forms/LoginForm"

export default function Login(){
    return (
        <div className="container pt-60 align-middle">
            <div className="row  justify-items-center align-middle place-items-center justify-self-center ">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="content text-center px-4">
                        <h1 className="text-primary">
                            Welcome to Postagram!
                        </h1>
                        <p className="content">
                            Login now and start enjoying! <br/>
                            Or if you don&quot;t have an account, please{ " "}
                            <Link href="/register">register</Link>.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 p-5">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
