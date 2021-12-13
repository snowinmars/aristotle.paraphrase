import React, {FunctionComponent, useEffect, useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styles from './Settings.module.scss';
import TextSettings from "./TextSettings/TextSettings";
import ColorSettings from "./ColorSettings/ColorSettings";

const Settings: FunctionComponent = () => {
  return (
    <div className={styles.prfSettings}>
      <Tabs defaultActiveKey="text">
        <Tab className={styles.prfSettingsTab} eventKey="text" title="Текст">
          <TextSettings/>
        </Tab>
        <Tab className={styles.prfSettingsTab} eventKey="color" title="Цвет">
          <ColorSettings/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settings;
