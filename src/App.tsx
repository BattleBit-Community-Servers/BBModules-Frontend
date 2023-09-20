import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./routes/404.tsx";
import ModulePage from "./routes/modules/ModulePage.tsx";
import ModuleListPage from "./routes/modules/ModuleList.tsx";
import { Navbar } from "./components/nav/navbar.tsx";
import { Footer } from "./components/footer/Footer.tsx";
import { Slide, ToastContainer } from "react-toastify";
import Privacy from "./routes/Privacy.tsx";
import UploadPage from "./routes/UploadPage.tsx";

export default function App() {
    return (
        <>
            <ToastContainer
                position={"top-right"}
                autoClose={2500}
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
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/modules" replace />} />
                        <Route path={"/module/:id"} element={<ModulePage />} />
                        <Route path={"/modules"} element={<ModuleListPage />} />
                        <Route path={"/upload"} element={<UploadPage />} />
                        <Route path={"/privacy"} element={<Privacy />} />
                        <Route path={"/admin/modules"} element={<ModuleListPage baseFilter="unapproved" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}
