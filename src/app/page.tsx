import WelcomePage from "../components/WelcomePage";
import Navbar from "@/components/Navbar";
import WelcomepageNavbar from "@/components/WelcomepageNavbar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);

  return (
    <>
      <main className=" font-primary">
        {session ? <Navbar /> : <WelcomepageNavbar />}
        <WelcomePage />
      </main>
    </>
  );
}
