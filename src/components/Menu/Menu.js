import React from 'react';
import {
    Link
} from "react-router-dom";
import './Menu.scss';
import { withRouter } from 'react-router-dom'

class Root extends React.Component {
    render = () => {
        return (
            <div className={'menu'}>
                <ul className={'btn-group'}>
                    <Link to={'/'} className={`btn btn-secondary btn-sm ${this.props.location.pathname === '/' && 'active'}`}>
                        <li>О проекте</li>
                    </Link>
                    <Link to={'/books'} className={`btn btn-secondary btn-sm ${this.props.location.pathname === '/books' && 'active'}`}>
                        <li>Метафизика</li>
                    </Link>
                </ul>
            </div>
        );
    };
}

export default withRouter(Root);
