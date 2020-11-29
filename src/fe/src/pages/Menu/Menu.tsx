import React from 'react';
import {useLocation} from 'react-router-dom';
import {Button, ButtonGroup} from '@material-ui/core';
import './Menu.scoped.scss';
import './Colors.scoped.scss';

function Menu(): JSX.Element {
  const location = useLocation();

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
      </ButtonGroup>
    </div>
  );
}

export default Menu;
