"use client";
import NavLayout from "@/components/layouts/NavLayout";
import { Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "@/helpers/axios";
import  Post  from "@/components/post/Post";
import { useParams } from "next/navigation";
import  CreateComment  from "@/components/comments/CreateComment";
import Comment from "@/components/comments/Comment";

export default function SinglePost(){
    const params  = useParams();
    const postId = params.id;

    const post = useSWR(`/post/${postId}/`, fetcher);
    const comments = useSWR(`/post/${postId}/comment/`, fetcher);

    return (
        <NavLayout hasNavigationBack>
            {post.data? (
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Post post={post.data} refresh={post.mutate} isSinglePost />
                        <CreateComment postId={post.data.id} refresh={comments.mutate}/>
                        {comments.data?.results?.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                postId={post.data.id}
                                refresh={comments.mutate}
                            />
                        ))}
                    </Col>
                </Row>
            ): (
                <div>Loading .....</div>
            )}
        </NavLayout>
    );
}
