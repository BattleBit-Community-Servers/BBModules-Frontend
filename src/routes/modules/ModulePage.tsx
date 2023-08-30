import {mockModuleData, mockUserData} from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Link, useParams} from "react-router-dom";
import {ImDownload} from "react-icons/im";
import {AiFillCheckCircle} from "react-icons/ai";
import {BsDiscord} from "react-icons/bs";
import {useState} from "react";
import {toast} from "react-toastify";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetTrigger
} from "../../../components/ui/sheet.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../../components/ui/tabs.tsx";

export default function ModulePage() {
    const {id = ""} = useParams();
    const moduleData = mockModuleData[parseInt(id) - 1];
    const authorData = mockUserData[moduleData.Module_author_id];

    const [openConfirmApproveModal, setOpenConfirmApproveModal] = useState(false);
    console.log(openConfirmApproveModal + "we dont want errrors")

    // TODO: Implement approveModule to actually
    // approve the module in the database
    const approveModule = async () => {
        setOpenConfirmApproveModal(false);
    };

    return (
        <>
            <div id="module-container" className="flex gap-4">
                <div className="mb-4 w-9/12 flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <Card key={moduleData.Module_id}>
                            <CardHeader>
                                <CardTitle>{moduleData.Module_name}</CardTitle>
                                <CardDescription>{moduleData.Module_shortdesc}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>Author ID: {moduleData.Module_author_id}</div>
                                <div>Downloads: {moduleData.Module_downloads}</div>
                                <div>Created At: {moduleData.Module_created_at}</div>
                                <div>Updated At: {moduleData.Module_updated_at}</div>
                                <div>Markdown: {moduleData.Module_markdown}</div>
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
                                                                onClick={() => toast.promise(approveModule(), {
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