import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './Settings.module.scss';
import { HexColorPicker } from "react-colorful";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {Color, colors, getTheme, getColorValue, setColorValue, saveColorTheme} from "./helpers";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Clipboard} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";

const Settings: FunctionComponent = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedValue, setSelectedValue] = useState(getColorValue(selectedColor.id));

  const set = (hex: string) => {
    setSelectedValue(hex);
    setColorValue(selectedColor.id, hex);
  };

  return (
    <Container fluid className={styles.prfSettings}>
      <Row>
        <Col>
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
                  saveColorTheme();
                }}
              >
                {color.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <InputGroup className={["xl-3", "md-6", styles.colorInput].join(' ')}>
            <InputGroup.Text style={{
              backgroundColor: selectedValue,
              color: selectedValue,
            }}>:)</InputGroup.Text>
            <FormControl
              value={selectedValue}
              onChange={(event) => {
                let numbers = event.target.value.trim().match(/[0-9a-fA-F]/g)?.join("")

                const color = `#${numbers}`

                set(color);
                saveColorTheme();
              }}
            />
            <Button
              variant="secondary"
              onClick={() => {
                return navigator.clipboard.writeText(selectedValue);
              }}
            >
              <Clipboard />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className={styles.fluidRow}>
        <Col xs={6}>
          <div className={styles.example}>
            <div className={styles.exampleMain}>Главный</div>
            <div className={styles.exampleMainHover}>Главный ховер</div>
            <div className={styles.exampleActive}>Активный</div>
            <div className={styles.exampleActiveHover}>Активный ховер</div>
            <div className={styles.exampleCard}>Карточка</div>
            <div className={styles.exampleLink}>Ссылка</div>
          </div>
        </Col>
        <Col xs={6}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
