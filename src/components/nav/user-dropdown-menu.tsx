import { LogOut, ShieldCheck, Upload } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import { useContext } from "react";
import { UserContext } from "../../../api/user.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";

export function UserDropdownMenu() {
    const user = useContext(UserContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={undefined} alt="User Profile Picture" />
                    <AvatarFallback>{user?.User_displayname.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-56">
                <DropdownMenuLabel>Logged in as {user!.User_displayname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <a href="/upload">
                        <DropdownMenuItem className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            <span>Upload module</span>
                        </DropdownMenuItem>
                    </a>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user?.User_roles === "ADMIN" || user?.User_roles === "MODERATOR" ? (
                    <>
                        <DropdownMenuGroup>
                            <a href="/admin/modules">
                                <DropdownMenuItem className="cursor-pointer">
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    <span>Moderate</span>
                                </DropdownMenuItem>
                            </a>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </>
                ) : null}
                <a href={`${import.meta.env.VITE_API_URL}/auth/logout`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </a>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
