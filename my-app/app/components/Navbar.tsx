import Link from "next/link";

export default function Navbar() {

    return (
        <div>
            <nav className="flex justify-between items-center p-4">
                <ul className="flex gap-6">
                    <li>
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/myFilms" className="hover:underline">
                            My films
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">
                            About
                        </Link>
                    </li>
                    <li className="relative">
                        <details className="group">
                            <summary className="cursor-pointer list-none hover:underline">
                                Contact
                            </summary>
                            <ul className="absolute left-0 top-full mt-2 min-w-44 rounded-md border bg-black p-2 shadow-md">
                                <li>
                                    <Link href="/contact/thispedrito1" className="block rounded px-3 py-2 hover:bg-gray-100">
                                        Pedro
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/danifer24" className="block rounded px-3 py-2 hover:bg-gray-100">
                                        Daniel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/alberto" className="block rounded px-3 py-2 hover:bg-gray-100">
                                        Alberto
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact/itziar" className="block rounded px-3 py-2 hover:bg-gray-100">
                                        Itziar
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>
        </div>
    );
}