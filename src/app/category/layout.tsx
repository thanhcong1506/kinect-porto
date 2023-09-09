import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinect Portal",
  description: "Generated by create next app",
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className=" font-primary">
    //   <body className={inter.className}>
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
    //   </body>
    // </html>
  );
}
