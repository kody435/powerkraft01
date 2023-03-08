import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
      <div className="flex justify-between items-center space-x-2 font-bold px-5 py-5 border-b-2">
        <Link href="/" className="flex flex-row space-x-6 ">
          <Image
            src="https://cdn.sanity.io/images/wub429kh/production/0e2f51b71b329e866d9a4fb29c0581fb2c65c354-2054x1263.png"
            alt="logo"
            width={50}
            height={100}
            className="object-fit"
          />
          <h1 className="font-bold text-2xl">POWERKRAFT</h1>
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-500 text-xl hover:text-black">
            About
          </Link>
          <Link href="/" className="text-gray-500 text-xl hover:text-black">
            Contact
          </Link>
        </div>
      </div>
    );
}