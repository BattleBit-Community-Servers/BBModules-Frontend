import { Link } from "react-router-dom";
import { IoExtensionPuzzle } from "react-icons/io5";
import { UserContext } from "../../../api/user.tsx";
import { MdLogin } from "react-icons/md";
import { UserDropdownMenu } from "./user-dropdown-menu.tsx";
import { Github } from "lucide-react";
import { BsDiscord } from "react-icons/bs";
import { useContext } from "react";
import { Button } from "../ui/button.tsx";

const navItems = [
    {
        name: "Modules",
        path: "/modules",
        icon: <IoExtensionPuzzle className="h-4 w-4" />,
        key: "modules"
    },
    {
        name: "GitHub",
        url: "https://github.com/BattleBit-Community-Servers",
        icon: <Github className="h-4 w-4" />,
        key: "github",
        target: "_blank"
    },
    {
        name: "Discord",
        url: "https://discord.gg/FTkj9xUvHh",
        icon: <BsDiscord className="h-4 w-4" />,
        key: "discord",
        target: "_blank"
    }
];

export const Navbar = () => {
    const user = useContext(UserContext);

    return (
        <nav className="mx-6 my-8 flex gap-4">
            <Link className="flex items-center gap-2" to={"/"}>
                <img src="/img/logo.webp" alt="Logo" width={48} height={48} />
            </Link>
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
                {navItems.map((item) => (
                    <Link
                        target={item.target}
                        className="flex items-center rounded px-2 py-2 transition-colors hover:bg-accent sm:gap-1 sm:px-4 sm:py-2"
                        to={item.path ?? item.url}
                        key={item.key}
                    >
                        <span className="text-white">{item.icon}</span>
                        <span className="hidden sm:inline-block">{item.name}</span>
                    </Link>
                ))}
                {user ? (
                    <div className="ml-auto flex items-center gap-2">
                        <UserDropdownMenu />
                    </div>
                ) : (
                    <div className="ml-auto flex items-center gap-2">
                        <a href={`${import.meta.env.VITE_API_URL}/auth/discord`}>
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
