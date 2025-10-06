"use client"
import { useParams } from "next/navigation";
import useSWR from "swr";
import NavLayout from "@/components/layouts/NavLayout";
import { Row, Col } from "react-bootstrap";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { fetcher } from "@/helpers/axios";
import Post from "@/components/post/Post";

export default function UserProfile(){
    const { id } = useParams();
    console.log("profile",id)
    const user = useSWR(`/user/${id}/`, fetcher);
    console.log("user details", user)
    const posts = useSWR(`/post/?author__public_id=${id}`, fetcher, {
        refreshInterval: 20000
    });
    console.log("posts by user",posts)
    return (
        <NavLayout hasNavigationBack>
            <Row className="justify-content-evenly">
                <Col sm={9}>
                    <ProfileDetails user={user.data} />
                    <div>
                        <Row className="my-4">
                            {posts.data?.results.map((post, index) => (
                                <Post key={index} post={post} refresh={posts.mutate} />
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </NavLayout>
    );
}
