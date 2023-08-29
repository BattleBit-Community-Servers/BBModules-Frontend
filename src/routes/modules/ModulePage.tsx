import {mockModuleData} from "../../mockdata.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../components/ui/card.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {Link, useParams} from "react-router-dom";
import {ImDownload} from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { useState } from "react";
import {toast} from "react-toastify";

export default function ModulePage() {
    const {id = ""} = useParams();
    const moduleData = mockModuleData[parseInt(id) - 1];

    const [openConfirmApproveModal, setOpenConfirmApproveModal] = useState(false);

    // TODO: Implement approveModule to actually
    // approve the module in the database
    const approveModule = async () => {
        setOpenConfirmApproveModal(false);
    };

    return (
        <>
            <div id="module-container" className="flex gap-4">
                <div className="mb-4 w-4/5 flex flex-col gap-3">
                    <Card>
                        <CardHeader>
                            <CardDescription>{moduleData.Module_shortdesc}</CardDescription>
                        </CardHeader>
                    </Card>
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
                
                <Card className="w-1/5 flex flex-col gap-3">
                    <CardHeader>
                        <CardTitle>@Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <Link to={`/module/${moduleData.Module_author_id}/download`}>
                                <Button className="w-full"><ImDownload className="mr-2 h-4 w-4" />Download</Button>
                            </Link>
                            <Dialog open={openConfirmApproveModal} onOpenChange={setOpenConfirmApproveModal}>
                                <DialogTrigger asChild>
                                    <Button variant={"ghost"}>Approve</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to approve this module?
                                    </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button onClick={() => setOpenConfirmApproveModal(false)} variant={"destructive"}>Cancel</Button>
                                        <Button onClick={() => toast.promise(approveModule(), {
                                            pending: "Approving module...",
                                            success: "Module approved!",
                                            error: "Failed to approve module!"
                                        })} type="submit">Approve</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}