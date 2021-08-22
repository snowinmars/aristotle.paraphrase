import React, { FunctionComponent } from 'react';
import './Loader.scss';

const Loader: FunctionComponent = (): JSX.Element => {
    return (<div className={'prf-loader'}>
        <div className="lds-ripple">
            <div> </div>
            <div> </div>
        </div>
    </div>);
};

export default Loader;
