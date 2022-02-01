import {ButtonVariant} from "./Button.types";
import styles from "./Button.module.scss";

export const getVariantClass = (variant: ButtonVariant | string | undefined): [string, string] => {
  switch (variant) {
    case "success":
      return [styles.prfSuccessButton, styles.prfSuccessLoader]
    case "danger":
      return [styles.prfDangerButton, styles.prfDangerLoader];
    case "warning":
      return [styles.prfWarningButton, styles.prfWarningLoader];
    case "info":
      return [styles.prfInfoButton, styles.prfInfoLoader];
    case "action":
      return [styles.prfActionButton, styles.prfActionLoader];
    default:
      return [styles.prfDefaultButton, styles.prfDefaultLoader];
  }
}
