import styles from "./RadioButtonGroup.module.scss";
import React from "preact/compat";
import {RenderIconsParameters} from "./RadioButtonGroup.types";
import {ButtonVariant} from "../Button/Button.types";

export const renderIcons = ({
                       selectedIcon,
                       unselectedIcon,
                       isSelected,
                       key,
                     }: RenderIconsParameters): JSX.Element[] => {
  const selected = selectedIcon &&
    isSelected &&
      <span key={`${key}-selected`} className={''}>
        {selectedIcon}
      </span>

  const unselected = unselectedIcon &&
    !isSelected &&
      <span key={`${key}-unselected`} className={''}>
        {unselectedIcon}
      </span>

  // @ts-ignore
  return [
    selected, unselected,
  ].filter(x => x);
}

export const getVariantClass = (variant: ButtonVariant | string | undefined): [string] => {
  switch (variant) {
    case "success":
      return [styles.prfSuccessButton]
    case "danger":
      return [styles.prfDangerButton];
    case "warning":
      return [styles.prfWarningButton];
    case "info":
      return [styles.prfInfoButton];
    case "action":
      return [styles.prfActionButton];
    default:
      return [styles.prfDefaultButton];
  }
}
