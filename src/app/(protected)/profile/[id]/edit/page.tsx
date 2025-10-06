import EditProfileClient from "./EditProfileClient";

export default async function EditProfilePage({params} : {params: {id :string}}){
    const profileId = params.id;        
    return <EditProfileClient profileId={profileId}/>
}