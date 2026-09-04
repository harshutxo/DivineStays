import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"DivineStays | Student Living in Kota",description:"Discover DivineStays hostels across Kota, Rajasthan."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
