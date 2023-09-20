import { LogOut, Upload } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../api/user.tsx";

export function UserDropdownMenu() {
    const user = useContext(UserContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={undefined} alt="User Profile Picture" />
                    <AvatarFallback>
                        {user?.User_displayname.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-56">
                <DropdownMenuLabel>
                    Logged in as {user!.User_displayname}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/upload">
                        <DropdownMenuItem className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            <span>Upload module</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <a href={`${import.meta.env.API_URL}/auth/logout`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </a>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
