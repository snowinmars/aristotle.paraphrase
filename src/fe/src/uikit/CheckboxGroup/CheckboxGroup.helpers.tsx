import {RenderIconsParameters} from "./CheckboxGroup.types";
import styles from "./CheckboxGroup.module.scss";
import React from "preact/compat";
import {ButtonVariant} from "../Button/Button.types";

export const renderIcons = ({
                       selectedIcon,
                       unselectedIcon,
                       key,
                     }: RenderIconsParameters): [JSX.Element, JSX.Element] | [null, null] => {
  if (!selectedIcon && !unselectedIcon) {
    return [null, null];
  }

  return [
    <span className={styles.prfCheckboxMark} key={`${key}-selected`}>
  {selectedIcon}
  </span>,
  <span className={styles.prfCheckboxMark} key={`${key}-unselected`}>
  {unselectedIcon}
  </span>
];
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
