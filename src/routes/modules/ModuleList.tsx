import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Link } from "react-router-dom";
import { BsDiscord } from "react-icons/bs";
import { getModules } from "../../../api/modules.tsx";
import { useEffect, useState } from "react";
import { FilteredModuleList, ModuleData } from "../../../api/modules.types";
import { Input } from "../../../components/ui/input.tsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip.tsx";

export default function ModuleListPage() {
  const minimumSearchLength = 4;

  // Modules
  const [modules, setModules] = useState({
    count: 0,
    results: [],
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

  useEffect(() => {
    if (modulesPage !== 1) {
      goToFirstPage();
    } else {
      fetchModules();
    }
  }, [lastSearchTerm]);

  const fetchModules = async () => {
    // Prevents a flash of loading state/error when loading/error is fast
    const timeout = setTimeout(() => {
      setError(null);
      setLoading(true);
    }, 500);

    try {
      const modules = await getModules(modulesPage, lastSearchTerm);
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
    if (
      input.length < minimumSearchLength &&
      lastSearchTerm.length >= minimumSearchLength
    ) {
      setLastSearchTerm("");
      return;
    }

    // Changing search content to >= 3 characters should execute a search
    if (input.length >= minimumSearchLength) {
      setLastSearchTerm(input);
      return;
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
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => searchModules(e.target.value)}
        className={`mb-3 ${(search.length < 4 && search.length !== 0) ? "border border-red-500" : ""}`}
      />

      <div className="grid grid-cols-3 gap-3">
        {modules?.results.map((module: ModuleData) => (
          <Card
            key={module.Module_id}
            className="flex flex-col justify-between"
          >
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
                <BsDiscord className="mr-1 h-4 w-4" />@
                {module.users.User_displayname}
              </div>
              <div className="flex gap-2">
                <Link to={`/module/${module.Module_id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                <Button
                  variant={
                    !module.versions[0].Version_approved
                      ? "destructive"
                      : "default"
                  }
                >
                  Download v{module.versions[0].Version_v_number}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {modules?.count > 1 && (
        <>
          <div className="flex items-center justify-end space-x-6 lg:space-x-8 mt-3">
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
    </>
  );
}
