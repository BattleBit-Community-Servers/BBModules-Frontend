import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card.tsx";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.tsx";
import { ModuleData } from "../../../api/modules.types.ts";
import { BsDiscord } from "react-icons/bs";
import { ImDownload, ImEye } from "react-icons/im";
import { cn } from "../../lib/utils.ts";
import { Badge } from "../ui/badge.tsx";

const UnapprovedBadge = ({ className }: { className?: string }) => (
    <Badge variant="danger" className={cn("pointer-events-none select-none tracking-normal", className)}>
        Unapproved
    </Badge>
);

export const ModuleCard = ({ module }: { module: ModuleData }) => {
    const newestVersion = module.versions.length > 0 ? module.versions[0] : null;
    const isApproved = newestVersion?.Version_approved;

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>
                    <Link to={`/module/${module.Module_id}`}>
                        <div className="flex items-baseline gap-2">
                            <span className="overflow-hidden overflow-ellipsis leading-snug">{module.Module_name}</span>

                            {newestVersion && (
                                <span className="text-sm text-muted-foreground">v{newestVersion.Version_v_number}</span>
                            )}
                        </div>

                        {!isApproved && <UnapprovedBadge />}
                    </Link>
                </CardTitle>

                <div className="flex items-center text-muted-foreground">
                    <BsDiscord className="mr-1 h-4 w-4" />
                    <span className="text-sm">@{module.users.User_displayname}</span>
                </div>

                <CardDescription>{module.Module_shortdesc}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end gap-2">
                <a href={`${import.meta.env.VITE_API_URL}/Download/${module.Module_name}/latest`}>
                    <Button variant={isApproved ? "default" : "danger"}>
                        <ImDownload className="h-4 w-4" />
                    </Button>
                </a>
                <Link to={`/module/${module.Module_id}`}>
                    <Button variant="outline">
                        <ImEye className="mr-2 h-4 w-4" />
                        View
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
