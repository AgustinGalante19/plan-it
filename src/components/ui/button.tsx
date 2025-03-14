import React, { forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const buttonVariants = cva(
  'rounded flex items-center gap-2 justify-center transition-colors hover:bg-opacity-80 disabled:bg-opacity-70',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'bg-secondary text-primary',
        rounded: 'rounded-full bg-primary text-white',
        danger: 'bg-red-600 text-white',
      },
      size: {
        small: 'text-sm px-2 py-1',
        normal: 'text-base py-1 px-3',
        large: 'text-lg px-3 py-2',
      },
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'button',
    children,
    variant = 'default',
    className,
    size = 'normal',
    isLoading = false,
    disabled,
    ...rest
  } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(buttonVariants({ className, variant, size }))}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading && <Loader2 className='animate-spin ml-2' size={16} />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
