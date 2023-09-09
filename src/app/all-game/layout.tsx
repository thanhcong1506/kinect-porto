import Navbar from "@/components/Navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kinect Portal",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );
}
