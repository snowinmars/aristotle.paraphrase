import Accordion from "../../uikit/Accordion/Accordion";
import Button from "../../uikit/Button/Button";
import Collapsable from "../../uikit/Collapsable/Collapsable";
import RadioButtonGroup from "../../uikit/RadioButtonGroup/RadioButtonGroup";
import React, {FunctionComponent, useState} from 'preact/compat';
import TabGroup from "../../uikit/TabGroup/TabGroup";
import {ButtonVariant} from "../../uikit/Button/Button.types";
import {hash} from "../../utils/hash";

// @ts-ignore
const variants: ButtonVariant[] = [ 'default', 'success' , 'danger' , 'warning' , 'info' , 'action' ];
const bools: boolean[] = [true, false];
// @ts-ignore
const iconPositions: ('left' | 'right')[] = ['default', 'left', 'right'];
const icons = [undefined, '-', <div>div</div>]
// @ts-ignore
const cartesian = (arr) => arr.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));

const UiKitDebug: FunctionComponent = () => {
  const [load, setLoad] = useState(false);
  let click = () => {
    setLoad(true);
    setTimeout(() => setLoad(false), 2000)
  };

  const buttons = cartesian([
    variants,
    bools,
    bools,
    bools,
  ]).map(([
            variant,
            selected,
            disabled,
            loading,
          ]: [
    ButtonVariant,
    boolean,
    boolean,
    boolean,
      'left' | 'right',
      string | undefined | JSX.Element,
  ]) => {
    let label = variant;

    if (selected) label += ' selected'
    if (disabled) label += ' disabled'
    if (loading) label += ' loading'
    const shouldClick = Math.floor(Math.random() + 0.5) === 0;
    let couldClick: (() => void) | undefined = click;
    if (shouldClick) {
      label += ' click'
    } else {
      couldClick = undefined;
    }
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const iconPosition = iconPositions[Math.floor(Math.random() * iconPositions.length)];

    return (
      <Button
        key={hash()}
        variant={variant}
        label={label}
        selected={selected}
        disabled={disabled}
        loading={load || loading}
        iconPosition={iconPosition}
        icon={icon}
        click={couldClick}
      >
      </Button>
    )
  })

  const accordion = <Accordion
    selectedId={'open'}
  >
    <Collapsable
      key={'top'}
      header={'Top'}
      id={'top'}
    >
      Top
    </Collapsable>
    <Collapsable
      key={'open'}
      header={'Open'}
      id={'open'}
    >
      Open
    </Collapsable>
    <Collapsable
      key={'middle'}
      header={'Middle'}
      id={'middle'}
    >
      Middle
    </Collapsable>
    <Collapsable
      key={'bottom'}
      header={'Bottom'}
      id={'bottom'}
    >
      Bottom
    </Collapsable>
  </Accordion>

  const inputs = cartesian([
    variants,
    bools,
    bools,
  ]).map(([
            variant,
            disabled,
            loading,
          ]: [
    ButtonVariant,
    boolean,
    boolean,
      'left' | 'right',
      string | undefined | JSX.Element,
  ]) => {
    let label = variant;

    if (disabled) label += ' disabled'
    if (loading) label += ' loading'
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const iconPosition = iconPositions[Math.floor(Math.random() * iconPositions.length)];

    return (
      <RadioButtonGroup
        key={hash()}
        name={label}
        variant={variant}
        selectedIcon={icon}
        unselectedIcon={icon}
        disabled={disabled}
        loading={loading}
        iconPosition={iconPosition}
        buttons={[...Array(5).keys()].map((i) => ({ id: `${label} ${i}`, label: `${label} ${i}` }))}
      >
      </RadioButtonGroup>
    )
  })

  return (
    <TabGroup
      name={'tabs'}
      tabs={[{
        label: 'Buttons',
        id: 'buttons',
        content: <div>
          {buttons}
        </div>,
      }, {
        label: 'Accordion',
        id: 'accordion',
        content: accordion
      }, {
        label: 'Inputs',
        id: 'inputs',
        content: inputs
      }]}>
    </TabGroup>
  )
}

export default UiKitDebug;
