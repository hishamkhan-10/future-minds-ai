import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  isLoading = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const loadingClass = isLoading ? 'loading' : '';
  const fullClass = `btn btn-${variant} ${loadingClass} ${className}`.trim();

  return (
    <button className={fullClass} disabled={disabled || isLoading} onClick={onClick} {...props}>
      <span className="btn-text">{children}</span>
      <span className="btn-loader" />
    </button>
  );
};

export default Button;
