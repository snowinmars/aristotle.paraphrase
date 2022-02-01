import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import React, {FunctionComponent, useState} from 'preact/compat';
import styles from './TabGroup.module.scss';
import {classes} from "../_common/classes";
import {TabGroupProps} from "./TabGroup.types";

const TabGroup: FunctionComponent<TabGroupProps> = (props): JSX.Element => {
  const {
    tabs,
    name,
    className,
  } = props;

  if (!tabs.length) return <div className={styles.prfTabGroup}> </div>

  const [selectedId, setSelectedId] = useState(props.selectedId || tabs[0].id);

  return (
    <div className={classes(
      styles.prfTabGroup,
      className,
    )}>
      <RadioButtonGroup
        name={name}
        selectedId={tabs[0].id}
        buttons={tabs}
        selectedIcon={undefined}
        unselectedIcon={undefined}
        onChange={id => setSelectedId(id)}
      >
      </RadioButtonGroup>
      {
        tabs.map(tab => tab.id === selectedId ? <div key={tab.id} className={styles.prfTab}>{tab.content}</div> : null)
      }
    </div>
  )
}

export default TabGroup;
