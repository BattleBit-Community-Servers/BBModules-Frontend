import { BBLink } from "../common/link.tsx";

export const Footer = () => {
    return (
        <footer className="mx-auto my-8 flex w-full items-center justify-center gap-3">
            <div className="flex-1 text-end">
                This project is part of the <BBLink to="https://battlebit.community/">battlebit.community</BBLink>
            </div>

            <div className="h-1 w-1 rounded-full bg-muted"></div>

            <div className="flex-1">
                <BBLink to={"/privacy"}>Privacy Policy</BBLink>
            </div>
        </footer>
    );
};
