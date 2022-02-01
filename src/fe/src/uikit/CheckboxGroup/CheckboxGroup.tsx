import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import React, {FunctionComponent, useEffect, useState} from 'preact/compat';
import styles from './CheckboxGroup.module.scss';
import {CheckboxGroupProps} from "./CheckboxGroup.types";
import {classes} from "../_common/classes";
import {hash} from "../../utils/hash";
import {renderIcons} from "./CheckboxGroup.helpers";

const CheckboxGroup: FunctionComponent<CheckboxGroupProps> = (props): JSX.Element => {
  const {
    buttons,
    disabled,
    minAllowed,
    maxAllowed,
    onChange,
    name,
    className,
    variant,
    selectedIcon,
    unselectedIcon,
    iconPosition,
  } = props;

  if (!buttons) return <div> </div>

  useEffect(() => {
    setSelectedIds(props.selectedIds?.map(id => `${name}-${id}`) || []);
  }, [props.selectedIds])
  const [selectedIds, setSelectedIds] = useState<string[]>([...props.selectedIds?.map(id => `${name}-${id}`) || []]);

  return (
    <ButtonGroup className={className}>
      {
        buttons.map(({label, id}) => {
          const inputId = `${name}-${id}`;
          const isSelected = !!selectedIds.filter(x => x === inputId).length
          const icons = renderIcons({
            selectedIcon,
            unselectedIcon,
            isSelected,
            key: inputId,
          });

          return (
            <React.Fragment key={inputId}>
              <input
                key={`${inputId}-input`}
                className={styles.prfCheckboxInput}
                tabIndex={0}
                id={inputId}
                name={name}
                value={inputId}
                type={"checkbox"}
                disabled={disabled}
                checked={isSelected}
                onChange={() => {
                  if (isSelected) {
                    if (minAllowed === selectedIds.length) return;
                    const items = maxAllowed ? selectedIds.slice(0, maxAllowed - 1) : selectedIds;
                    setSelectedIds([...items.filter(x => x !== inputId)]);
                  } else {
                    const items = (maxAllowed && selectedIds.length > maxAllowed - 1) ? selectedIds.slice(1) : selectedIds;
                    setSelectedIds([...items, inputId]);
                  }

                  if (onChange)
                    onChange(id);
                }}
              />
              <Button
                key={`${inputId}-label`}
                role={'button'}
                htmlFor={inputId}
                wrap={'label'}
                selected={isSelected}
                disabled={disabled}
                icon={(isSelected ? icons[0] : icons[1]) || undefined}
                iconPosition={iconPosition}
                label={label}
                variant={variant}
                className={classes(
                  styles.prfCheckboxLabel,
                )}
              >
              </Button>
            </React.Fragment>
          )
        })
      }
    </ButtonGroup>
  )
}

export default CheckboxGroup;
