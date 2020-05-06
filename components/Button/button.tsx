import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classnames from 'classnames';

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  children: ReactNode
  disabled?: boolean;
  href?: string;
  size?: ButtonSize;
  type?: ButtonType;
  icon?: React.ReactNode;
  loading?: boolean | { delay?: number };
}

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    disabled,
    loading,
    href,
    size,
    type,
    ...restProps
  } = props;
  const classes = classnames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'disabled': (type === 'link') && disabled,
    'loading': !disabled && loading,
  })
  if (type === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>)
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>)
  }
}

Button.defaultProps = {
  type: 'default',
  disabled: false,
  loading: false,
}


export default Button