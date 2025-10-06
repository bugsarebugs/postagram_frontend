"use client"
import useSWR from "swr";
import NavLayout from "@/components/layouts/NavLayout";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { fetcher } from "@/helpers/axios";
import { Row, Col } from "react-bootstrap"; 

export default function EditProfileClient({profileId}: {profileId : string}){
    console.log("profile id", profileId)
    const profile = useSWR(`/user/${profileId}/`, fetcher);
    console.log("profile Data ", profile.data)
    return (
        <NavLayout hasNavigationBack>
            {profile.data? (
                <Row className="justify-content-evenly">
                    <Col sm={9}>
                        <UpdateProfileForm profile={profile.data} />
                    </Col>
                </Row>

            ) : (
                <div>Loading....</div>
            )}
        </NavLayout>
    );
}