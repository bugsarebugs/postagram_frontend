"use client"

import { Row, Col} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { fetcher } from "@/helpers/axios";
import useUserActions from "@/hooks/user.actions";
import CreatePost from "@/components/post/CreatePost";
import useSWR from "swr";
import  Post  from "@/components/post/Post"

import ProfileCard from "@/components/profile/ProfileCard";

export default function Dashboard(){
    const { getUser } = useUserActions();
    const user = getUser()
    const posts = useSWR("/post/", fetcher, {
        refreshInterval: 10000, 
    });
    console.log("posts", posts)
    const profiles = useSWR("/user/?limit=5", fetcher);

    if (!user){
        return <div>Loading!</div>
    }
    return (
        <div className="">
           <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <FaUser/>
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                            <CreatePost refresh={posts.mutate} />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        {posts.data?.results.map((post, index) => (
                            <Post key={ index } post={post} refresh={posts.mutate}/>
                        ))}
                    </Row>
                </Col>
                <Col sm={3} className="border rounded py-4 h-50">
                    <h4 className="font-weight-bold text-center">Suggested People</h4>
                    <div className="d-flex flex-column">
                        {profiles?.data?.results?.map((profile, index) => (
                            <ProfileCard key={index} user={profile} />
                        ))}
                    </div>
                </Col>
           </Row>
        </div>
    )
}