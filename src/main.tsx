import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./routes/Home.tsx";
import NotFound from "./routes/404.tsx";
import ModulePage from "./routes/modules/ModulePage.tsx";
import ModuleListPage from "./routes/modules/ModuleList.tsx";
import {Navbar} from "../components/bb/Navbar.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
        <div className="max-w-6xl mx-auto">
            <Navbar/>
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
