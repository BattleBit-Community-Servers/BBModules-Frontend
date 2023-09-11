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
import { FilteredModuleList, ModuleData } from "../../../api/modules.types";
import { Input } from "../../../components/ui/input.tsx";

export default function ModuleListPage() {

    // Modules
    const [modules, setModules] = useState({ count: 0, results: []} as FilteredModuleList);

    // Is loading
    const [loading, setLoading] = useState(true);

    // Error
    const [error, setError] = useState(null as string | null);

    // Page
    const [modulesPage, setModulesPage] = useState(1);

    // Search
    const [search, setSearch] = useState("");

    // Get all modules
    useEffect(() => {
        const fetchModules = async () => {
            // Prevents a flash of loading state/error when loading/error is fast
            const timeout = setTimeout(() => {
                setError(null);
                setLoading(true);
            }, 500);

            try {
                const modules = await getModules(modulesPage, search);
                console.log(modules);
                setModules(modules);
                setError(null);
                clearTimeout(timeout);
            } catch (err) {
                console.log(err);
                setError("Failed to load modules from API.");
                setModules({ count: 0, results: []} as FilteredModuleList);
            }

            setLoading(false);
        };
    
        fetchModules();
    }, [modulesPage, search]);

    const goToPage = (page : number) => {
        setModulesPage(page);
      };
      
      const goToFirstPage = () => {
        goToPage(1);
      };
      
      const goToLastPage = () => {
        goToPage(modules?.count ?? 1);
      };
      
      const goToNextPage = () => {
        if (modulesPage < modules?.count ?? 1) {
          goToPage(modulesPage + 1);
        }
      };
      
      const goToPreviousPage = () => {
        if (modulesPage > 1) {
          goToPage(modulesPage - 1);
        }
      };

    return (
        <>
            <h1 className="text-4xl font-bold mb-3">Modules</h1>
            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
            <Input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="mb-3" />
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
            { modules?.count > 1 && (
                <div className="mt-3 flex justify-center">
                    <Button
                        onClick={goToFirstPage}
                        disabled={modulesPage === 1}
                        className="mr-2"
                    >
                        First
                    </Button>
                    <Button
                        onClick={goToPreviousPage}
                        disabled={modulesPage === 1}
                        className="mr-2"
                    >
                        Previous
                    </Button>
                    {Array.from({ length: modules?.count ?? 1 }, (_, index) => (
                        <Button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`mr-2 ${modulesPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                        >
                        {index + 1}
                        </Button>
                    ))}
                    <Button
                        onClick={goToNextPage}
                        disabled={modulesPage === modules?.count ?? 1}
                        className="mr-2"
                    >
                        Next
                    </Button>
                    <Button
                        onClick={goToLastPage}
                        disabled={modulesPage === modules?.count ?? 1}
                    >
                        Last
                    </Button>
                </div>
            )}
        </>
    );
}
