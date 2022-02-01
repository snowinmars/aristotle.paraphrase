import {UiKitProps} from "../_common/UiKitProps";

export type TabGroupProps = UiKitProps & {
  readonly name: string;
  readonly selectedId?: string | undefined;
  readonly tabs: {
    readonly id: string;
    readonly label: string;
    readonly content: JSX.Element;
  }[]
}
