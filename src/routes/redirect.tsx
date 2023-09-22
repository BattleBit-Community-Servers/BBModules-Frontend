import { useNavigate } from "react-router-dom";
import { BBLink } from "../components/common/link";

const queryParams = new URLSearchParams(window.location.search);

export default function RedirectPage() {
    const navigate = useNavigate();
    const url = queryParams.get("url");

    if (!url) {
        navigate("/404", { replace: true });
        return;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 className="mb-3 mt-6 text-3xl font-bold">Redirect Warning</h2>
            <p>You are about to leave this website and go to the following link:</p>
            <BBLink to={url} style={{ fontSize: "18px" }}>
                {url}
            </BBLink>
        </div>
    );
}
