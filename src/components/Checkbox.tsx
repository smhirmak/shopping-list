/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Check, Minus } from '@phosphor-icons/react';
import Label from '@/components/Label';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  `border-primary data-[checked=true]:bg-primary data-[checked=true]:text-primary-foreground peer flex shrink-0 select-none items-center justify-center rounded-sm
  border ring-offset-background focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-input data-[disabled=true]:bg-input 
  data-[disabled=true]:text-white data-[disabled=true]:opacity-50 data-[checked=true]:disabled:bg-input`,
  {
    variants: {
      variant: {
        rectangular: 'rounded-sm',
        circular: 'rounded-full',
      },
      size: {
        sm: 'size-3',
        default: 'size-4',
        lg: 'size-5',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'rectangular',
    },
  },
);

interface ICheckbox {
  className?: string;
  disabled?: boolean;
  id?: string
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'rectangular' | 'circular';
  checked?: boolean;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  ICheckbox
>(({
  className,
  disabled,
  id,
  checked = false,
  label,
  size,
  variant,
  ...props
}, ref) => {
  const [checkedValue, setCheckedValue] = React.useState<boolean | undefined>(checked);
  return (
    <div className="flex items-center gap-2">
      <div>
        <label
          className={cn(checkboxVariants({ variant, size }), className)}
          htmlFor={id}
          data-disabled={disabled}
          data-checked={checkedValue}
        >
          {(disabled && !checkedValue)
            ? <Minus className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-input`} />
            : (disabled && checkedValue)
              ? (
                <Check className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-input`} />
              )
              : (
                <>
                  {checkedValue && (
                    <span
                      className={cn('flex items-center justify-center text-current')}
                    >
                      <Check className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-primary rounded-sm`} />
                    </span>
                  )}
                </>
              )}
        </label>
        <input
          ref={ref}
          type="checkbox"
          checked={checkedValue}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (!disabled) setCheckedValue(e.target.checked); }}
          id={id}
          className="peer hidden"
          {...props}
        />
      </div>
      {label && <Label className="select-none" htmlFor={id} id={`${id}-label`} disabled={disabled} size={size}>{label}</Label>}
    </div>
  );
});

export default Checkbox;
