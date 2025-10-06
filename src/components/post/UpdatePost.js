import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "@/helpers/axios";
import useUserActions from "@/hooks/user.actions";
import { Context } from "@/context/toasterContext";

export default function UpdatePost({ post, refresh }) {
    const { getUser } = useUserActions();
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ body: post.body || "" });
    const [validated, setValidated] = useState(false);
    const {  setToaster } = useContext(Context);
    const user = getUser();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setForm({ body: post.body || "" });
        setShow(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateForm = e.currentTarget;

        if (updateForm.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: user.id,
            body: form.body,
        };

        axiosService
            .put(`/post/${post.id}/`, data)
            .then(() => {
                handleClose();
                setForm({ body: "" });
                setToaster({
                    type: "success",
                    message: "Post Updated 🚀",
                    show: true, 
                    title: "Post Updated Successfully"
                })
                refresh();
            })
            .catch(() => {
                setToaster({
                    type: "danger",
                    message: "An error Occured Updating",
                    show: true, 
                    title: "Update Post Error"
                })

            });
    };

    return (
        <>
            <Dropdown.Item as="button" onClick={handleShow}>
                Modify
            </Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) =>
                                    setForm({ ...form, body: e.target.value })
                                }
                                as="textarea"
                                rows={3}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Post body is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!form.body.trim()}
                            >
                                Update
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
