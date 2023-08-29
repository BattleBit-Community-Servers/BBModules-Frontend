import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./routes/Home.tsx";
import NotFound from "./routes/404.tsx";
import ModulePage from "./routes/modules/ModulePage.tsx";
import ModuleListPage from "./routes/modules/ModuleList.tsx";
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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
        <div className="max-w-6xl mx-auto">
            <nav className="flex gap-4 mb-8">
                <Link className="flex items-center gap-2" to={"/"}><img src="/img/logo.webp" alt="Logo" width={48} height={48}/></Link>

                {/* Loop through nav items */}
                {navItems.map((item) => (
                    <Link className="flex items-center gap-2" to={item.path}>{item.icon}{item.name}</Link>
                ))}
                
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/module/:id"} element={<ModulePage/>}/>
                <Route path={"/modules"} element={<ModuleListPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
        </BrowserRouter>
    </React.StrictMode>,
)
