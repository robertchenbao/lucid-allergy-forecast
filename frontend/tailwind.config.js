module.exports = {
    content: [
        "./public/index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
};
