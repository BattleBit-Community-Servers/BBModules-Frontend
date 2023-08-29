import {Link} from "react-router-dom";
import {BiSolidHome} from "react-icons/bi";
import {IoExtensionPuzzle} from "react-icons/io5";

const navItems = [
    {
        name: "Home",
        path: "/",
        icon: <BiSolidHome/>
    },
    {
        name: "Modules",
        path: "/modules",
        icon: <IoExtensionPuzzle/>
    },
];

export const Navbar = () => {
    return (
        <nav className="flex gap-4 mb-8">
            <Link className="flex items-center gap-2" to={"/"}><img src="/img/logo.webp" alt="Logo" width={48}
                                                                    height={48}/></Link>
            {navItems.map((item) => (
                <Link className="flex items-center gap-2" to={item.path}>{item.icon}{item.name}</Link>
            ))}
        </nav>
    );
}