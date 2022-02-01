import React, {FunctionComponent} from 'preact/compat';
import styles from './Button.module.scss';
import {ButtonProps} from "./Button.types";
import {classes} from "../_common/classes";
import {getVariantClass} from "./Buttons.helpers";

const Button: FunctionComponent<ButtonProps> = (props): JSX.Element => {
  const {
    label,
    click,
    variant = 'default',
    wrap = 'button',
    loading = false,
    disabled = false,
    selected = false,
    href,
    htmlFor,
    role,
    target,
    type = 'button',
    loader = '=',
    icon,
    iconPosition = 'left',
    children,
    className,
  } = props;

  const [buttonVariantClass, loaderVariantClass] = getVariantClass(variant)

  const classNames = [
    styles.prfButton,
    className,
    buttonVariantClass
  ];

  const body: JSX.Element = <>
    {
      icon && <span
          className={classes(
            styles.prfIcon,
            iconPosition === 'left' ? styles.prfLeftIcon : styles.prfRightIcon,
            !loading && styles.prfVisibleIcon,
            loading && styles.prfInvisibleIcon,
          )}
          data-visible={loading}
          aria-hidden="true"
      >
        {icon}
      </span>
    }
    <span
      className={classes(
        loaderVariantClass,
        styles.prfLoader,
      )}
      data-visible={loading}
    >
      {
        loading && <span
          className={styles.prfSpin}
          aria-hidden="true"
        >
          {loader}
        </span>
      }
    </span>
    <span
      className={classes(
        styles.prfEllipsisX,
        styles.prfLabel,
      )}
      data-disabled={loading}
    >
      {label || children}
    </span>
  </>

  switch (wrap) {
    case 'button':
      return <button
        className={classes(...classNames)}
        data-disabled={disabled || loading || false}
        data-selected={selected || false}
        tabIndex={0}
        onClick={click || undefined}
        type={type || undefined}
      >
        {body}
      </button>
    case 'link':
      return <a
        className={classes(...classNames)}
        data-disabled={disabled || loading || false}
        data-selected={selected || false}
        onClick={click || undefined}
        tabIndex={0}
        type={type || undefined}
        href={href}
        target={target}
      >
        {body}
      </a>
    case 'label':
      return <label
        className={classes(...classNames)}
        role={role}
        htmlFor={htmlFor}
        data-disabled={disabled || loading || false}
        data-selected={selected || false}
        tabIndex={0}
        onClick={click || undefined}
      >
        {body}
      </label>
    default:
      throw new Error(`Wrap is out of range: ${wrap}`);
  }
}

export default Button;
