import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    const variants = {
      primary:
        'bg-sierra-forest text-sierra-snow hover:bg-sierra-deep shadow-soft disabled:opacity-50',
      ghost: 'text-sierra-forest hover:bg-sierra-latte/70',
      outline:
        'border border-sierra-moss/35 text-sierra-forest hover:border-sierra-moss/55 hover:bg-sierra-snow/80',
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sierra-forest ${variants[variant]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
