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
                    <li>
                        <Link href="/contact/danifer24" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}