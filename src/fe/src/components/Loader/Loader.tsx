import React, { FunctionComponent } from 'preact/compat';
import styles from './Loader.module.scss';

const Loader: FunctionComponent = (): JSX.Element => {
    return (<div className={styles.prfLoader}>
        <div className={styles.ripple}>
            <div> </div>
            <div> </div>
        </div>
    </div>);
};

export default Loader;
