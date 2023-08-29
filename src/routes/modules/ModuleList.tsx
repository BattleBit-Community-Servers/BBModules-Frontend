import {mockModuleData, mockUserData} from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Avatar} from "../../../components/ui/avatar.tsx";

export default function ModuleListPage() {
    const users = mockUserData;
    return (
        <>
            <h1 className="text-4xl font-bold mb-3">Modules</h1>
            <div className="grid grid-cols-3 gap-3">
                {mockModuleData.map((module) => (
                    <Card key={module.Module_id}>
                        <CardHeader>
                            <CardTitle>{module.Module_name}</CardTitle>
                            <CardDescription>{module.Module_shortdesc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between gap-2">
                            <div>
                                <p>Downloads: {module.Module_downloads}</p>
                                <p>Id: {module.Module_id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {users[module.Module_author_id].User_displayname}
                                <Avatar className="cursor-pointer">
                                    <img src={users[module.Module_author_id].User_profile_picture} alt="User Profile Picture"/>
                                </Avatar>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link to={`/module/${module.Module_id}`}>
                                <Button variant="outline">View</Button>
                            </Link>
                            <Button>Download</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}