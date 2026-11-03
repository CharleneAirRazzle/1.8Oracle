/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#F0F0F0',
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#444444',
          600: '#333333',
          700: '#222222',
          800: '#1A1A1A',
          900: '#111111',
        },
        macaron: {
          lavender: '#F5F5F5',
          lavenderDeep: '#EAEAEA',
          peach: '#F5F5F5',
          peachDeep: '#EAEAEA',
          mint: '#F5F5F5',
          mintDeep: '#EAEAEA',
          babyblue: '#F5F5F5',
          babyblueDeep: '#EAEAEA',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E8E8E8',
        },
        ink: {
          900: '#1A1A1A',
          700: '#666666',
          500: '#999999',
        },
      },
      fontFamily: {
        heading: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        cozy: '2px',
      },
      boxShadow: {
        card: 'none',
        'card-hover': '0 4px 24px -8px rgba(26, 26, 26, 0.08)',
        button: '0 2px 8px -3px rgba(26, 26, 26, 0.15)',
      },
    },
  },
  plugins: [],
};
