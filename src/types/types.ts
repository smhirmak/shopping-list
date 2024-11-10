import { buttonVariants } from '@/components/Button';
import { VariantProps } from 'class-variance-authority';

export interface IButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'tetriary';
  disabled?: boolean;
  disableEffect?: boolean;
  effectColor?: string;
  effectOpacity?: string;
  loading?: boolean;
  loadingSpinnerClassname?: string;
  loadingText?: string;
  rounded?: 'default' | 'lg';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'solid' | 'outlined' | 'ghost';
}
