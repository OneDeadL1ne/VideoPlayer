import type { Config } from 'tailwindcss'
import containerplagin from "@tailwindcss/container-queries"
const config: Config = {
  content: [
    './pages//*.{js,ts,jsx,tsx,mdx}',
    './components//*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'phone': '460px',
        // => @media (min-width: 640px) { ... }
  
        
      },
      
    },
  },
  plugins: [containerplagin],
}
export default config