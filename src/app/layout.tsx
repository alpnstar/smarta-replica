import type {Metadata} from "next";
import "./globals.scss";
import {Header} from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";
import React from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import Providers from "@/lib/Providers";


export const metadata: Metadata = {
    title: "Smarta Store",
    description: "Магазин смартфонов",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <html lang="en">
            <body>
            <AppRouterCacheProvider>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </AppRouterCacheProvider>

            </body>
            </html>
        </Providers>

    );
}
