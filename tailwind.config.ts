import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "node_modules/preline/dist/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'slide-out-right': 'slide-out-right 0.4s ease-in',
        'fade-in': 'fade-in 0.4s ease-out',
      },
      fontFamily: {
        'baloo': ['"Baloo Bhaijaan 2"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'vazirmatn': ['Vazirmatn', 'serif'],
      },
      colors: {
        greenbtn: "#2E6237",
        node: "#DFC196",
        milky: "#F9EDC5",
        browni: "#60401f",
        browntext: "#604020",
      },
    }
  },
  plugins: [require("preline/plugin")],
} satisfies Config;