import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)", // Default border radius
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--background": "0 0% 100%",
          "--foreground": "224 71.4% 4.1%",
          "--card": "0 0% 100%",
          "--card-foreground": "224 71.4% 4.1%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "224 71.4% 4.1%",
          "--primary": "262.1 83.3% 57.8%",
          "--primary-foreground": "210 20% 98%",
          "--secondary": "220 14.3% 95.9%",
          "--secondary-foreground": "220.9 39.3% 11%",
          "--muted": "220 14.3% 95.9%",
          "--muted-foreground": "220 8.9% 46.1%",
          "--accent": "220 14.3% 95.9%",
          "--accent-foreground": "220.9 39.3% 11%",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "210 20% 98%",
          "--border": "220 13% 91%",
          "--input": "220 13% 91%",
          "--ring": "262.1 83.3% 57.8%",
          "--radius": "0.75rem",
          "--chart-1": "12 76% 61%",
          "--chart-2": "173 58% 39%",
          "--chart-3": "197 37% 24%",
          "--chart-4": "43 74% 66%",
          "--chart-5": "27 87% 67%",
        },
        ".dark": {
          "--background": "224 71.4% 4.1%",
          "--foreground": "210 20% 98%",
          "--card": "224 71.4% 4.1%",
          "--card-foreground": "210 20% 98%",
          "--popover": "224 71.4% 4.1%",
          "--popover-foreground": "210 20% 98%",
          "--primary": "263.4 70% 50.4%",
          "--primary-foreground": "210 20% 98%",
          "--secondary": "215 27.9% 16.9%",
          "--secondary-foreground": "210 20% 98%",
          "--muted": "215 27.9% 16.9%",
          "--muted-foreground": "217.9 10.6% 64.9%",
          "--accent": "215 27.9% 16.9%",
          "--accent-foreground": "210 20% 98%",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "210 20% 98%",
          "--border": "215 27.9% 16.9%",
          "--input": "215 27.9% 16.9%",
          "--ring": "263.4 70% 50.4%",
          "--chart-1": "220 70% 50%",
          "--chart-2": "160 60% 45%",
          "--chart-3": "30 80% 55%",
          "--chart-4": "280 65% 60%",
          "--chart-5": "340 75% 55%",
        },
      });
    }),
  ],
};
