import React, { FunctionComponent } from 'preact/compat';
import styles from './Contacts.module.scss';
import Github from '../../uikit/icons/Github';
import Telegram from '../../uikit/icons/Telegram';
import Mastodon from '../../uikit/icons/Mastodon';

type User = {
  username: string;
  email?: string | undefined;
  telegram?: string | undefined;
  github?: string | undefined;
  mastodon?: string | undefined;
}

const buildUser = ({username, email, telegram, github, mastodon}: User): JSX.Element => {
  return (
    <li>
      <h4 className={styles.prfUsername}>{username}</h4>
      <ul className={styles.prfContactsList}>
        { email && <li><a href={`mailto:${email}`}>🖂</a></li> }
        { telegram && <li><a href={`https://t.me/${telegram}`} target={'_blank'} rel={'noreferrer'}><Telegram /></a></li> }
        { github && <li><a href={`https://github.com/${github}`} target={'_blank'} rel={'noreferrer'}><Github /></a></li> }
        { mastodon && <li><a href={mastodon} target={'_blank'} rel={'noreferrer'}><Mastodon /></a></li> }
      </ul>
    </li>
  );
};

const Contacts: FunctionComponent = (): JSX.Element => {
  return (
    <ul>
      {
        buildUser({
          username: 'snowinmars',
          email: 'snowinmars@yandex.ru',
          telegram: 'snowinmars',
          github: 'snowinmars',
          mastodon: 'https://mastodon.ml/web/accounts/85928',
        })
      }
      {
        buildUser({
          username: 'Evoo',
          telegram: 'Evoo_Awoo',
          github: 'EvooChan',
        })
      }
    </ul>
  )
}

export default Contacts;
