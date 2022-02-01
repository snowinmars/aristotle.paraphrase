import {UiKitProps} from "../_common/UiKitProps";
import {ButtonVariant} from "../Button/Button.types";

export type CheckboxProps = {
  readonly label: string | JSX.Element;
  readonly id: string;
}

export type CheckboxGroupProps = UiKitProps & {
  readonly name: string;
  readonly minAllowed?: number | undefined;
  readonly maxAllowed?: number | undefined;
  readonly buttons?: CheckboxProps[] | undefined;
  readonly disabled?: boolean | undefined;
  readonly variant?: ButtonVariant | undefined;
  readonly selectedIds?: string[] | undefined;
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
