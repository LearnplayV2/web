import Link from "next/link";
import { useSelector } from "react-redux";
import onReady from "../../hooks/loadOnce";
import { UserState } from "../../store/user/userReducer";
import { TITLE } from "../../utils/config";
import { UserImage } from "../userImage";
import ArrowDown from "./arrow_down";
import HamburguerIcon from "./hamburguer";

export default function Navbar({ isPrivate = false }: { isPrivate?: boolean }) {

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

    if (isPrivate) {
        const { photo } = useSelector((state: any) => state.user) as UserState;

        return (
            <>
                <div className="navbar main-navbar bg-white-opacity-7">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <HamburguerIcon />
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li tabIndex={0}>
                                    <a className="justify-between">
                                        Parent
                                        <ArrowDown />
                                    </a>
                                    <ul className="p-2 bg-white-opacity-7">
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </div>
                        <Link href='/dashboard'><a className="btn btn-link link-opacity text-green-400 hover:text-green-300 text-2xl normal-case">{TITLE}</a></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><a>Item 1</a></li>
                            <li tabIndex={0}>
                                <a> Parent <ArrowDown /> </a>
                                <ul className="p-2 bg-white-opacity-7">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div> 
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={UserImage(photo)} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href='/dashboard/profile'><a>Meu perfil</a></Link>
                                </li>
                                <li><Link href="/dashboard/logout">Sair</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="main-navbar navbar bg-white-opacity-7 flex flex-col">
                <Link href='/'><a className="btn btn-link link-opacity text-green-400 hover:text-green-300 text-2xl normal-case">{TITLE}</a></Link>
            </div>
        </>
    );
}
