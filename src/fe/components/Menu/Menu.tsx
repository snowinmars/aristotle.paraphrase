import React from 'react';
import './Menu.scss';
import { Button, ButtonGroup } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {toggle_additional_text} from "../../actions";
import {connect} from "react-redux";


class SiteMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target: null,
        }
    }

    render = () => {
        return (
            <div className={'menu'}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button href={'/'} className={this.props.location.pathname === '/' && 'active'}>О проекте</Button>
                    <Button href={'/books'} className={this.props.location.pathname.startsWith('/books') && 'active'}>Метафизика</Button>
                    <Button href={'/status'} className={this.props.location.pathname.startsWith('/status') && 'active'}>Статус проекта</Button>
                    <Button href={'/downloads'} className={this.props.location.pathname.startsWith('/downloads') && 'active'}>Скачать</Button>
                </ButtonGroup>
            </div>
        );
    };
}

export default withRouter(SiteMenu);
