import {UiKitProps} from "../_common/UiKitProps";

export type ButtonVariant = 'success' | 'danger' | 'warning' | 'info' | 'action';

export type ButtonProps = UiKitProps & {
  readonly wrap?: 'button' | 'link' | 'label' | undefined;
  readonly role?: string | undefined;
  readonly htmlFor?: string | undefined;
  readonly label?: JSX.Element | string | undefined;
  readonly click?: (() => void) | undefined;
  readonly variant?: ButtonVariant | undefined;
  readonly loading?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly selected?: boolean | undefined;
  readonly href?: string | undefined;
  readonly target?: '_blank' | '_self' | '_parent' | '_top' | undefined;
  readonly type?: 'button' | 'reset' | 'submit' | undefined;
  readonly loader?: JSX.Element | string | undefined
  readonly icon?: JSX.Element | string | undefined;
  readonly iconPosition?: 'left' | 'right' | undefined;
}
