import { Card, Button, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function ProfileCard(props){
    const router = useRouter();
    const { user } = props;
    console.log("user profile card",user)

    const handleNavigateToProfile = () => {
        router.replace(`/profile/${user.id}/`)
    }
    return (
        <Card className="border-0 p-2">
            <div className="d-flex">
                <Image 
                    src={user.avatar}
                    roundedCircle 
                    width={48}
                    height={48}
                    alt={user.name}
                    className="my-3 border border-primary border-2"
                />
                <Card.Body>
                    <Card.Title className="fs-6">
                        {user.username}
                    </Card.Title>
                    <Button variant="primary" onClick={handleNavigateToProfile}>See Profile</Button>
                </Card.Body>
            </div>
        </Card>
    )
}