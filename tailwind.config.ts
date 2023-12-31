import type { Config } from "tailwindcss";
import imageWelcome from "@/public/welcome.png";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        welcome: "url('/welcome.png')",
        login: "url('/login.png')",
        signup: "url('/signup-img.png')",
        featured: "url('/bioShock.png')",
        detail: `linear-gradient(0, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('/detailPageBg.png')`,
      },
    },
    fontFamily: {
      primary: ["Roboto", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
