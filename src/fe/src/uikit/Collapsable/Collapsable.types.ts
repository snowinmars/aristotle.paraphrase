import {UiKitProps} from "../_common/UiKitProps";

export type CollapsableProps = UiKitProps & {
  readonly header: string | JSX.Element;
  readonly id: string;
  readonly collapseOpenIcon?: string | JSX.Element;
  readonly collapseCloseIcon?: string | JSX.Element;
  readonly collapseIconPosition?: 'left' | 'right';
  readonly isOpen?: boolean;
  readonly onChange?: ((x: string) => void) | undefined
}
