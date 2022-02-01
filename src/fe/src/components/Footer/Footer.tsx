import React, { FunctionComponent } from 'preact/compat';
import styles from './Footer.module.scss';

const Footer: FunctionComponent = (): JSX.Element => {
    return (<div className={styles.prfFooter}>
        <a href={'https://github.com/snowinmars/aristotle.paraphrase/blob/master/LICENSE'}>GNU GPL v3.0</a>
    </div>);
};

export default Footer;
