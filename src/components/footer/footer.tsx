import { BBLink } from "../common/link.tsx";

export const Footer = () => {
    return (
        <footer className="mx-auto my-8 flex w-full items-center justify-between gap-3">
            <div className="flex-1">
                This project is part of the <BBLink to="https://battlebit.community/">battlebit.community</BBLink> and
                not affiliated with BattleBit Remastered.
            </div>

            <div>
                <BBLink to={"/privacy"}>Privacy Policy</BBLink>
            </div>
        </footer>
    );
};
