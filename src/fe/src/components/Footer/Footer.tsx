import React, { FunctionComponent } from 'react';
import styles from './Footer.module.scss';
import Container from "react-bootstrap/Container";

const Footer: FunctionComponent = (): JSX.Element => {
    return (<Container className={styles.prfFooter}>
        <a href={'https://github.com/snowinmars/aristotle.paraphrase/blob/master/LICENSE'}>GNU GPL v3.0</a>
    </Container>);
};

export default Footer;
