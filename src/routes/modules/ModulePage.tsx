import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { History } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import MDEditor from "@uiw/react-md-editor";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImDownload } from "react-icons/im";
import { BsDiscord } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../components/ui/sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs.tsx";
import { approveVersion, denyVersion, editMarkdown, getModule } from "../../../api/modules.tsx";
import { Dependencies, ModuleData, Versions } from "../../../api/modules.types.ts";
import { UserContext } from "../../../api/user.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.tsx";
import { HiExternalLink } from "react-icons/hi";
import { SanitizedMarkdown } from "../../components/common/sanitized-markdown.tsx";
import { cn } from "../../lib/utils.ts";

const ModuleApprovalAlert = ({ version, approvable }: { version: Versions; approvable: boolean }) => {
    const isApproved = (version.Version_approved ?? true) && !approvable;

    return (
        !isApproved && (
            <Alert variant={"default"} className={"border-yellow-500 text-yellow-500"}>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Your latest module version is still being reviewed and not published yet.
                </AlertDescription>
            </Alert>
        )
    );
};

const sortDependencies = (a: Dependencies, b: Dependencies) => {
    if (a.Dependency_type === "binary") return -1;
    if (b.Dependency_type === "binary") return 1;
    if (a.Dependency_type === "required") return -1;
    if (b.Dependency_type === "required") return 1;
    return 0;
};

