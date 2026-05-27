/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ocean: {
                    50: '#f0f9fb',
                    100: '#d9f0f5',
                    200: '#b3e1eb',
                    300: '#7ec9db',
                    400: '#4aa8c4',
                    500: '#2d8aab',
                    600: '#236f8d',
                    700: '#1f5a73',
                    800: '#1e4b5f',
                    900: '#1c3f4f',
                    950: '#0c2433',
                },
            },
            fontFamily: {
                display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            },
        },
    },
    plugins: [],
}
