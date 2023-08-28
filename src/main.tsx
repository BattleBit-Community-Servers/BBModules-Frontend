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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <div>
                <ul>
                    <li className="flex items-center gap-2"><BiSolidHome/><Link to={"/"}>Home</Link></li>
                    <li className="flex items-center gap-2"><IoExtensionPuzzle/><Link to={"/modules"}>Modules</Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/module/:id"} element={<ModulePage/>}/>
                <Route path={"/modules"} element={<ModuleListPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
