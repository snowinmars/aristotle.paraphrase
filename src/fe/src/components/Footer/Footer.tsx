import React, { FunctionComponent } from 'react';
import './Footer.scss';
import Container from "react-bootstrap/Container";

const Footer: FunctionComponent = (): JSX.Element => {
    return (<Container className={'prf-footer'}>
        <a href={'https://github.com/snowinmars/aristotle.paraphrase/blob/master/LICENSE'}>GNU GPL v3.0</a>
    </Container>);
};

export default Footer;
