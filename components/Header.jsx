import Link from "next/link";
import Image from "next/image";
import { Navbar } from "flowbite-react";

export default function Header() {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          POWERKRAFT
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true} className="text-lg">
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-lg">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-lg">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
