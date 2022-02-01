import React, {FunctionComponent} from 'preact/compat';
import styles from './ButtonGroup.module.scss';
import {ButtonGroupProps} from "./ButtonGroup.types";
import {classes} from "../_common/classes";

const ButtonGroup: FunctionComponent<ButtonGroupProps> = (props): JSX.Element => {
  const {
    className,
    children,
  } = props;

  return (
    <div className={classes(
      styles.prfButtonGroup,
      className,
    )}>
      {children}
    </div>
  )
}

export default ButtonGroup;
