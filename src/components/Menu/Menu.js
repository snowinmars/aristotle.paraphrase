import React from 'react';
import './Menu.scss';
import { Button, ButtonGroup } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

class Root extends React.Component {
    render = () => {
        return (
            <div className={'menu'}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button href={'/'} className={this.props.location.pathname === '/' && 'active'}>О проекте</Button>
                    <Button href={'/books'} className={this.props.location.pathname.startsWith('/books') && 'active'}>Метафизика</Button>
                    <Button href={'/status'} className={this.props.location.pathname.startsWith('/status') && 'active'}>Статус проекта</Button>
                </ButtonGroup>
            </div>
        );
    };
}

export default withRouter(Root);
