import mockModuleData from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {useParams} from "react-router-dom";

export default function ModulePage() {
    const {id} = useParams();
    return (
        <>
            <div id="module-container" className="flex gap-4">
                {mockModuleData.filter((module) => module.ModuleId === Number(id)).map((module) => (
                    <div className="mb-4 w-4/5 flex flex-col gap-3">
                        <Card>
                            <CardHeader>
                                <CardDescription>{module.ModuleShortDescription}</CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="flex flex-col gap-3">
                            <Card key={module.ModuleId}>
                                <CardHeader>
                                    <CardTitle>{module.ModuleName}</CardTitle>
                                    <CardDescription>{module.ModuleShortDescription}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>Author ID: {module.ModuleAuthorId}</div>
                                    <div>Downloads: {module.ModuleDownloads}</div>
                                    <div>Created At: {module.ModuleCreatedAt}</div>
                                    <div>Updated At: {module.ModuleUpdatedAt}</div>
                                    <div>Markdown: {module.ModuleMarkdown}</div>
                                </CardContent>
                            </Card>

                            <Card className="">
                                <CardHeader>
                                    <CardTitle>Dependancies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Dependencies go here</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                ))}
                
                <Card className="w-1/5 flex flex-col gap-3">
                    <CardHeader>
                        <CardTitle>@Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <Button>Download</Button>
                            <Button variant="destructive">Approve</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}