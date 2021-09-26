import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './Settings.module.scss';
import { HexColorPicker } from "react-colorful";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {Color, colors, getTheme, getColorValue, setColorValue, saveColorTheme} from "./helpers";

const Settings: FunctionComponent = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedValue, setSelectedValue] = useState(getColorValue(selectedColor.id));
  const [initedColor, setInitedColor] = useState(selectedValue);
  useEffect(() => setInitedColor(selectedValue), [selectedColor]);

  const set = (hex: string) => {
    setSelectedValue(hex);
    setColorValue(selectedColor.id, hex);
  };

  return (
    <div className={styles.prfSettings}>
      <ButtonGroup className={styles.prfSettingsGroup}>
        {colors.map((color) => (
          <ToggleButton
            key={color.id}
            id={`radio-${color.id}`}
            className={styles.prfSettingsItem}
            type="radio"
            variant="secondary"
            name="radio"
            value={JSON.stringify(color)}
            checked={selectedColor.id === color.id}
            onChange={(e) => {
              const color: Color = JSON.parse(e.currentTarget.value);
              const value = getColorValue(color.id);

              setSelectedColor(color);
              setSelectedValue(value);
              setInitedColor(value);
              saveColorTheme();
            }}
          >
            {color.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <HexColorPicker
        color={selectedValue}
        onChange={(color) => {
          set(color);
          saveColorTheme();
        }}
      />

      <ToggleButtonGroup type="radio" name={styles.prfSettingsPicker} onChange={(themeId) => {
        getTheme(themeId).forEach(color => setColorValue(color.id, color.value));
        saveColorTheme();
      }}>
        <ToggleButton id="tbg-check-1" value={'light'}>
          Светлая
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value={'dark'}>
          Тёмная
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default Settings;
