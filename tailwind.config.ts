import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
		'node_modules/preline/dist/*.js',
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			greenbtn: '#2E6237',
  			node: '#DFC196',
  			milky: '#F9EDC5',
  		},

  	},
  	
  	
  },
  plugins: [require('preline/plugin')],
} satisfies Config;
