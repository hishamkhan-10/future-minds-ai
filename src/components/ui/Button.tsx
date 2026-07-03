import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  isLoading = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const loadingClass = isLoading ? 'loading' : '';
  const fullClass = `btn ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={fullClass}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span className="btn-text">{children}</span>
        <span className="btn-loader" />
      </a>
    );
  }

  return (
    <button className={fullClass} disabled={disabled || isLoading} onClick={onClick} {...props}>
      <span className="btn-text">{children}</span>
      <span className="btn-loader" />
    </button>
  );
};

export default Button;
