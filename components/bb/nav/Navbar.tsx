import {Link} from "react-router-dom";
import {IoExtensionPuzzle} from "react-icons/io5";
import {useState} from "react";
import {MdLogin} from "react-icons/md";
import {UserDropdownMenu} from "./UserDropdownMenu.tsx";
import {Button} from "../../ui/button.tsx";
import {Github} from "lucide-react";
import {BsDiscord} from "react-icons/bs";

const navItems = [
    {
        name: "Modules",
        path: "/modules",
        icon: <IoExtensionPuzzle className="mr-2 h-4 w-4"/>,
        key: "modules"
    },
    {
        name: "GitHub",
        url: "https://github.com/BattleBit-Community-Servers",
        icon: <Github className="mr-2 h-4 w-4"/>,
        key: "github"
    },
    {
        name: "Discord",
        url: "https://discord.gg/FTkj9xUvHh",
        icon: <BsDiscord className="mr-2 h-4 w-4"/>,
        key: "discord"
    }
];

export const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <nav className="flex gap-4 mb-8">
            <Link className="flex items-center gap-2"
                  to={"/"}>
                <img src="/img/logo.webp" alt="Logo" width={48} height={48}/>
            </Link>
            <div className="flex items-center gap-4 ml-auto">
                {navItems.map((item) => (
                    <Link className="flex items-center" to={item.path ?? item.url} key={item.key}>
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
                {loggedIn ? (
                    <div className="flex items-center gap-2 ml-auto">
                        <UserDropdownMenu/>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 ml-auto">
                        <Button onClick={() => {
                            setLoggedIn(true)
                        }}>
                            <Link
                                className="flex items-center gap-2"
                                to={"/login"}
                            >
                                <span><MdLogin/></span>
                                Login
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}