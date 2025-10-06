"use client";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  useUserActions  from "@/hooks/user.actions";

export default function LoginForm(){
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);
    const userActions = useUserActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            email: form.email,
            password: form.password,
        };

        userActions.login(data)
            .catch((err) => {
                if (err.response && err.response.data){
                    setError(err.response.data.message || "Login Failed.");
                } 
            }); 
    };
    return (
        <Form
            id="registration-form"
            className="border p-4 rounded"
            noValidate  
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="login-form"
        >
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required 
                    type="email"
                    placeholder="Enter Email"
                    data-testid="email-field"
                />
                <Form.Control.Feedback type="invalid">
                    Please Provide a valid Email
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
                    data-testid="password-field"
                />
                <Form.Control.Feedback type="invalid">
                    Please Provide a valid Password.
                </Form.Control.Feedback>
            </Form.Group>
            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}