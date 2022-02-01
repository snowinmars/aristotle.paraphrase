import Collapsable from "../Collapsable/Collapsable";
import React, {FunctionComponent, useState} from 'preact/compat';
import styles from './Accordion.module.scss';
import {AccordionProps} from "./Accordion.types";
import {classes} from "../_common/classes";

const Accordion: FunctionComponent<AccordionProps> = (props): JSX.Element => {
  const {
    children,
    className,
  } = props;

  const [selectedId, setSelectedId] = useState<string | undefined>(props.selectedId);


  return (
    <div className={classes(
      styles.prfAccordion,
      className,
    )}>
      {
        React.Children.map(children as JSX.Element[], c => {
          const isCollapsableOpen = (!selectedId && c.props.isOpen) || (selectedId && c.props.id === selectedId);

          return (
            <Collapsable
              {...c.props}
              isOpen={isCollapsableOpen}
              onChange={(id) => {
                setSelectedId(id)
                c.props.onChange && c.props.onChange(id);
              }}
            >
            </Collapsable>
          )
        })
      }
    </div>
  )
}

export default Accordion;
