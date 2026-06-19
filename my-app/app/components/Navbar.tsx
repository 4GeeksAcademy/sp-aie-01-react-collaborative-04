"use client";

import { useState } from "react";
import Link from "next/link";
import Favorites from "./Favorites";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState<"apis" | "contact" | null>(null);

    const closeMenus = () => setOpenMenu(null);

    const toggleMenu = (menu: "apis" | "contact") => {
        setOpenMenu((current) => (current === menu ? null : menu));
    };

    return (
        <div>
            <nav className="relative z-50 flex justify-between items-center gap-4 overflow-visible p-4">
                <ul className="flex gap-6">
                    <li>
                        <Link href="/" className="hover:underline" onClick={closeMenus}>
                            Home
                        </Link>
                    </li>
                    <li className="relative">
                        <button
                            type="button"
                            className="cursor-pointer hover:underline"
                            onClick={() => toggleMenu("apis")}
                        >
                                Apis
                        </button>
                        {openMenu === "apis" && (
                            <ul className="absolute left-0 top-full mt-2 min-w-44 rounded-md border bg-black p-2 shadow-md">
                                <li>
                                    <Link href="/apis/thispedrito1" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Pedro
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/apis/danifer24" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Daniel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/apis/alberto" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Alberto
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/apis/itziar" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Itziar
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline" onClick={closeMenus}>
                            About
                        </Link>
                    </li>
                    <li className="relative">
                        <button
                            type="button"
                            className="cursor-pointer hover:underline"
                            onClick={() => toggleMenu("contact")}
                        >
                                Contact
                        </button>
                        {openMenu === "contact" && (
                            <ul className="absolute left-0 top-full mt-2 min-w-44 rounded-md border bg-black p-2 shadow-md">
                                <li>
                                    <Link href="/contact/thispedrito1" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Pedro
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/danifer24" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Daniel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/alberto" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Alberto
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/itziar" className="block rounded px-3 py-2 hover:bg-gray-100 hover:text-black" onClick={closeMenus}>
                                        Itziar
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>

                <Favorites />
            </nav>
        </div>
    );
}