const DependenciesCard = ({ dependencies }: { dependencies: Dependencies[] }) => {
    if (!dependencies.length) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dependencies</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {dependencies?.sort(sortDependencies).map((dependency: Dependencies) => (
                            <TableRow key={dependency.Dependency_binary_text ?? dependency.module.Module_id}>
                                <TableCell>
                                    {dependency.Dependency_type === "binary" ? (
                                        dependency.Dependency_binary_text
                                    ) : (
                                        <Link to={`/module/${dependency.module.Module_id}`}>
                                            <div className="flex gap-1 transition-colors hover:text-blue-600">
                                                <span>{dependency.module.Module_name}</span>
                                                <HiExternalLink />
                                            </div>
                                        </Link>
                                    )}
                                </TableCell>
                                <TableCell className="capitalize">{dependency.Dependency_type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const ApprovalSidebar = ({ versionId }: { versionId: number }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Review</Button>
            </SheetTrigger>
            <SheetContent>
                <Tabs defaultValue="deny" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="approve">Approve</TabsTrigger>
                        <TabsTrigger value="deny">Deny</TabsTrigger>
                    </TabsList>
                    <TabsContent value="approve">
                        <Card>
                            <CardHeader>
                                <CardTitle>Approve Module</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Approve module content goes here</p>
                            </CardContent>
                            <CardFooter>
                                <SheetClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={() =>
                                            toast.promise(approveVersion(versionId), {
                                                pending: "Approving module...",
                                                success: "Module approved!",
                                                error: "Failed to approve module!"
                                            })
                                        }
                                    >
                                        Approve
                                    </Button>
                                </SheetClose>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="deny">
                        <Card>
                            <CardHeader>
                                <CardTitle>Deny Module</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Deny module content goes here</p>
                            </CardContent>
                            <CardFooter>
                                <SheetClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={
                                            () =>
                                                toast.promise(denyVersion(versionId), {
                                                    pending: "Denying module...",
                                                    success: "Module denied!",
                                                    error: "Failed to deny module!"
                                                })
                                            //   TODO: make toast of denial yellow
                                        }
                                    >
                                        Deny
                                    </Button>
                                </SheetClose>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
};

const Sidebar = ({ module }: { module: ModuleData }) => {
    const user = useContext(UserContext);

    const latestVersion = module.versions[0];
    if (!latestVersion) return null;

    const approvable =
        !latestVersion.Version_approved && (user?.User_roles === "ADMIN" || user?.User_roles === "MODERATOR");

    return (
        <Card className="flex flex-col gap-3 lg:w-3/12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <p>{module.users.User_displayname}</p>
                        <p className="mt-1 flex items-center text-sm">
                            <BsDiscord className="mr-1 h-4 w-4" />@{module.users.User_displayname}
                        </p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    <p className={cn("my-2 flex items-center", !latestVersion.Version_approved && "text-yellow-500")}>
                        <History className="mr-2 h-4 w-4" />
                        Latest version: {latestVersion.Version_v_number}
                    </p>
                    <a href={`${import.meta.env.VITE_API_URL}/Download/${module.Module_name}/latest`}>
                        <Button className="w-full">
                            <ImDownload className="mr-2 h-4 w-4" /> Download
                        </Button>
                    </a>
                    {approvable ? <ApprovalSidebar versionId={latestVersion.Version_id} /> : null}
                    <p className="mt-4">Older versions</p>
                    <div className="flex flex-col divide-y-2">
                        {(module.versions.length ?? 0) > 1
                            ? module.versions.slice(1).map((version) => (
                                  <div key={version.Version_id} className="bg-color-white flex justify-between py-2">
                                      <p className="flex items-center">
                                          <History className="mr-2 h-4 w-4" />
                                          {version.Version_v_number}
                                      </p>
                                      <Link
                                          to={`${import.meta.env.VITE_API_URL}/Download/${module.Module_name}/${
                                              version.Version_v_number
                                          }`}
                                      >
                                          <Button variant={"outline"} size={"sm"}>
                                              Download
                                          </Button>
                                      </Link>
                                  </div>
                              ))
                            : "None"}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function ModulePage() {
    const { id = "" } = useParams();

    const user = useContext(UserContext);
    const navigate = useNavigate();

    // Modules
    const [module, setModule] = useState<ModuleData>();

    // Get all modules
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const module = await getModule(parseInt(id));

                if (module.versions.length === 0) {
                    navigate("/404", { replace: true });
                }

                setModule(module);
                setModuleMarkdown(module.Module_markdown);
            } catch (err) {
                console.log("Error:", err);
            }
        };

        fetchModules().then((r) => r);
    }, [id]);

    // Is editing module state
    const [isEditingModule, setIsEditingModule] = useState(false);

    // Module markdown state
    const [module_markdown, setModuleMarkdown] = useState(module?.Module_markdown);

    // Markdown editing
    const editModule = async (isEditing: boolean) => {
        setIsEditingModule(isEditing);
    };

    // TODO: Implement module save
    const saveModule = async () => {
        setIsEditingModule(false);
        setModuleMarkdown(module_markdown);

        if (module_markdown) {
            if (await editMarkdown(module?.Module_id ?? -1, module_markdown)) {
                toast.success("Module saved!");
            } else {
                toast.error("Failed to save module!");
            }
        } else {
            toast.error("Failed to save module!");
        }
    };

    const approvable =
        module?.versions[0].Version_approved === false &&
        (user?.User_roles === "ADMIN" || user?.User_roles === "MODERATOR");

    if (!module) return null;

    return (
        <>
            <div className="flex flex-col gap-4 px-6 lg:flex-row">
                <div className="flex flex-col gap-3 lg:w-9/12">
                    <div className="flex flex-col gap-3">
                        <ModuleApprovalAlert version={module.versions[0]} approvable={approvable} />

                        <Card>
                            <CardHeader>
                                <div className="flex max-w-full items-start justify-between gap-2">
                                    <div className="flex-1 overflow-hidden">
                                        <CardTitle className="mb-2 overflow-hidden overflow-ellipsis">
                                            {module.Module_name}
                                        </CardTitle>

                                        <CardDescription>{module.Module_shortdesc}</CardDescription>
                                    </div>

                                    {isEditingModule ? (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="destructive"
                                                className="ml-auto"
                                                onClick={() => editModule(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="default" className="ml-auto" onClick={() => saveModule()}>
                                                Save
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="outline" className="ml-auto" onClick={() => editModule(true)}>
                                            Edit
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div>
                                    {isEditingModule ? (
                                        <>
                                            <p className="my-2 flex items-center text-yellow-500">
                                                Note: Only images hosted on imgur are allowed. HTML is not allowed.
                                            </p>
                                            <MDEditor
                                                value={module_markdown}
                                                onChange={(value) => {
                                                    setModuleMarkdown(value || "");
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <SanitizedMarkdown markdown={module_markdown!} />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <DependenciesCard dependencies={module?.versions[0]!.dependencies} />

                        <Card>
                            <CardHeader>
                                <CardTitle>Changelog</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {module?.versions.map((version: Versions) => (
                                    <div key={version.Version_id} className="mb-2">
                                        <h3 className="text-2xl font-bold">{version.Version_v_number}</h3>
                                        <SanitizedMarkdown markdown={version.Version_changelog} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Sidebar module={module} />
            </div>
        </>
    );
}
