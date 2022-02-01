import RadioButtonGroup from "../../uikit/RadioButtonGroup/RadioButtonGroup";
import React, { FunctionComponent } from 'preact/compat';
import styles from './Menu.module.scss';
import Button from "../../uikit/Button/Button";
import {classes} from "../../uikit/_common/classes";
import { route } from 'preact-router';

const getActiveKey = (pathname: string): string => {
  // '/' to '/'
  // '/other/another' to 'other'

  if (pathname === '/') return pathname;

  return `${pathname.split('/')[1]}`;
};

const Menu: FunctionComponent = (props): JSX.Element => {
  const activeKey = getActiveKey(location.pathname);

  return (
    <div className={styles.prfMenu}>
      <Button
        className={styles.prfLogo}
        label={'prf - β'}
        click={() => route('/')}
      >
      </Button>

      <RadioButtonGroup
        name={'prf-menu'}
        selectedId={activeKey}
        onChange={id => {
          console.log(id)
          route(id);
        }}
        buttons={[
          {
            id: '/',
            label: <span
              className={classes(
                styles.prfMenuItem,
                styles.prfQuestionMark,
              )}>?</span>
          }, {
            id: '/contacts',
            label: <span
              className={classes(
                styles.prfMenuItem,
                styles.prfQuestionMark,
              )}>@</span>
          }, {
            id: '/settings',
            label: <span
              className={classes(
                styles.prfMenuItem,
                styles.prfQuestionMark,
              )}>⛭</span>
          },
        ]}
      >

      </RadioButtonGroup>
    </div>
  )
}

export default Menu;
