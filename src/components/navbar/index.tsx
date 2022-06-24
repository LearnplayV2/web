import Link from "next/link";
import { createRef, RefObject } from "react";
import onReady from "../../hooks/loadOnce";
import { TITLE } from "../../utils/config";

export default function Navbar() {

    const navbar = createRef() as RefObject<any>;

    onReady(() => {
        shrinkNavbar();
    })

    function shrinkNavbar() {
        window.onscroll = (ev : any) => {
            if(document.documentElement.scrollTop > 200) {
                navbar.current.style.position = 'fixed';
                navbar.current.style.opacity = '.8';
            } else if (document.documentElement.scrollTop == 0) {
                navbar.current.style.position = 'relative';
                navbar.current.style.opacity = '1';
            }
            
        }
    }

    return (
        <>
            {/* @ts-ignore */}
            <div ref={navbar} className="main-navbar navbar bg-white-opacity-7">
                <div className="navbar-container">
                    <div className="">
                        <Link href='/'><a className="btn btn-link link-opacity text-white normal-case text-xl">{TITLE}</a></Link>
                    </div>
                    <div className="">
                        <ul className="menu menu-horizontal p-0">
                            <li><a className="btn btn-link link-opacity">Fazer login</a></li>
                            <li><Link href='/register'><a className='btn btn-error text-white button-rounded button-opacity'>Cadastre-se</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}