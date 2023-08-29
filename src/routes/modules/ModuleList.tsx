import mockModuleData from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Link} from "react-router-dom";

export default function ModuleListPage() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-3">Title</h1>
            <div className="grid grid-cols-3 gap-3">
                {mockModuleData.map((module) => (
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
                        <CardFooter className="flex justify-between">
                                <Link to={`/module/${module.ModuleId}`}>
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