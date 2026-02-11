/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030712", // Deep void black
                surface: "#111827", // slightly lighter for cards
                primary: "#00f3ff", // Electric Cyan
                secondary: "#bc13fe", // Neon Purple
                accent: "#ff0055", // Hot Pink
                "glass-border": "rgba(255, 255, 255, 0.08)",
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "slide-up": "slideUp 0.5s ease-out forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "from": { boxShadow: "0 0 10px -5px #00f3ff" },
                    "to": { boxShadow: "0 0 20px 5px #00f3ff" },
                },
                slideUp: {
                    "from": { opacity: 0, transform: "translateY(20px)" },
                    "to": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
}
