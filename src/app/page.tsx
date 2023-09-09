import ResetPWSuccess from "@/components/ResetPWSuccess";
import WelcomePage from "../components/WelcomePage";
import HomePage from "@/components/HomePage";
import VerifySuccess from "@/components/VerifySuccess";
import VerifyFail from "@/components/VerifyFail";

export default function Home() {
  return (
    <main className=" font-primary">
      {/* <WelcomePage /> */}
      <VerifySuccess />
    </main>
  );
}
