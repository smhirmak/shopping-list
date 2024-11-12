import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { useRef, useState } from 'react';
import Input from './Input';
import Label from './Label';

interface ITextField {
  alwaysTop?: boolean;
  borderRadius?: 'default' | 'lg';
  className?: string;
  defaultValue?: string | number | undefined;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: boolean;
  id?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showRequiredIcon?: boolean;
  size?: 'default' | 'sm' | 'lg';
  startIcon?: React.ReactNode;
  step?: number;
  tooltip?: string | string[];
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string | number | undefined;
  variant?: 'filled' | 'outlined' | 'underlined';
}

const textFieldStyles = cva('flex flex-col', {
  variants: {
    variant: {
      filled: 'relative',
      outlined: 'relative',
      underlined: 'relative',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const labelStyles = cva('mb-1 transition-all duration-150 ease-cubic', {
  variants: {
    variant: {
      filled: '',
      outlined: 'absolute left-3 top-1/2 -translate-y-1/2 transform',
      underlined: 'absolute left-0 top-1/2 -translate-y-1/2 transform',
    },
    borderRadius: {
      default: '',
      lg: 'left-4',
    },
  },
  defaultVariants: {
    variant: 'filled',
    borderRadius: 'default',
  },
});

const inputStyles = cva('p-2 transition-colors', {
  variants: {
    variant: {
      filled: '',
      outlined: '',
      underlined: 'rounded-none border-x-0 border-t-0 bg-transparent hover:bg-transparent hover:shadow-none focus-visible:shadow-none disabled:bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const TextField = React.forwardRef<HTMLInputElement, ITextField>(({
  alwaysTop,
  borderRadius,
  className,
  defaultValue,
  disabled = false,
  endIcon,
  error,
  id,
  inputClassName,
  label,
  labelClassName,
  min,
  max,
  onChange,
  onWheel,
  placeholder,
  showRequiredIcon,
  size = 'default',
  startIcon,
  step,
  tooltip,
  type,
  value,
  variant = 'filled',
  ...otherProps
}, ref) => {
  const { t } = useLocalizeContext();
  const [inputFocused, setInputFocused] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div ref={ref} className={cn(textFieldStyles({ variant }), className)}>
      <Label
        ref={labelRef}
        className={` 
          ${cn(labelStyles({ variant, borderRadius }))}
          ${(inputFocused || !!value) ? '-top-[2px] bg-transparent' : ''}
          ${labelClassName}`}
        variant={variant}
        outlineFocused={inputFocused || !!value}
        htmlFor={id}
        id={`${id}-label`}
        size={size}
        tooltip={tooltip}
        startIcon={startIcon}
        alwaysTop={alwaysTop}
        disabled={disabled}
        borderRadius={borderRadius}
        showRequiredIcon={showRequiredIcon}
      >
        {t(label)}
      </Label>
      <Input
        id={id}
        className={`${cn(inputStyles({ variant }))} ${inputClassName}`}
        size={size}
        error={error}
        value={value}
        min={min}
        defaultValue={defaultValue}
        readOnly={disabled}
        max={max}
        step={step}
        onWheel={onWheel}
        onChange={onChange}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        disabled={disabled}
        type={type}
        placeholder={variant !== 'outlined' ? t(placeholder) : ''}
        endIcon={endIcon}
        startIcon={startIcon}
        borderRadius={borderRadius}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    </div>
  );
});

export default TextField;
