import React, { FunctionComponent } from 'react';
import styles from './Contacts.module.scss';
import Container from 'react-bootstrap/Container';
import { Github, Telegram, Mastodon, Envelope } from "react-bootstrap-icons";

type User = {
  username: string;
  email?: string | undefined;
  telegram?: string | undefined;
  github?: string | undefined;
  mastodon?: string | undefined;
}

const User = ({username, email, telegram, github, mastodon}: User): JSX.Element => {
  return (
      <li>
        <h4 className={styles.prfUsername}>{username}</h4>
        <ul className={styles.prfContactsList}>
          { email && <li><a href={`mailto:${email}`}><Envelope /></a></li> }
          { telegram && <li><a href={`https://t.me/${telegram}`} target={'_blank'} rel={'noreferrer'}><Telegram /></a></li> }
          { github && <li><a href={`https://github.com/${github}`} target={'_blank'} rel={'noreferrer'}><Github /></a></li> }
          { mastodon && <li><a href={mastodon} target={'_blank'} rel={'noreferrer'}><Mastodon /></a></li> }
        </ul>
      </li>
  );
};

const Contacts: FunctionComponent = (): JSX.Element => {
    return <Container className={styles.prfContacts}>
        <ul>
            {
                User({
                    username: 'snowinmars',
                    email: 'snowinmars@yandex.ru',
                    telegram: 'snowinmars',
                    github: 'snowinmars',
                    mastodon: 'https://mastodon.ml/web/accounts/85928',
                })
            }
            {
                User({
                    username: 'Evoo',
                    telegram: 'Evoo_Awoo',
                    github: 'EvooChan',
                })
            }
        </ul>
    </Container>;
};

export default Contacts;
