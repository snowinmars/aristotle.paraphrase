import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './Settings.module.scss';
import { HexColorPicker } from "react-colorful";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {Color, colors, getTheme, getColorValue, setColorValue, saveColorTheme, exportTheme} from "./helpers";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {BoxArrowUpRight, BoxArrowDownLeft, Clipboard, Check} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import {toast} from "react-toast";

const Settings: FunctionComponent = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedValue, setSelectedValue] = useState(getColorValue(selectedColor.id));
  const [themeCopied, setThemeCopied] = useState(false)
  const [textCopied, setTextCopied] = useState(false)

  const set = (hex: string) => {
    setSelectedValue(hex);
    setColorValue(selectedColor.id, hex);
  };

  const setTheme = (themeId: string) => {
    getTheme(themeId).forEach(color => setColorValue(color.id, color.value));
    set(getTheme(themeId).filter(x => x.id === '--bs-body-bg')[0].value); // body bg selects by default
    saveColorTheme();
  }

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
            { textCopied && <Button
                className={styles.textCopied}
                variant={'secondary'}
                disabled={true}
            >
                <Check />
            </Button> }
            {
              !textCopied && <Button
                  variant="secondary"
                  onClick={() => {
                    toast.info('Скопировано в буфер обмена')
                    setTextCopied(true)
                    setTimeout(() => {
                      setTextCopied(false)
                    }, 4000)
                    return navigator.clipboard.writeText(selectedValue);
                  }}
              >
                  <Clipboard />
              </Button>
            }

          </InputGroup>
        </Col>
      </Row>

      <Row className={styles.fluidRow}>
        <Col xs={12} md={6}>
          <div className={styles.example}>
            <div className={styles.exampleMain}>Главный</div>
            <div className={styles.exampleMainHover}>Главный ховер</div>
            <div className={styles.exampleActive}>Активный</div>
            <div className={styles.exampleActiveHover}>Активный ховер</div>
            <div className={styles.exampleCard}>Карточка</div>
            <div className={styles.exampleLink}>Ссылка</div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <HexColorPicker
            color={selectedValue}
            onChange={(color) => {
              set(color);
              saveColorTheme();
            }}
          />

          <ButtonGroup>
            <Button id="tbg-check-1" onClick={() => setTheme('light')}>
              Светлая
            </Button>
            <Button id="tbg-check-2" onClick={() => setTheme('dark')}>
              Тёмная
            </Button>
            <Button id="tbg-check-3" onClick={() => setTheme('blue')}>
              Синяя
            </Button>
          </ButtonGroup>

          <div>
            { themeCopied && <Button
                className={styles.textCopied}
                variant={'secondary'}
                disabled={true}
            >
                <Check />
            </Button> }
            {
              !themeCopied && <Button
                  className={themeCopied ? styles.textCopied : ''}
                  variant={'secondary'}
                  onClick={async () => {
                    const theme = exportTheme();
                    await navigator.clipboard.writeText(theme)
                    setThemeCopied(true)
                    toast.info('Скопировано в буфер обмена')
                    setTimeout(() => {
                      setThemeCopied(false)
                    }, 3000)
                  }}
              >
                  <BoxArrowUpRight />
              </Button>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
