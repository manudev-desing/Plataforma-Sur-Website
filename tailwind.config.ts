import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Plataforma Sur Brand Colors
        "midnight-green": "#04444D",
        emerald: "#04BA70",
        white: "#FFFFFF",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      fontWeight: {
        "outfit-light": "300",
        "outfit-regular": "400",
        "outfit-medium": "500",
        "outfit-semibold": "600",
        "outfit-bold": "700",
        "outfit-black": "800",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "splash-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20,20 Q40,10 60,25 T100,20 L100,100 L0,100 Z' fill='rgba(4,186,112,0.1)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "splash-float": "splashFloat 15s ease-in-out infinite",
        "splash-float-reverse": "splashFloatReverse 20s ease-in-out infinite",
        "morph-1": "morph1 8s ease-in-out infinite",
        "morph-2": "morph2 10s ease-in-out infinite",
        "morph-3": "morph3 12s ease-in-out infinite",
        "wave-spin": "waveSpin 20s linear infinite",
        "particle-float": "particleFloat 6s ease-in-out infinite",
        "splash-pulse": "splashPulse 8s ease-in-out infinite",
        "text-flow": "textFlow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        splashFloat: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "25%": {
            transform: "translateX(10px) translateY(-15px) rotate(1deg)",
          },
          "50%": {
            transform: "translateX(-5px) translateY(-10px) rotate(-0.5deg)",
          },
          "75%": {
            transform: "translateX(-10px) translateY(-5px) rotate(0.5deg)",
          },
        },
        splashFloatReverse: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "25%": {
            transform: "translateX(-10px) translateY(15px) rotate(-1deg)",
          },
          "50%": {
            transform: "translateX(5px) translateY(10px) rotate(0.5deg)",
          },
          "75%": {
            transform: "translateX(10px) translateY(5px) rotate(-0.5deg)",
          },
        },
        morph1: {
          "0%, 100%": { borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%" },
          "25%": { borderRadius: "47% 53% 36% 64% / 45% 62% 38% 55%" },
          "50%": { borderRadius: "54% 46% 63% 37% / 48% 55% 45% 52%" },
          "75%": { borderRadius: "36% 64% 47% 53% / 62% 38% 55% 45%" },
        },
        morph2: {
          "0%, 100%": { borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%" },
          "33%": { borderRadius: "62% 38% 37% 63% / 44% 59% 41% 56%" },
          "66%": { borderRadius: "63% 37% 38% 62% / 56% 41% 59% 44%" },
        },
        morph3: {
          "0%, 100%": { borderRadius: "71% 29% 43% 57% / 64% 35% 65% 36%" },
          "20%": { borderRadius: "29% 71% 57% 43% / 35% 64% 36% 65%" },
          "40%": { borderRadius: "43% 57% 71% 29% / 65% 36% 64% 35%" },
          "60%": { borderRadius: "57% 43% 29% 71% / 36% 65% 35% 64%" },
          "80%": { borderRadius: "71% 29% 43% 57% / 64% 35% 65% 36%" },
        },
        waveSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translateY(0px) scale(1)", opacity: "0.3" },
          "50%": { transform: "translateY(-20px) scale(1.2)", opacity: "0.8" },
        },
        splashPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        textFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      borderRadius: {
        "organic-1": "63% 37% 54% 46% / 55% 48% 52% 45%",
        "organic-2": "38% 62% 63% 37% / 41% 44% 56% 59%",
        "organic-3": "71% 29% 43% 57% / 64% 35% 65% 36%",
      },
      boxShadow: {
        organic:
          "0 20px 60px rgba(4, 68, 77, 0.15), 0 10px 30px rgba(4, 186, 112, 0.1)",
        splash:
          "0 25px 80px rgba(4, 68, 77, 0.2), 0 15px 40px rgba(4, 186, 112, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        glow: "0 0 30px rgba(4, 186, 112, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
