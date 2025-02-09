/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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

        /* Custom Color Start */
        'tra-primary': {
          DEFAULT: 'hsl(var(--tra-primary))',
          soft: 'hsl(var(--tra-primary-soft))',
          focused: 'hsl(var(--tra-primary-focused))',
          foreground: 'hsl(var(--tra-primary-foreground))',
          5: 'hsl(var(--tra-primary-5))',
          15: 'hsl(var(--tra-primary-15))',
          30: 'hsl(var(--tra-primary-30))',
        },
        'tra-secondary': {
          DEFAULT: 'hsl(var(--tra-secondary))',
          foreground: 'hsl(var(--tra-secondary-foreground))',
          light: 'hsl(var(--tra-secondary-light))',
        },
        'tra-tetriary': {
          DEFAULT: 'hsl(var(--tra-tetriary))',
          foreground: 'hsl(var(--tra-tetriary-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--tra-error))',
          light: 'hsl(var(--tra-error-light))',
        },
        success: {
          DEFAULT: 'hsl(var(--tra-success))',
          light: 'hsl(var(--tra-success-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--tra-warning))',
          light: 'hsl(var(--tra-warning-light))',
        },
        'tra-input': {
          DEFAULT: 'hsl(var(--tra-input))',
          hover: 'hsl(var(--tra-input-soft))',
          light: 'hsl(var(--tra-input-light))',
          focused: 'hsl(var(--tra-input-focused))',
          fill: 'hsl(var(--tra-input-fill))',
        },
        'tra-neutral': {
          DEFAULT: 'hsl(var(--tra-neutral))',
          light: 'hsl(var(--tra-neutral-light))',
          black: 'hsl(var(--tra-neutral-black))',
          'light-black': 'hsl(var(--tra-neutral-light-black))',
          grey: 'hsl(var(--tra-neutral-grey))',
          'disabled-text': 'hsl(var(--tra-neutral-disabled-text))',
          white: 'hsl(var(--tra-neutral-white))',
          'dark-white': 'hsl(var(--tra-neutral-dark-white))',
        },
        'tra-disabled': {
          DEFAULT: 'hsl(var(--tra-disabled))',
          dark: 'hsl(var(--tra-disabled-dark))',
          'light-dark': 'hsl(var(--tra-disabled-light-dark))',
          light: 'hsl(var(--tra-disabled-light))',
        },
        'tra-button': {
          disabled: 'hsl(var(--tra-button-disabled))',
          'disabled-text': 'hsl(var(--tra-button-disabled-text))',
          text: 'hsl(var(--tra-button-text))',
        },
        'tra-background': 'hsl(var(--tra-background))',
        /* Custom Color End */

        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
      },
      width: {
        13: '3.25rem',
        15: '3.75rem',
      },
      boxShadow: {
        'input-hover': '0 0 20px 0 hsl(var(--primary-soft))',
        'input-focus': '0 0 20px 0 hsl(var(--input-focused))',
        'soft-grey': '0px 0px 20px 0px hsl(var(--neutral-soft-grey))',
        'soft-primary': '0px 0px 20px 0px hsl(var(--primary-soft))',
        'hard-grey': '0px 0px 20px 0px hsl(var(--neutral-hard-grey))',
        'hard-primary': '0px 0px 20px 0px hsl(var(--primary-hard))',
      },
      transitionProperty: {
        'font-size': 'font-size',
        height: 'height',
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2.5rem',
        '5xl': '3.125rem',
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
        'linear-loader': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        move: {
          '50%': { paddingLeft: '8px', paddingRight: '0px' },
          '100%': { paddingRight: '4px' },
        },
        slice: {
          '60%': { width: '100%', left: '4px' },
          '100%': { width: '100%', left: '-2px', paddingLeft: '0' },
        },
        check01: {
          '0%': { width: '4px', top: 'auto', transform: 'rotate(0)' },
          '50%': { width: '0px', top: 'auto', transform: 'rotate(0)' },
          '51%': { width: '0px', top: '8px', transform: 'rotate(45deg)' },
          '100%': { width: '5px', top: '8px', transform: 'rotate(45deg)' },
        },
        check02: {
          '0%': { width: '4px', top: 'auto', transform: 'rotate(0)' },
          '50%': { width: '0px', top: 'auto', transform: 'rotate(0)' },
          '51%': { width: '0px', top: '8px', transform: 'rotate(-45deg)' },
          '100%': { width: '10px', top: '8px', transform: 'rotate(-45deg)' },
        },
        firework: {
          '0%': { opacity: '1', boxShadow: '0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', boxShadow: '0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0' },
        },
        bounceInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '1', transform: 'translateX(-5%)' },
          '70%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceOutRight: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5%)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        bounceInLeft: {
          '0%': { opacity: '0', transform: 'translateX(0%)' },
          '50%': { opacity: '1', transform: 'translateX(5%)' },
          '70%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bounceOutLeft: {
          '0%': { transform: 'translateX(0%)' },
          '20%': { transform: 'translateX(5%)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(100%)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(-100%)' },
        },
        flipIn: {
          '0%': { transform: 'rotateX(-90deg)', opacity: '0' },
          '40%': { transform: 'rotateX(45deg)', opacity: '1' },
          '60%': { transform: 'rotateX(-20deg)' },
          '80%': { transform: 'rotateX(20deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        flipOut: {
          '0%': { transform: 'rotateX(0deg)', opacity: '1' },
          '20%': { transform: 'rotateX(-45deg)' },
          '40%': { transform: 'rotateX(20deg)' },
          '60%': { transform: 'rotateX(-20deg)' },
          '100%': { transform: 'rotateX(90deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'linear-loader': 'linear-loader 2s infinite',
        move: 'move 0.3s ease 0.1s forwards',
        slice: 'slice 0.4s ease forwards',
        check01: 'check01 0.4s ease forwards',
        check02: 'check02 0.4s ease forwards',
        firework: 'firework 0.5s ease forwards 0.1s',
        'linear-progress': 'linear-progress linear',
        'bounce-in-right': 'bounceInRight 0.5s forwards',
        'bounce-out-right': 'bounceOutRight 0.5s forwards',
        'bounce-in-left': 'bounceInLeft 0.5s forwards',
        'bounce-out-left': 'bounceOutLeft 0.5s forwards',
        'slide-in-right': 'slideInRight 0.5s linear',
        'slide-out-right': 'slideOutRight 0.5s linear',
        'slide-in-left': 'slideInLeft 0.5s linear',
        'slide-out-left': 'slideOutLeft 0.5s linear',
        'flip-in': 'flipIn 0.7s forwards',
        'flip-out': 'flipOut 0.7s forwards',
      },
      content: {
        required: "'*'",
      },
      zIndex: {
        1: '1',
        2: '2',
        1500: '1500',
        9998: '9998',
        9999: '9999',
      },
      backgroundImage: {
        'check-image': 'url(/assets/images/check-bg.png)',
      },
    },
  },
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};
