import {UiKitProps} from "../_common/UiKitProps";
import {ButtonVariant} from "../Button/Button.types";

export type RadioButtonProps = {
  readonly label: string | JSX.Element;
  readonly id: string;
}

export type RadioButtonGroupProps = UiKitProps & {
  readonly name: string;
  readonly buttons?: RadioButtonProps[] | undefined;
  readonly disabled?: boolean | undefined;
  readonly loading?: boolean | undefined;
  readonly variant?: ButtonVariant | undefined;
  readonly selectedId?: string | undefined;
  readonly selectedIcon?: string | JSX.Element | undefined;
  readonly unselectedIcon?: string | JSX.Element | undefined;
  readonly iconPosition?: 'left' | 'right' | undefined;
  readonly onChange?: ((id: string) => void) | undefined;
}

export type RenderIconsParameters = {
  readonly selectedIcon: string | JSX.Element | undefined;
  readonly unselectedIcon: string | JSX.Element | undefined;
  readonly isSelected: boolean;
  readonly key: string;
}
