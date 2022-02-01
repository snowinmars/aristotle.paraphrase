import React, {FunctionComponent, useEffect, useState} from 'preact/compat';
import styles from './Collapsable.module.scss';
import {classes} from "../_common/classes";
import {CollapsableProps} from "./Collapsable.types";

const Collapsable: FunctionComponent<CollapsableProps> = (props): JSX.Element => {
  const {
    header,
    id,
    collapseOpenIcon = '^',
    collapseCloseIcon = 'v',
    collapseIconPosition = 'right',
    children,
    className,
    onChange,
  } = props;

  useEffect(() => {
    setIsOpen(props.isOpen || false);
  }, [props.isOpen])
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const icon = <span
    className={classes(
      styles.prfIconContainer,
      className,
    )}
  >
    <span className={classes(
      styles.prfIcon,
      isOpen ? styles.prfOpenIconHidden : styles.prfOpenIconVisible
    )}
    >
      {collapseCloseIcon}
    </span>
    <span className={classes(
      styles.prfIcon,
      isOpen ? styles.prfCloseIconVisible : styles.prfCloseIconHidden
    )}
    >
      {collapseOpenIcon}
    </span>
  </span>

  return (
    <details
      key={`prf-collapsable-${id}`}
      open={isOpen}
      className={classes(
        styles.prfCollapsable,
        isOpen ? styles.prfOpenedDetails : styles.prfClosedDetails,
      )}
    >
      <summary
        className={classes(
          styles.prfSummary,
          collapseIconPosition === 'left' ? styles.prfLeftSummaryIcon : styles.prfRightSummaryIcon,
        )}
        onClick={(event) => {
          event.preventDefault(); // https://github.com/facebook/react/issues/15486
          setIsOpen(!isOpen);
          // @ts-ignore
          if (props.accordionChange) props.accordionChange(id);
          if (onChange)
            onChange(id);
        }}
      >
        {header}
        {icon}
      </summary>
      <div className={styles.prfBody}>
        {children}
      </div>
    </details>
  );
}

export default Collapsable;
