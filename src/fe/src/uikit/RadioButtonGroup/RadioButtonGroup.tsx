import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import React, {FunctionComponent} from 'preact/compat';
import {RadioButtonGroupProps} from "./RadioButtonGroup.types";

const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = (props): JSX.Element => {
  return (
    <CheckboxGroup
      {...props}
      selectedIds={props.selectedId ? [props.selectedId] : undefined}
      minAllowed={1}
      maxAllowed={1}
    >
    </CheckboxGroup>
  )
}

export default RadioButtonGroup;
