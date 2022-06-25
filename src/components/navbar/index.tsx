import Link from "next/link";
import onReady from "../../hooks/loadOnce";
import { TITLE } from "../../utils/config";

export default function Navbar() {

    onReady(() => {
        shrinkNavbar();
    })

    function shrinkNavbar() {
        const navbar = document.querySelector('.main-navbar') as HTMLElement;
        
        window.onscroll = (ev : any) => {
            if(navbar != null)
            if(document.documentElement.scrollTop > 200) {
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
            <div className="main-navbar navbar bg-white-opacity-7">
                <div className="navbar-container">
                    <div className="">
                        <Link href='/'><a className="btn btn-link link-opacity text-white text-xl normal-case">{TITLE}</a></Link>
                    </div>
                    <div className="">
                        <ul className="menu menu-horizontal p-0">
                            <li><Link href='/login'><a className="btn btn-link link-opacity">Entrar</a></Link></li>
                            <li><Link href='/register'><a className='btn btn-error text-white button-rounded button-opacity'>Criar conta</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}