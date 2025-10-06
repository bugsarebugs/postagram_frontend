import { useState } from "react";
import axios from "axios";
import  Form  from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
import { useRouter } from "next/navigation";

export default function RegistrationForm(){
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const registrationForm = event.currentTarget;

        if (registrationForm.checkValidity() === false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            username : form.username,
            password: form.password,
            email: form.email, 
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio, 
        };
        axios.post(process.env.NEXT_PUBLIC_API_URL + "api/auth/register/", data)
        .then((res) => {
            // Registering the account and tokens in the store 
            localStorage.setItem("auth", JSON.stringify({
                access: res.data.access, 
                refresh: res.data.refresh, 
                user: res.data.user, 
            }));
            router.replace("/login")
        })
        .catch((err) => {
            if (err.message){
                setError(err.request.response);
            }
        });
    };
    return (
        <Form
            id="registration-form"
            className="border p-10 rounded bg-white text-black"
            noValidate 
            validated={validated}
            onSubmit={handleSubmit}
        >
            <Form.Group className="mb-3 p-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    value={form.first_name || ''}
                    onChange={(e) => setForm({ ...form, 
                        first_name: e.target.value
                    })}
                    className="p-1"
                    required 
                    type="text"
                    placeholder="Enter First Name"
                />
                <Form.Control.Feedback type="invalid">
                    This file is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    value={form.last_name || ""}
                    onChange={(e) => setForm({ ...form, 
                        last_name: e.target.value 
                    })}
                    required 
                    type="text"
                    placeholder="Enter Last Name"
                />
                <Form.Control.Feedback type="invalid">
                    This File is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    value={form.username || ""}
                    onChange={(e) => setForm({ ...form, username: e.target.value})}
                    required 
                    type="text"
                    placeholder="Enter Username"
                />
                <Form.Control.Feedback type="invalid">
                    This File is required. 
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    placeholder="Enter Email"
                />
                <Form.Control.Feedback type="invalid">
                    Please Provide a valid Email.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={form.password || ""}
                    minLength="8"
                    onChange={(e) => setForm({ ...form, password: e.target.value})}
                    required 
                    type="password"
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                    Please Provide a valid Password.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    value={form.bio || ""}
                    onChange={(e) => setForm({ ...form, bio : e.target.value })}
                    as="textarea"
                    rows={3}
                    placeholder="A simple bio ... (Optional)"
                />
            </Form.Group>
            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>
            <Button variant="primary" type="submit" className="p-4 bg-blue-300 rounded-2xl hover:bg-blue-500">
                Submit
            </Button>
        </Form>
    );
}

