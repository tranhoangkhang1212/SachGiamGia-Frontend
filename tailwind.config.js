/** @type {import('tailwindcss').Config} */
// eslint-disable max-classes-per-file

const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            maxWidth: {
                primary: '1150px',
            },
            boxShadow: {
                default: '0px 3px 25px 0px rgba(31,38,67,0.1)',
            },
        },
        colors: {
            primary: '#65b597',
            secondary: '#F9C20E',
            black: '#000',
            dark: '#343a40',
            gray: '#dcdcdc',
            white: '#fff',
            'gray-dark': '#41454fe6',
            'white-gray': '#9a9ca2',
        },
    },
    plugins: [
        plugin(function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({});
            addComponents({
                '.card': {
                    backgroundColor: theme('colors.white'),
                    borderRadius: theme('borderRadius.lg'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.xl'),
                },
            });
            addUtilities({
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '.margin-center': {
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
            });
        }),
    ],
};
