import {Link} from "react-router-dom";
import {IoExtensionPuzzle} from "react-icons/io5";
import {useState} from "react";
import {MdLogin} from "react-icons/md";
import {UserDropdownMenu} from "./UserDropdownMenu.tsx";

const navItems = [
    {
        name: "Modules",
        path: "/modules",
        icon: <IoExtensionPuzzle className="mr-2 h-4 w-4" />,
        key: "modules"
    }
];

export const Navbar = () => {
    const [loggedIn] = useState(Boolean);
    console.log(loggedIn);
    return (
        <nav className="flex gap-4 mb-8">
            <Link className="flex items-center gap-2"
                  to={"/"}>
                <img src="/img/logo.webp" alt="Logo" width={48} height={48}/>
            </Link>
            <div className="flex items-center gap-4 ml-auto">
                {navItems.map((item) => (
                    <Link className="flex items-center" to={item.path} key={item.key}>
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
                        <Link className="flex items-center gap-2" to={"/login"}><span><MdLogin/></span>Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}