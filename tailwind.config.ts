import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenbtn: "#2E6237",
        node: "#DFC196",
        milky:"#F9EDC5",
      },
    },
  },
  plugins: [],
} satisfies Config;
