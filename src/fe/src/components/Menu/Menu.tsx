import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button, ButtonGroup} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import './Menu.scoped.scss';
import './Colors.scoped.scss';
import ColorSettings from '../ColorSettings/ColorSettings';

function Menu(): JSX.Element {
  const location = useLocation();
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchor);
  const id = open ? 'simple-popover' : undefined;

  const buildButton = (href: string, title: string) => {
    return <Button href={href}
      className={location.pathname === href ? 'active' : ''}>{title}</Button>;
  };

  return (
    <div className={'menu'}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {buildButton('/', 'О проекте')}
        {buildButton('/books', 'Книги')}
        {buildButton('/status', 'Статус')}
        {buildButton('/downloads', 'Скачать')}
        <Button
          size="small"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}
        >
          <SettingsIcon />
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ColorSettings />
        </Popover>
      </ButtonGroup>
    </div>
  );
}

export default Menu;
