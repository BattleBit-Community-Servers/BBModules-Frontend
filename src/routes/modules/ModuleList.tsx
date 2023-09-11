import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Link} from "react-router-dom";
import {BsDiscord} from "react-icons/bs";
import {getModules} from "../../../api/modules.tsx";
import { useEffect, useState } from "react";
import { ModuleData } from "../../../api/modules.types";

export default function ModuleListPage() {

    // Modules
    const [modules, setModules] = useState(null);

    // Is loading
    const [loading, setLoading] = useState(true);

    // Error
    const [error, setError] = useState(null);

    // Page
    const [modulesPage, setModulesPage] = useState(1);

    // Get all modules
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const modules = await getModules(modulesPage);  // wait for Promise to resolve
                console.log(modules);
                setModules(modules);
            } catch (err) {
                console.log('Error:', err);
            }
        };
    
        fetchModules();
    }, [modulesPage]);

    return (
        <>
            <h1 className="text-4xl font-bold mb-3">Modules</h1>
            <div className="grid grid-cols-3 gap-3">
                {modules?.results.map((module: ModuleData) => (
                    <Card key={module.Module_id}>
                        <CardHeader>
                            <CardTitle>
                                <Link to={`/module/${module.Module_id}`}>
                                    {module.Module_name}
                                </Link>
                            </CardTitle>
                            <CardDescription>{module.Module_shortdesc}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <div className="flex items-center gap-2 mr-2">
                                <BsDiscord className="mr-1 h-4 w-4"/>@
                                {module.users.User_displayname}
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/module/${module.Module_id}`}>
                                    <Button variant="outline">View</Button>
                                </Link>
                                <Button variant={!module.versions[0].Version_approved ? "destructive" : "default"}>Download v{module.versions[0].Version_v_number}</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}
