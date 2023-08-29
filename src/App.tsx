import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./routes/Home.tsx";
import NotFound from "./routes/404.tsx";
import ModulePage from "./routes/modules/ModulePage.tsx";
import ModuleListPage from "./routes/modules/ModuleList.tsx";
import {Navbar} from "../components/bb/nav/Navbar.tsx";
import {Slide, ToastContainer} from "react-toastify";
import LoginPage from "./routes/users/LoginPage.tsx";

export default function App() {
    return (
        <>
            <ToastContainer
                position={"top-right"}
                autoClose={3000}
                hideProgressBar={false}
                transition={Slide}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"dark"}
            />
            <BrowserRouter>
                <div className="max-w-6xl mx-auto">
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/module/:id"} element={<ModulePage/>}/>
                        <Route path={"/modules"} element={<ModuleListPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}