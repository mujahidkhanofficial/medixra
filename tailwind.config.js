/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#556B2F', // Olive Green
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#9CAF88', // Soft Sage Green
					foreground: '#FFFFFF',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: '#D4AF37', // Gold/Amber
					foreground: '#FFFFFF',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        olive: {
          50: '#F7F9F3',
          100: '#EEF2E6',
          200: '#DDE6CC',
          300: '#CCD9B3',
          400: '#BBCD99',
          500: '#6B8E23', // Olive Drab
          600: '#556B2F', // Dark Olive Green
          700: '#445626',
          800: '#33401C',
          900: '#222B13',
        },
        sage: {
          50: '#F5F7F3',
          100: '#EBF0E7',
          500: '#9CAF88',
          600: '#7D9167',
        },
        gold: {
          400: '#D4AF37', // Metallic Gold
          500: '#C9A961',
          600: '#A68B30',
        },
        charcoal: {
          50: '#F2F2F2',
          100: '#E6E6E6',
          500: '#666666',
          600: '#4D4D4D',
          700: '#404040',
          800: '#3A3A3A', // Deep Charcoal
          900: '#2C2C2C', // Deep Charcoal Dark
        },
        cream: {
          50: '#F5F5F0', // Cream
          100: '#E8DCC8', // Warm Beige
          200: '#DFD3C3',
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};