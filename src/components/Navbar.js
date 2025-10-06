"use client";

import { FaUser } from "react-icons/fa";
import { Navbar, Container,  NavDropdown, Nav} from "react-bootstrap";
import {  useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";


export default function Navigationbar(){
    const { user } = useUser();
    console.log("USER navigation bar", user)
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        router.replace("/login/");
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="/#home">
                    Postagram
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            title={
                                <FaUser/>
                            }
                        >
                            <NavDropdown.Item href={`/profile/${user?.id}/`}>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
