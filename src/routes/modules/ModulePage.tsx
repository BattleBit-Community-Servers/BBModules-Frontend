import {mockModuleDetailData, mockUserData} from "../../mockdata.ts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card.tsx";
import {History} from "lucide-react";
import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx";
import MDEditor from "@uiw/react-md-editor";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../../../components/ui/alert.tsx";
import {Link, useParams} from "react-router-dom";
import {ImDownload} from "react-icons/im";
import {AiFillCheckCircle} from "react-icons/ai";
import {BsDiscord} from "react-icons/bs";
import {FaTerminal} from "react-icons/fa";
import {SetStateAction, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "../../../components/ui/sheet.tsx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui/tabs.tsx";
import rehypeSanitize from "rehype-sanitize";
import MarkdownPreview from "@uiw/react-markdown-preview";
import {rehype} from "rehype";
import { getModule } from "../../../api/modules.tsx";
import { Dependencies, ModuleData } from "../../../api/modules.types.ts";

export default function ModulePage() {
    const {id = ""} = useParams();
    const moduleData = mockModuleDetailData;

    // Modules
    const [module, setModule] = useState<ModuleData>();

    // Is loading
    const [loading, setLoading] = useState(true);

    // Error
    const [error, setError] = useState(null);

    // Get all modules
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const module = await getModule(parseInt(id));  // wait for Promise to resolve
                console.log(module);
                setModule(module);
                setModuleMarkdown(module.Module_markdown);
            } catch (err) {
                console.log('Error:', err);
            }
        };
    
        fetchModules();
    }, [id]);

    const [openConfirmApproveModal, setOpenConfirmApproveModal] = useState(false);

    // Is editing module state
    const [isEditingModule, setIsEditingModule] = useState(false);

    // Module rejected state
    // const [moduleRejected, setModuleRejected] = useState(moduleData.Module_rejected);
    
    // Module markdown state
    const [module_markdown, setModuleMarkdown] = useState(
        module?.Module_markdown
    );

    // TODO: Implement approveModule to actually
    // approve the module in the database
    const approveModule = async () => {
        setOpenConfirmApproveModal(false);
    };

    // TODO: Implement denyModule to actually
    // deny the module in the database
    const denyModule = async () => {
        setOpenConfirmApproveModal(false);
        // setModuleRejected(true);
    };

    // TODO: Implement module edit mode
    const editModule = async (isEditing: boolean) => {
        setIsEditingModule(isEditing);
    };

    // TODO: Implement module save
    const saveModule = async () => {
        setIsEditingModule(false);
        setModuleMarkdown(
            rehype()
            .use(rehypeSanitize)
            .processSync(module_markdown)
            .toString()
        );
    };

    const approvable = true; // TODO: approvable = user is moderator

    return (
        <>
            <div id="module-container" className="flex gap-4">
                <div className="mb-4 w-9/12 flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        {!(module?.versions[0].Version_approved ?? true) ? (
                            <Alert
                                variant={"default"}
                                className={"text-yellow-500 border-yellow-500"}
                            >
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    Your latest module version is still being reviewed and not
                                    published yet.
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <Card key={module?.Module_id}>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div>
                                        <CardTitle className="mb-2">
                                            {module?.Module_name}
                                        </CardTitle>
                                        <CardDescription>
                                            {module?.Module_shortdesc}
                                        </CardDescription>
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
                                            <Button
                                                variant="default"
                                                className="ml-auto"
                                                onClick={() => saveModule()}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="ml-auto"
                                            onClick={() => editModule(true)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* <div>Author ID: {moduleData.Module_author_id}</div>
                                <div>Downloads: {moduleData.Module_downloads}</div>
                                <div>Created At: {moduleData.Module_created_at}</div>
                                <div>Updated At: {moduleData.Module_updated_at}</div>
                                <div>Markdown: {moduleData.Module_markdown}</div> */}
                                <div>
                                    <h2 className="text-2xl mb-4">Description</h2>
                                    {isEditingModule ? (
                                        <MDEditor
                                            value={module_markdown}
                                            onChange={(value) => {
                                                console.log(value);
                                                setModuleMarkdown(value || "");
                                            }}
                                            previewOptions={{
                                                rehypePlugins: [[rehypeSanitize]],
                                            }}
                                        />
                                    ) : (
                                        <MarkdownPreview
                                            className="bg-transparent"
                                            source={module_markdown}
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Dependencies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <div style={{flex: 1}}>Type</div>
                                        <div style={{flex: 1}}>Name</div>
                                    </div>
                                    {/* TODO: sort by type, binary first, then required, then optional */}
                                    {module?.versions[0].Version_dependencies?.map((dependency: Dependencies) => (
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <div style={{flex: 1}}>
                                                {dependency.Dependency_type[0].toLocaleUpperCase()}
                                                {dependency.Dependency_type.slice(1)}
                                            </div>
                                            <div style={{flex: 1}}>
                                                {dependency.Dependency_type == "binary" ? (
                                                    rehype()
                                                        .use(rehypeSanitize)
                                                        .processSync(
                                                            dependency.Dependency_text?.toString()
                                                        )
                                                        .toString()
                                                ) : (
                                                    <>
                                                        {dependency.Dependency_name}
                                                        <Link
                                                            to={`/module/${dependency.Dependency_name}`}
                                                        >
                                                            <Button variant="outline">View</Button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Card className="w-3/12 flex flex-col gap-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <p>{module?.users.User_displayname}</p>
                                <p className="text-sm mt-1 flex items-center">
                                    <BsDiscord className="mr-1 h-4 w-4"/>@
                                    {module?.users.User_displayname}
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            {/* TODO: link to backend */}
                            <p className={`my-2 flex items-center ${!(module?.versions[0].Version_approved ?? true) ? "text-yellow-500" : ""}`}>
                                <History className="mr-2 h-4 w-4"/>
                                Latest version: {module?.versions[0].Version_v_number}
                            </p>
                            <Link to={`//backend/Download/${module?.Module_name}/latest`}>
                                <Button className="w-full">
                                    <ImDownload className="mr-2 h-4 w-4"/> Download
                                </Button>
                            </Link>
                            {approvable ? (
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
                                                                    toast.promise(approveModule(), {
                                                                        pending: "Approving module...",
                                                                        success: "Module approved!",
                                                                        error: "Failed to approve module!",
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
                                                                onClick={() =>
                                                                    toast.promise(denyModule(), {
                                                                        pending: "Denying module...",
                                                                        success: "Module denied!",
                                                                        error: "Failed to deny module!",
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
                            ) : null}
                            <p className="mt-4">Older versions</p>
                            <div className="flex flex-col divide-y-2">
                                {(module?.versions.length ?? 0) > 1 ? module?.versions.splice(1).map((version) => (
                                    <div className="py-2 bg-color-white flex justify-between">
                                        <p className="flex items-center">
                                            <History className="mr-2 h-4 w-4"/>
                                            {version.Version_v_number}
                                        </p>
                                        {/* TODO: link to backend */}
                                        <Link
                                            to={`//backend/Download/${module?.Module_name}/${version.Version_v_number}`}
                                        >
                                            <Button variant={"outline"} size={"sm"}>
                                                Download
                                            </Button>
                                        </Link>
                                    </div>
                                )) : "None"}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
