import { cva } from 'class-variance-authority';
import { forwardRef, useEffect, useRef } from 'react';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { cn } from '@/lib/utils';
import { IButton } from '@/types/types';

export const buttonVariants = cva(
  `btn-ripple relative inline-flex select-none flex-wrap items-center justify-center overflow-hidden whitespace-nowrap text-sm font-medium ring-offset-background transition-all
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none `,
  {
    variants: {
      variant: {
        solid: 'bg-tra-primary text-tra-primary-foreground hover:bg-tra-primary/90 disabled:bg-tra-button-disabled disabled:text-tra-button-disabled-text',
        outlined: 'border-2 border-tra-primary bg-transparent text-tra-primary-foreground hover:bg-tra-primary/10 disabled:border-tra-button-disabled-text disabled:text-tra-button-disabled-text',
        ghost: 'bg-transparent text-tra-primary hover:text-tra-primary/90 disabled:text-tra-button-disabled-text',
      },
      color: {
        primary: 'bg-tra-primary text-tra-primary-foreground',
        secondary: 'bg-tra-secondary text-tra-secondary-foreground',
        tetriary: 'bg-tra-tetriary text-tra-tetriary-foreground',
      },
      size: {
        default: 'h-14 px-7',
        sm: 'h-13 rounded-lg px-6',
        lg: 'h-15 rounded-lg px-8',
        icon: 'size-10 min-h-10 min-w-10 rounded-full',
      },
      rounded: {
        default: 'rounded-lg',
        lg: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border-tra-primary bg-transparent text-tra-primary hover:bg-tra-primary/10',
      },
      {
        variant: 'outlined',
        color: 'secondary',
        className: 'border-tra-secondary bg-transparent text-tra-secondary hover:bg-tra-secondary/10',
      },
      {
        variant: 'outlined',
        color: 'tetriary',
        className: 'border-tra-tetriary bg-transparent text-tra-tetriary hover:bg-tra-tetriary/10',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-tra-primary text-tra-primary-foreground hover:bg-tra-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-tra-secondary text-tra-secondary-foreground hover:bg-tra-secondary/90',
      },
      {
        variant: 'solid',
        color: 'tetriary',
        className: 'bg-tra-tetriary text-tra-tetriary-foreground hover:bg-tra-tetriary/90',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'bg-transparent text-tra-primary hover:text-tra-primary/80',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'bg-transparent text-tra-secondary hover:text-tra-secondary/80',
      },
      {
        variant: 'ghost',
        color: 'tetriary',
        className: 'bg-transparent text-tra-tetriary hover:text-tra-tetriary/80',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'default',
      color: 'primary',
      rounded: 'default',
    },
  },
);

const spinnerVariants = cva(
  'mr-2 border-2 border-t-tra-button-disabled text-tra-button-disabled-text',
  {
    variants: {
      size: {
        default: 'size-4 max-h-4 min-h-4 min-w-4 max-w-4',
        sm: 'size-3 max-h-3 min-h-3 min-w-3 max-w-3',
        lg: 'size-5 max-h-5 min-h-5 min-w-5 max-w-5',
        icon: 'size-3 max-h-3 min-h-3 min-w-3 max-w-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({
    asChild,
    children,
    className,
    color,
    disableEffect = false,
    disabled,
    effectColor = '#212129',
    effectOpacity = '0.3',
    loading = false,
    loadingSpinnerClassname,
    loadingText,
    rounded = 'default',
    size,
    variant,
    ...props
  }, ref) => {
    const Comp = asChild ?? 'button';
    const { t } = useLocalizeContext();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const btn = buttonRef.current;
      const handleClick = (event: MouseEvent) => {
        const { pageX, pageY, currentTarget } = event;
        if (currentTarget instanceof HTMLElement) {
          const x = ((pageX - currentTarget.offsetLeft) * 100) / currentTarget.offsetWidth;
          const y = ((pageY - currentTarget.offsetTop) * 100) / currentTarget.offsetHeight;
          const ripple = document.createElement('span');
          const uniqueClassName = `ripple-effect-${Math.random().toString(36).substr(2, 9)}`;
          ripple.classList.add('ripple-effect', uniqueClassName);
          ripple.style.left = `${x}%`;
          ripple.style.top = `${y}%`;

          const style = document.createElement('style');
          style.innerHTML = `
          .${uniqueClassName} {
            position: absolute;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 5px;
            background-color: ${effectColor};
            height: 5px;
            pointer-events: none;
            z-index: 5;
            animation: ripple 0.8s linear infinite;
          }
          @keyframes ripple {
            0% {
              width: 0;
              height: 0;
              opacity: ${effectOpacity};
            }
            100% {
              width: 500px;
              height: 500px;
              opacity: 0;
            }
          }
        `;
          document.head.appendChild(style);

          btn!.appendChild(ripple);
          setTimeout(() => {
            ripple.remove();
            style.remove();
          }, 800);
        }
      };

      if (btn && !disableEffect) {
        btn.addEventListener('click', handleClick);
      }

      return () => {
        if (btn) {
          btn.removeEventListener('click', handleClick);
        }
      };
    }, [effectColor, effectOpacity, disableEffect]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className, rounded }))}
        ref={ref || buttonRef}
        disabled={loading || disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {loading && (
          <LoadingSpinner className={cn(spinnerVariants({ size }), loadingSpinnerClassname)} />
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        <div>{(loading && size !== 'icon') ? (loadingText ?? t('Sending...')) : (loading && size === 'icon') ? null : children}</div>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export default Button;
