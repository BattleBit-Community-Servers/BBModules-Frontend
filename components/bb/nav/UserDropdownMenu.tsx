import {
    LogOut,
    Upload,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "../../ui/avatar";
import {useState} from "react";
import {mockUserData} from "../../../src/mockdata.ts";

export function UserDropdownMenu() {
    const [loggedIn, setLoggedIn] = useState(false);
    const user = mockUserData[Math.floor(Math.random() * mockUserData.length)];

    console.log(loggedIn);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.User_profile_picture} alt="User Profile Picture"/>
                    <AvatarFallback>BB</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-56">
                <DropdownMenuLabel>Logged in as {user.User_displayname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Upload module</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    setLoggedIn(!loggedIn);
                    window.location.reload();
                }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}