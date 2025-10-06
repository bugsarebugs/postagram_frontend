import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "@/helpers/axios";
import   useUserActions  from "@/hooks/user.actions";
import { Context } from "@/context/toasterContext";


export default function CreatePost( props ){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { getUser } = useUserActions();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({ body : ""});
    const { refresh } = props;
    const {  setToaster }= useContext(Context);
    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget; 

        if (createPostForm.checkValidity() === false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author: user.id,
            body: form.body,
        };
        axiosService
            .post("/post/", data)
            .then(() => {
                handleClose();
                setForm({});
                setToaster({
                    type: "success",
                    message: "Post Created 🚀",
                    show: true, 
                    title: "Create Post"
                });
                refresh();
            })
            .catch(() => {
                setToaster({
                    type: "danger",
                    message: "Post Created Unsuccessfully",
                    show: true, 
                    title: "An Error occurred.!",
                });
            });
    };
    return (
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary text-primary"
                    type="text"
                    placeholder="Write a post"
                    onClick={handleShow}
                />
            </Form.Group>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({ ...form, 
                                    body: e.target.value
                                })}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary"
                                type="submit"
                                disabled={form.body === undefined}
                            > Post </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}