import {mockModuleData, mockUserData} from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx";
import MDEditor from '@uiw/react-md-editor';
import {Alert, AlertDescription, AlertTitle} from "../../../components/ui/alert.tsx";
import {Link, useParams} from "react-router-dom";
import {ImDownload} from "react-icons/im";
import {AiFillCheckCircle} from "react-icons/ai";
import {BsDiscord} from "react-icons/bs";
import {FaTerminal} from "react-icons/fa";
import {SetStateAction, useState} from "react";
import {toast} from "react-toastify";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetTrigger
} from "../../../components/ui/sheet.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../../components/ui/tabs.tsx";
import rehypeSanitize from "rehype-sanitize";
import MarkdownPreview from '@uiw/react-markdown-preview';
import {rehype} from "rehype";

export default function ModulePage() {
    const {id = ""} = useParams();
    const moduleData = mockModuleData[parseInt(id) - 1];
    const authorData = mockUserData[moduleData.Module_author_id];

    const [openConfirmApproveModal, setOpenConfirmApproveModal] = useState(false);
    console.log(openConfirmApproveModal + " we dont want errrors")

    // Is editing module state
    const [isEditingModule, setIsEditingModule] = useState(false);

    // Module rejected state
    const [moduleRejected, setModuleRejected] = useState(moduleData.Module_rejected);

    // Edit module states
    const [module_markdown, setModuleMarkdown] = useState(moduleData.Module_markdown);

    // Set module edit field states
    const editModuleField = (e: { target: { name: string; value: SetStateAction<string>; }; }) => {
        switch (e.target.name) {
            case "module_markdown":
                setModuleMarkdown(e.target.value);
                break;
        }
    };

    // TODO: Implement approveModule to actually
    // approve the module in the database
    const approveModule = async () => {
        setOpenConfirmApproveModal(false);
    };

    // TODO: Implement denyModule to actually
    // deny the module in the database
    const denyModule = async () => {
        setOpenConfirmApproveModal(false);
        setModuleRejected(true);
    };

    // TODO: Implement module edit mode
    const editModule = async (isEditing: boolean) => {
        setIsEditingModule(isEditing);
    };

    // TODO: Implement module save
    const saveModule = async () => {
        setIsEditingModule(false);
        moduleData.Module_markdown = rehype().use(rehypeSanitize).processSync(module_markdown).toString();
    };

    return (
        <>
            <div id="module-container" className="flex gap-4">
                <div className="mb-4 w-9/12 flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        {moduleRejected ? <Alert variant={"destructive"} className={"text-red-700 border-red-700"}>
                            <FaTerminal className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                Your last module update was rejected. Please fix the issues and resubmit your module.
                            </AlertDescription>
                        </Alert> : null}
                        <Card key={moduleData.Module_id}>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div>
                                        <CardTitle>
                                            {moduleData.Module_name}
                                        </CardTitle>
                                        <CardDescription>
                                            {moduleData.Module_shortdesc}    
                                        </CardDescription>
                                    </div>
                                    {isEditingModule ? 
                                        <div className="flex gap-2">
                                            <Button variant="destructive" className="ml-auto" onClick={() => editModule(false)}>Cancel</Button>
                                            <Button variant="default" className="ml-auto" onClick={() => saveModule()}>Save</Button>
                                        </div> 
                                        :
                                        <Button variant="outline" className="ml-auto" onClick={() => editModule(true)}>Edit</Button>
                                    }
                                    
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>Author ID: {moduleData.Module_author_id}</div>
                                <div>Downloads: {moduleData.Module_downloads}</div>
                                <div>Created At: {moduleData.Module_created_at}</div>
                                <div>Updated At: {moduleData.Module_updated_at}</div>
                                <div>Markdown: {moduleData.Module_markdown}</div>
                                <div className="mt-6">
                                    <h2 className="text-2xl mb-4">Description</h2>
                                    {
                                        isEditingModule
                                            ? <>
                                                <MDEditor
                                                    value={module_markdown}
                                                    onChange={
                                                        (value) => {
                                                            console.log(value);
                                                            setModuleMarkdown(value || "");
                                                        }
                                                    }
                                                    previewOptions={{
                                                        rehypePlugins: [[rehypeSanitize]],
                                                    }}
                                                />
                                            </>
                                            : <MarkdownPreview source={moduleData.Module_markdown}/>
                                    }
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Dependencies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Dependencies go here</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Card className="w-3/12 flex flex-col gap-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <img width={50} src={authorData.User_profile_picture}/>
                            <div className="flex flex-col">
                                <p>{authorData.User_displayname}</p>
                                <p className="text-sm mt-1 flex items-center"><BsDiscord
                                    className="mr-1 h-4 w-4"/>@{authorData.User_discord_username}</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <Link to={`/module/${moduleData.Module_id}/download`}>
                                <p className="my-2 flex items-center"><AiFillCheckCircle className="mr-2 h-4 w-4"/>Latest
                                    version: 1.9.3</p>
                                <Button className="w-full"><ImDownload className="mr-2 h-4 w-4"/>Download</Button>
                            </Link>
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
                                                        <Button type="submit"
                                                                onClick={() => toast.promise(approveModule(), {
                                                                    pending: "Approving module...",
                                                                    success: "Module approved!",
                                                                    error: "Failed to approve module!"
                                                                })}>Approve</Button>
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
                                                        <Button type="submit"
                                                                onClick={() => toast.promise(denyModule(), {
                                                                    pending: "Denying module...",
                                                                    success: "Module denied!",
                                                                    error: "Failed to deny module!"
                                                                })}>Deny</Button>
                                                    </SheetClose>
                                                </CardFooter>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </SheetContent>
                            </Sheet>
                            <p className="mt-4">Older versions</p>
                            <div className="flex flex-col divide-y-2">
                                <div className="py-2 bg-color-white flex justify-between">
                                    <p className="flex items-center"><AiFillCheckCircle className="mr-2 h-4 w-4"/>1.9.1
                                    </p>
                                    <Button variant={"outline"} size={"sm"}>Download</Button>
                                </div>
                                <div className="py-2 bg-color-white flex justify-between">
                                    <p className="flex items-center"><AiFillCheckCircle className="mr-2 h-4 w-4"/>1.9.0
                                    </p>
                                    <Button variant={"outline"} size={"sm"}>Download</Button>
                                </div>
                                <div className="py-2 bg-color-white flex justify-between">
                                    <p className="flex items-center"><AiFillCheckCircle className="mr-2 h-4 w-4"/>1.8.9
                                    </p>
                                    <Button variant={"outline"} size={"sm"}>Download</Button>
                                </div>
                                <div className="py-2 bg-color-white flex justify-between">
                                    <p className="flex items-center"><AiFillCheckCircle className="mr-2 h-4 w-4"/>1.8.8
                                    </p>
                                    <Button variant={"outline"} size={"sm"}>Download</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
        ;
}