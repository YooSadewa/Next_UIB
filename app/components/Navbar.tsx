import Image from "next/image";
import ActiveLink from "./ActiveLink";
// import NavbarLayout from "../layout";

export default function Navbar() {
  return (
    <nav className='flex justify-between p-[30px] bg-gray-900 text-white font-bold items-center'>
              <h1 className='text-[20px]'>Next Js</h1>
              <ul className='flex gap-5'>
                <li>
                  <ActiveLink href="/">Homes</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/about">About</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/laboratorium">Laboratorium Facilities</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/network">Network Facilities</ActiveLink>
                </li>
                <li>
                  <ActiveLink href="/contact">Contact Me</ActiveLink>
                </li>
              </ul>
    </nav>
  );
}
