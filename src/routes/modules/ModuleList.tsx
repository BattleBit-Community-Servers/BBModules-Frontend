import { Button } from "../../components/ui/button.tsx";
import { getModules } from "../../../api/modules.tsx";
import { useEffect, useState } from "react";
import { FilteredModuleList, ModuleData } from "../../../api/modules.types";
import { Input } from "../../components/ui/input.tsx";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { ModuleCard } from "../../components/modules/module-card.tsx";

export default function ModuleListPage({ baseFilter = null as string | null }) {
    const minimumSearchLength = 4;

    // Modules
    const [modules, setModules] = useState({
        count: 0,
        results: []
    } as FilteredModuleList);

    // Is loading
    const [loading, setLoading] = useState(true);

    // Error
    const [error, setError] = useState(null as string | null);

    // Page
    const [modulesPage, setModulesPage] = useState(1);

    // Search
    const [search, setSearch] = useState("");
    const [lastSearchTerm, setLastSearchTerm] = useState("");
    const [searchTooShort, setSearchTooShort] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            return;
        }
        if (modulesPage !== 1) {
            goToFirstPage();
        } else {
            fetchModules();
        }
    }, [lastSearchTerm, baseFilter]);

    const fetchModules = async () => {
        // Prevents a flash of loading state/error when loading/error is fast
        const timeout = setTimeout(() => {
            setError(null);
            setLoading(true);
        }, 500);

        try {
            const modules = await getModules(modulesPage, lastSearchTerm, baseFilter ?? "");
            console.log(modules);
            setModules(modules);
            setError(null);
            clearTimeout(timeout);
        } catch (err) {
            console.log(err);
            setError("Failed to load modules from API.");
            setModules({ count: 0, results: [] } as FilteredModuleList);
        }

        setLoading(false);
    };

    // Get all modules
    useEffect(() => {
        fetchModules();
    }, [modulesPage]);

    const goToPage = (page: number) => {
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

    const searchModules = (input: string) => {
        setSearch(input);

        input = input.trim();

        // Deleting search content down to < 3 characters should reset the page once
        if (input.length < minimumSearchLength && lastSearchTerm.length >= minimumSearchLength) {
            setSearchTooShort(input.length !== 0);
            setLastSearchTerm("");
            return;
        }

        // Changing search content to >= 3 characters should execute a search
        if (input.length >= minimumSearchLength) {
            setLastSearchTerm(input);
            setSearchTooShort(false);
            return;
        }

        if (input.length < minimumSearchLength && input.length > 0) {
            setSearchTooShort(true);
            return;
        } else {
            setSearchTooShort(false);
            return;
        }
    };

    return (
        <>
            <div className="px-6">
                <h1 className="mb-3 text-4xl font-bold">Modules</h1>
                {loading && (
                    <div className="flex justify-center">
                        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    </div>
                )}
                {error && <div className="text-red-500">{error}</div>}
                <Input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => searchModules(e.target.value)}
                    className={`mb-3 ${search.length < 4 && search.length !== 0 ? "border border-red-500" : ""}`}
                />
                <div className="mb-3 text-red-500">
                    {searchTooShort ? "Please provide at least 4 characters for searching" : null}
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {modules?.results.map((module: ModuleData) => (
                        <ModuleCard module={module} key={module.Module_id} />
                    ))}
                </div>
                {modules?.count > 1 && (
                    <>
                        <div className="mt-3 flex items-center justify-end space-x-6 lg:space-x-8">
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page {modulesPage} of {modules.count}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => goToFirstPage()}
                                    disabled={modulesPage === 1}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => goToPreviousPage()}
                                    disabled={modulesPage === 1}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => goToNextPage()}
                                    disabled={modulesPage === modules.count}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => goToLastPage()}
                                    disabled={modulesPage === modules.count}
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
