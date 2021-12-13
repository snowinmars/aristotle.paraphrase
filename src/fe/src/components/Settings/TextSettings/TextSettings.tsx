import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './TextSettings.module.scss';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {loadTextSettings, saveTextSettings} from "../../../utils/text-settings";

const TextSettings: FunctionComponent = () => {
  const [enableParaphrase, setEnableParaphrase] = useState(true)
  const [enableQbitSky, setEnableQbitSky] = useState(true)
  const [enableRoss, setEnableRoss] = useState(true)

  useEffect(() => {
    const initial = loadTextSettings();
    setEnableParaphrase(initial.enableParaphrase);
    setEnableQbitSky(initial.enableQbitSky);
    setEnableRoss(initial.enableRoss);
  }, [])

  useEffect(() => {
    saveTextSettings({
      enableParaphrase,
      enableQbitSky,
      enableRoss,
    });
  }, [enableParaphrase, enableQbitSky, enableRoss])

  return (
    <Container fluid className={styles.prfTextSettings}>
      <Form>
        <Form.Label>Показать</Form.Label>
        <Form.Check
          checked={enableParaphrase}
          disabled={!enableQbitSky && !enableRoss}
          type={'checkbox'}
          id={'paraphrase'}
          label={'Парафраз'}
          onChange={(e) => {
            setEnableParaphrase(!enableParaphrase)
          }}
        />
        <Form.Check
          checked={enableQbitSky}
          disabled={!enableParaphrase && !enableRoss}
          type={'checkbox'}
          id={'qBitSky'}
          label={'Кубицкий'}
          onChange={(e) => {
            setEnableQbitSky(!enableQbitSky)
          }}
        />
        <Form.Check
          checked={enableRoss}
          disabled={!enableParaphrase && !enableQbitSky}
          type={'checkbox'}
          id={'ross'}
          label={'Ross'}
          onChange={(e) => {
            setEnableRoss(!enableRoss)
          }}
        />
      </Form>
    </Container>
  );
};

export default TextSettings;
