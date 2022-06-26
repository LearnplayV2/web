import Link from "next/link";
import onReady from "../../hooks/loadOnce";
import { TITLE } from "../../utils/config";

export default function Navbar() {

    onReady(() => {
        shrinkNavbar();
    })

    function shrinkNavbar() {
        const navbar = document.querySelector('.main-navbar') as HTMLElement;

        window.onscroll = (ev: any) => {
            if (navbar != null)
                if (document.documentElement.scrollTop > 200) {
                    navbar.style.position = 'fixed';
                    navbar.style.opacity = '.8';
                } else if (document.documentElement.scrollTop == 0) {
                    navbar.style.position = 'relative';
                    navbar.style.opacity = '1';
                }

        }
    }

    return (
        <>
            {/* @ts-ignore */}
            <div className="main-navbar navbar bg-white-opacity-7 flex flex-col">
                    <Link href='/'><a className="btn btn-link link-opacity text-green-400 text-2xl normal-case">{TITLE}</a></Link>
            </div>
        </>
    );
}