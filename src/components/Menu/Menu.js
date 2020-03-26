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
        const handleClick = event => {
            this.setState({target: event.currentTarget});
        };

        const handleClose = () => {
        };

        const handleHideAdditionalText = () => {
            this.setState({target: null}, () => this.props.foo({isAdditionalTextVisible: true}));

        };

        const handleShowAdditionalText = () => {
            this.setState({target: null}, () => this.props.foo({isAdditionalTextVisible: false}));
        };

        return (
            <div className={'menu'}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button href={'/'} className={this.props.location.pathname === '/' && 'active'}>О проекте</Button>
                    <Button href={'/books'} className={this.props.location.pathname.startsWith('/books') && 'active'}>Метафизика</Button>
                    <Button href={'/status'} className={this.props.location.pathname.startsWith('/status') && 'active'}>Статус проекта</Button>
                    <Button aria-controls="settings" aria-haspopup="true" onClick={handleClick}>
                        <i className="material-icons">settings</i>
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.target}
                        keepMounted
                        open={Boolean(this.state.target)}
                        onClose={handleClose}
                        onBlur={() => this.setState({target: null})}
                    >
                        {this.props.isAdditionalTextVisible && <MenuItem onClick={handleShowAdditionalText}>Оставить только парафраз</MenuItem>}
                        {!this.props.isAdditionalTextVisible && <MenuItem onClick={handleHideAdditionalText}>Показать весь текст</MenuItem>}
                    </Menu>
                </ButtonGroup>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAdditionalTextVisible: state.isAdditionalTextVisible,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        foo: (settings) => {
            dispatch(toggle_additional_text(settings))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiteMenu));
