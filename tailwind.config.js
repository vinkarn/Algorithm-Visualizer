
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				node: {
					default: '#718096',
					wall: '#1A202C',
					start: '#48BB78',
					end: '#F56565',
					visited: '#9F7AEA',
					path: '#F6AD55',
					current: '#4299E1'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'visit-node': {
					'0%': {
						transform: 'scale(0.3)',
						backgroundColor: '#9F7AEA',
						borderRadius: '100%'
					},
					'50%': {
						backgroundColor: '#9F7AEA',
					},
					'75%': {
						transform: 'scale(1.2)',
						backgroundColor: '#9F7AEA',
					},
					'100%': {
						transform: 'scale(1.0)',
						backgroundColor: '#9F7AEA',
					},
				},
				'shortest-path': {
					'0%': {
						transform: 'scale(0.6)',
						backgroundColor: '#F6AD55',
					},
					'50%': {
						transform: 'scale(1.2)',
						backgroundColor: '#F6AD55',
					},
					'100%': {
						transform: 'scale(1.0)',
						backgroundColor: '#F6AD55',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'visit-node': 'visit-node 1.5s ease-out',
				'shortest-path': 'shortest-path 1.5s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
