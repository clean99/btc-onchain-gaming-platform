'use client'
import React from "react";
import { Navbar, NavbarContent, NavbarItem, Tooltip } from "@nextui-org/react";
import { Logo } from "@/components/logo";
import { usePathname, useRouter } from "next/navigation";
import AddressButton from "./profile";
import useUnisatWallet from "@/hooks/useUnisatWallet";

export default function Navigator() {
    // get url path to determine which link is active
     const pathname = usePathname();
     const router = useRouter();
     const { address } = useUnisatWallet();
     
     React.useEffect(() => {
      console.log(address, 'address');
    }, [address]);
      console.log(address, 'address');

    // Redirect to "/" if not connected and pathname is not "/"
    React.useEffect(() => {
      if (!address && pathname !== "/") {
        router.push("/");
      }
    }, [address, pathname, router]);
  return (
    <Navbar maxWidth="full" className="bg-black border-white" isBordered>
      <NavbarContent>
      <div className="mr-6 cursor-pointer" onClick={() => router.push("/")}>
        <Logo />
      </div>
      <NavbarContent className="hidden sm:flex gap-12" justify='start'>
        <NavbarItem isActive={pathname === "/"}>
          <a onClick={() => router.push("/")} style={{color: 'white', cursor: 'pointer'}}>
            CURATION
          </a>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/gallery"}>
          
            <a 
              onClick={() => address && router.push("/gallery")} 
              style={{color: address ? 'white' : 'grey', cursor: address ? 'pointer' : 'default'}}
            >
              <Tooltip content="Please login first!" color="foreground" isDisabled={!!address}>
                Gallery
              </Tooltip>
            </a>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/leaderboard"} aria-disabled>
          <a style={{color: 'grey'}}>
            LEADER BOARD
          </a>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/create"}>
          <a style={{color: 'grey'}}>
            CREATE
          </a>
        </NavbarItem>
      </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
            <AddressButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
