/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			ringColor: {
				ring: 'var(--color-ring-ring)',
			},
			backgroundColor: {
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--color-bg-primary-foreground)',
				},
				secondary: 'var(--color-bg-secondary)',
				accent: 'var(--color-bg-accent)',
			},
			textColor: {
				primary: 'var(--color-text-primary)',
				muted: {
					DEFAULT: 'var(--color-text-muted)',
					foreground: 'var(--color-text-muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--color-text-accent)',
					foreground: 'var(--color-text-accent-foreground)',
				},
			},
			borderColor: {
				primary: 'var(--color-text-primary)',
				muted: {
					DEFAULT: 'var(--color-border-muted)',
					foreground: 'var(--color-border-muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--color-text-accent)',
					foreground: 'var(--color-text-accent-foreground)',
				},
			},

			fontFamily: {
				sans: ['Inter Tight', 'ui-sans-serif', 'system-ui'],
			},
			colors: {
				base: '#FF6B6B',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'hsl(var(--primary-foreground))',
				},

				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: '#F8F8F8',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				body: {
					light: '#8A9099',
				},
				status: {
					'in-progress': '#F6F3FC',
					closed: '#F1FBF3',
					canceled: '#FFF2F3',
					verification: '#FFFBF0',
				},

				ringColor: {
					primary: 'var(--primary)',
				},
				pagination: 'var(--pagination)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		require('vidstack/tailwind.cjs')({
			selector: '.media-player',

			prefix: 'media',
		}),
		require('@tailwindcss/container-queries'),
		require('tailwindcss-animate'),
	],
};
