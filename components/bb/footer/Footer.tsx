import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="mx-auto w-full text-center my-8">
            This project is part of the{" "}
            <Link to="https://battlebit.community/">battlebit.community</Link>.{" "}
            <Link to={"/privacy"}>Privacy Policy</Link>
        </footer>
    );
};
