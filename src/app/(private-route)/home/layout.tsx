import { options } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/Navbar";
// import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Kinect Portal - Home",
  description: "Generated by create next app",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
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