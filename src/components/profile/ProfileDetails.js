import { Button, Image } from "react-bootstrap";
import { useRouter } from "next/navigation"

export default function ProfileDetails(props){
    const { user } = props; 
    console.log("profile user ",user)
    const router = useRouter(); 
    console.log("user", user);
    if (!user){
        return <div>Loading....</div>
    }
    return (
        <div>
            <div className="d-flex flex-row border-bottom p-5">
                <Image 
                    src={user?.avatar}
                    roundedCircle
                    width={120}
                    height={120}
                    alt={user.avatar}
                    className="me-5 border border-primary border-2"
                />
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                    <p className="fs-4 m-0">{user.username}</p>
                    <p className="fs-5">{user.bio ? user.bio : "(No bio.)"}</p>
                    <p className="fs-6">
                        <small>{user.posts_count} posts</small>
                    </p>
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-25"
                        onClick={() => router.replace(`/profile/${user.id}/edit/`)}
                    >Edit</Button>
                </div>
            </div>
        </div>
    );
}