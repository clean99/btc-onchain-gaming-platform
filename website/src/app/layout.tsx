import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navigator from "@/components/navigator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import localFont from 'next/font/local';

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './Geo-Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Forge 7K",
  description: "The First Bitcoin Web Game Engine"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <NextUIProvider>
          <ToastContainer position="top-center" theme="dark" />
          <Navigator />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
