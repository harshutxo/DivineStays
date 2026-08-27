import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"DivineStays | Your New Home in Kota",description:"Student-focused stays across Kota by DivineStays."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}