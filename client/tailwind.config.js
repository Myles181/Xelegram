/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // 1200px
      xl: { max: "75em" },
      // 1000px
      lg: { max: "62.5em" },
      // 750px
      md: { max: "46.88em" },
      // 550px
      sm: { max: "34.38em" },
      // 450px
      xs: { max: "28.13em" },
    },
    extend: {
      colors: {
        // primary: "var(--bg-primary)",
        // secondary: "var(--bg-secondary)",
        "cta-icon": "var(--bg-cta-icon)",
        "message-highlight": "var(--bg-message-highlight)",
        message: "var(--bg-message)",
        "primary-text": "var(--text-primary)",
        "secondary-text": "var(--text-secondary)",
        "secondary-light-text": "var(--text-secondary-light)",
        "avatar-check": "var(--avatar-check)",
        "avatar-check-read": "var(--avatar-check-read)",
        scrollbar: "var(--scrollbar)",
        danger: "var(--danger)",
        "box-shadow": "var(--box-shadow)",
        modal: "var(--bg-modal)",
        send: "var(--bg-send)",
        "message-status": "var(--message-status)",
        // border: "var(--border)",
        search: "var(--bg-search)",
        "search-border": "var(--border-search)",
        "recorder-icon": "var(--recorder-icon)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
