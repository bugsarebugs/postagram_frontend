import React from "react";
import { useContext } from "react";
import { format } from "timeago.js";
import { Card, Dropdown } from "react-bootstrap";
import axiosService from "@/helpers/axios";
import useUserActions from "@/hooks/user.actions";
import UpdateComment from "@/components/comments/UpdateComment";
import { Context } from "@/context/toasterContext";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { MoreToggleIcon } from "../post/Post";

export default function Comment(props){
    const {postId, comment, refresh} = props; 
    const {  setToaster }= useContext(Context);
    const { getUser } = useUserActions();
    const user = getUser();

    const handleLikeClick = (action) => {
        axiosService 
            .post(`/post/${postId}/comment/${comment.id}/${action}/`)
            .then(() => {
                refresh();
            })
    }

    const handleDelete = () => {
        // Handle the deletion of a comment
        axiosService 
            .delete(`/post/${postId}/comment/${comment.id}/`)
            .then(() => {
                setToaster({
                    type: "danger",
                    message: "Comment Deleted 🚀",
                    show: true, 
                    title: "Delete Comment"
                });
                refresh();
            })
            .catch(() => {
                setToaster({
                    type: "warning",
                    message: "Comment Delete Error🚀",
                    show: true, 
                    tile: "Comment-Delete Error",
                });
            }) ;
    };
    
    return (
        <Card className="rounded-3 my-2">
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                    <FaUser/>
                    <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                        <p className="fs-6 fw-lighter">
                            <small>{format(comment.created)}</small>
                        </p>
                    </div>
                    </div>
                    {user.name === comment?.author?.name && (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle as={MoreToggleIcon}>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>                                  
                                    <UpdateComment
                                        comment={comment}
                                        refresh={refresh}
                                        postId={postId}
                                    />
                                    <Dropdown.Item onClick={handleDelete} className="text-danger">
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Card.Title>
                <Card.Text>{comment?.body}</Card.Text>
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <LikeFilled 
                            style={{
                                color: "#fff",
                                backgroundColor: "#0D6EFD",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                fontSize: "75%",
                                padding: "2px",
                                margin: "3px"
                            }}
                        />
                        <p className="ms-1 fs-6">
                            <small>{comment.likes_count} like</small>
                        </p>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                <div className="d-flex flex-row">
                    <LikeOutlined
                        style={{
                            width: "24px",
                            height: "24px",
                            padding: "2px",
                            fontSize: "20px",
                            color: comment.liked ? "#0D6EFD" : "#C4C4C4",
                        }}
                        onClick={() => {
                            if (comment.liked){
                                handleLikeClick("remove_like");
                            } else {
                                handleLikeClick("like");
                            }
                        }}
                    />
                    <p className="ms-1">
                        <small>Like</small>
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
}