/* eslint-disable no-nested-ternary */
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Check, Minus } from '@/assets/Icons';
import Label from '@/components/Label';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  `peer shrink-0 rounded-sm border border-tra-primary ring-offset-background flex items-center justify-center
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:cursor-not-allowed disabled:opacity-50 disabled:border-tra-input disabled:bg-tra-input disabled:text-white 
  data-[state=checked]:bg-tra-primary data-[state=checked]:text-tra-primary-foreground data-[state=checked]:disabled:bg-tra-input`,
  {
    variants: {
      variant: {
        rectangular: 'rounded-sm',
        circular: 'rounded-full',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'rectangular',
    },
  },
);

type CheckboxProps = {
  className?: string;
  disabled?: boolean;
  id?: string
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'rectangular' | 'circular';
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({
  className,
  disabled,
  id,
  label,
  size,
  variant,
  ...props
}, ref) => (
  <div className="flex items-center gap-2">
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      disabled={disabled}
      className={cn(checkboxVariants({ variant, size }), className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {disabled
        ? <Minus className={`${size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-tra-input`} />
        : (
          <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
          >
            <Check className={`${size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} rounded-sm bg-tra-primary`} />
          </CheckboxPrimitive.Indicator>
        )}
    </CheckboxPrimitive.Root>
    {label && <Label className="select-none" htmlFor={id} id={`${id}-label`} disabled={disabled} size={size}>{label}</Label>}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
