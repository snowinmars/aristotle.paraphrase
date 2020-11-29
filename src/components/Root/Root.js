import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Root.scss';
import SiteMenu from "../Menu/Menu";
import About from "../About/About";
import Status from "../Status/Status";
import Data from "../Data/Data";
import Downloads from "../Downloads/Downloads";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";

class Root extends React.PureComponent {
    render = () => {
        return (
            <div className={'root'}>
                <Router>
                    <SiteMenu  />

                    <ScrollUpButton ContainerClassName={'scroll-up-button'}
                                    AnimationDuration={100}/>

                    <Switch>
                        <Route path={'/status'}>
                            <Status />
                        </Route>

                        <Route path={'/downloads'}>
                            <Downloads />
                        </Route>

                        <Route path={'/books/b1'}>
                            <Data book={1} />
                        </Route>

                        <Route path={'/books'}>
                            Оглавление
                            <ul>
                                <li>
                                    <Link to={'/books/b1'}>Книга первая: причины</Link>
                                </li>
                                <li>
                                    <Link to={'/books/b2'}>Книга вторая</Link>
                                </li>
                            </ul>
                        </Route>

                        <Route path={'/'}>
                            <About />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    };
}

export default Root;

