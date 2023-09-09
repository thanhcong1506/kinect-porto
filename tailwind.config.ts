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
        detail: "url('/detailPageBg.png')",
      },
    },
    fontFamily: {
      primary: ["Roboto", "sans-serif"],
    },

    transitionProperty: {
      height: "height",
      spacing: "margin, padding",
      width: "width",
    },
  },
  plugins: [],
};
export default config;
