import mockModuleData from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {useParams} from "react-router-dom";

export default function ModulePage() {
    const {id} = useParams();
    return (
        <>
            {mockModuleData.filter((module) => module.ModuleId === Number(id)).map((module) => (
                <Card key={module.ModuleId} className="mb-4">
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
                    <CardFooter className="flex justify-between">
                        <Button>Download</Button>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}