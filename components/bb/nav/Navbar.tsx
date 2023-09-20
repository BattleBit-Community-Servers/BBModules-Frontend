import { Link } from "react-router-dom";
import { IoExtensionPuzzle } from "react-icons/io5";
import { UserContext } from "../../../api/user.tsx";
import { MdLogin } from "react-icons/md";
import { UserDropdownMenu } from "./UserDropdownMenu.tsx";
import { Button } from "../../ui/button.tsx";
import { Github } from "lucide-react";
import { BsDiscord } from "react-icons/bs";
import { useContext } from "react";

const navItems = [
    {
        name: "Modules",
        path: "/modules",
        icon: <IoExtensionPuzzle className="mr-2 h-4 w-4" />,
        key: "modules",
    },
    {
        name: "GitHub",
        url: "https://github.com/BattleBit-Community-Servers",
        icon: <Github className="mr-2 h-4 w-4" />,
        key: "github",
        target: "_blank",
    },
    {
        name: "Discord",
        url: "https://discord.gg/FTkj9xUvHh",
        icon: <BsDiscord className="mr-2 h-4 w-4" />,
        key: "discord",
        target: "_blank",
    },
];

export const Navbar = () => {
    const user = useContext(UserContext);

    return (
        <nav className="flex gap-4 my-8 mx-6">
            <Link className="flex items-center gap-2" to={"/"}>
                <img src="/img/logo.webp" alt="Logo" width={48} height={48} />
            </Link>
            <div className="flex items-center gap-4 ml-auto">
                {navItems.map((item) => (
                    <Link
                        target={item.target}
                        className="flex items-center"
                        to={item.path ?? item.url}
                        key={item.key}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
                {user ? (
                    <div className="flex items-center gap-2 ml-auto">
                        <UserDropdownMenu />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 ml-auto">
                        <a href={`${import.meta.env.API_URL}/auth/discord`}>
                            <Button>
                                <span className="flex items-center gap-2">
                                    <MdLogin />
                                    Login
                                </span>
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};
