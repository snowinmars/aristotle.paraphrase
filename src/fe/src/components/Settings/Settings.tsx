import React, {FunctionComponent, useEffect, useState} from 'react';
import './Settings.scss';
import { PhotoshopPicker} from "react-color";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {Color, colors, getTheme, getColorValue, setColorValue, saveColorTheme} from "./helpers";

export const Settings: FunctionComponent = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedValue, setSelectedValue] = useState(getColorValue(selectedColor.id));
  const [initedColor, setInitedColor] = useState(selectedValue);
  useEffect(() => setInitedColor(selectedValue), [selectedColor]);

  const set = (hex: string) => {
    setSelectedValue(hex);
    setColorValue(selectedColor.id, hex);
  };

  return (
    <div className={'prf-settings'}>
      <ButtonGroup className={'prf-settings-group'}>
        {colors.map((color) => (
          <ToggleButton
            key={color.id}
            id={`radio-${color.id}`}
            className={'prf-settings-item'}
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

      <PhotoshopPicker
        color={selectedValue}
        header={selectedColor.name}
        onChange={(color) => {
          set(color.hex);
          saveColorTheme();
        }}
        onCancel={() => {
          set(initedColor);
          saveColorTheme();
        }}
        onAccept={() => {
          set(selectedValue);
          setInitedColor(selectedValue);
          saveColorTheme();
        }}
      />

      <ToggleButtonGroup type="radio" name="prf-settings-picker" onChange={(themeId) => {
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
