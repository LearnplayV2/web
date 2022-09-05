import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/user";
import { TITLE } from "../../utils/config";
import { UserImage } from "../userImage";
import ArrowDown from "./arrow_down";
import HamburguerIcon from "./hamburguer";
import Notifications from "./notification";

export default function Navbar({ isPrivate = false }: { isPrivate?: boolean }) {
    const { imageUuid } = useSelector((state: any) => state.user) as UserState;

    useEffect(() => {
        shrinkNavbar();
    }, []);

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
        const MenuDropDown = ({ title, children }: { title: string, children: React.ReactNode }) => (
            <li tabIndex={0}>
                <a className="justify-between">
                    {title}
                    <ArrowDown />
                </a>
                <ul className="p-2 bg-light">
                    {children}
                </ul>
            </li>
        );

        const MiddleMenu = () => {
            return (
                <>
                    <li><Link href='/dashboard'><a>Home</a></Link></li>
                    <MenuDropDown title="Parent">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </MenuDropDown>
                    <li><Link href='/dashboard/members'><a>Membros</a></Link></li>
                </>
            )
        }

        return (
            <>
                <div className="navbar main-navbar bg-white-opacity-7 px-5">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <HamburguerIcon />
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white-opacity-7 rounded-md w-52">
                                {/* mobile menu */}
                                <MiddleMenu />
                            </ul>
                        </div>
                        <Link href='/dashboard'>
                            <a className="btn btn-link link-opacity text-green-400 hover:text-green-300 text-xl md:text-2xl normal-case no-animation">
                                {TITLE}
                            </a>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <MiddleMenu />
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Notifications />
                        <Link href='/dashboard/profile'>
                            <a tabIndex={0} className="ml-3 no-animation btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={UserImage(imageUuid)} />
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="main-navbar navbar bg-white-opacity-7 flex flex-col">
                <Link href='/'><a className="btn btn-link link-opacity text-green-400 hover:text-green-300 text-2xl normal-case no-animation">{TITLE}</a></Link>
            </div>
        </>
    );
}
