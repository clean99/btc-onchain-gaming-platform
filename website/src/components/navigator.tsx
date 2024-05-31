"use client";
import React from "react";
import {Navbar, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";
import AddressButton from "./profile";
import { useAuthStore } from "@/states/auth";

export default function Navigator() {
    // get url path to determine which link is active
     const pathname = usePathname();
    const [address] = useAuthStore((state) => [state.address]);
  return (
    <Navbar maxWidth="full" className="bg-black border-white" isBordered>
      <NavbarContent>
      <div className="mr-6 cursor-pointer" onClick={() => {window.location.href = "/";}}>
        <Logo />
      </div>
      <NavbarContent className="hidden sm:flex gap-12" justify='start'>
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" href="/">
            CURATION
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/gallery"}>
          <Link href="/gallery" color="foreground" isDisabled={!address}>
            Gallery
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/leaderboard"} >
          <Link href="/leaderboard" color="foreground" isDisabled>
            LEADER BOARD
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/create"}>
          <Link color="foreground" href="/create" isDisabled>
            CREATE
          </Link>
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
