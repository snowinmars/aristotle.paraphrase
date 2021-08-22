import React, { FunctionComponent } from 'react';
import './Contacts.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Files } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';

const Contacts: FunctionComponent = () => {
  return <Container className={'prf-contacts'}>
    <ul>
      <li>
        <CopyToClipboard text={'snowinmars@yandex.ru'}>
          <Files />
        </CopyToClipboard>
        <span>Email: <a href="mailto:snowinmars@yandex.ru">snowinmars@yandex.ru</a></span>
      </li>

      <li>
        <CopyToClipboard text={'@snowinmars'}>
          <Files />
        </CopyToClipboard>
        <span>
          <a href={'https://t.me/snowinmars'} target={'_blank'} rel={'noreferrer'}>Telegram</a>:
          @snowinmars
        </span>
      </li>

      <li>
        <CopyToClipboard text={'snowinmars'}>
          <Files />
        </CopyToClipboard>
        <span>
          <a href={'https://github.com/snowinmars'} target={'_blank'} rel={'noreferrer'}>GitHub</a> :
          snowinmars
        </span>
      </li>

      <li>
        <CopyToClipboard text={'@snowinmars@mastodon.ml'}>
          <Files />
        </CopyToClipboard>
        <span>
          <a href={'https://mastodon.ml/web/accounts/85928'} target={'_blank'} rel={'noreferrer'}>Mastodon.ml</a>:
          @snowinmars
        </span>
      </li>
    </ul>
  </Container>;
};

export default Contacts;
