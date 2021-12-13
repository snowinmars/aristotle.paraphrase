import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './Editor.module.scss';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import {X, ArrowBarUp, PencilSquare, Bug} from "react-bootstrap-icons";
import {usePushParagraphMutation} from "../accessor";
import {EditorParameters} from "../../types/types";
import Loader from "../Loader/Loader";
import { toast } from 'react-toast'
import Alert from "react-bootstrap/Alert";

enum Status {
    editing = 'editing',
    loading = 'loading',
    ready = 'ready',
}

const validate = (text: string): boolean => {
    return text.search(/script/) === -1;
};

const fixSupStyles = (text: string): string => {
  return text.replaceAll(/<sup>(\d+)<\/sup>/g, (_, key) => {
    return `<sup class='prf-notes-link'>${key}</sup>`;
  });
}

const Editor: FunctionComponent<EditorParameters> = (parameters: EditorParameters): JSX.Element => {
  const {text} = parameters;

  const [staticText, setStaticText] = useState(text);
  const [dynamicText, setDynamicText] = useState(text);
  useEffect(() => setStaticText(text), [text]);
  useEffect(() => setDynamicText(text), [text]);

  const [validationText, setValidationText] = useState<string>('');
  const [status, setStatus] = useState(Status.ready);
  const [
    pushParagraph
  ] = usePushParagraphMutation();

  switch (status) {
    case Status.loading:
    case Status.editing:
      return (
        <Form className={styles.prfEditor} onSubmit={(e) => {
          e.preventDefault();

          setValidationText('');
          setStatus(Status.loading);

          if (!validate(dynamicText)) {
            setStatus(Status.editing);
            setValidationText('Nope');
            return;
          }

          pushParagraph({
            ...parameters,
            text: dynamicText,
          })
            .then((x) => {
              // @ts-ignore todo [snow]: that is wrong with typings?
              if (x.error) throw x.error;

              // @ts-ignore
              toast.success(`Изменения сохранены: ${x.data.commitHash}`)
              setStatus(Status.ready);
              setStaticText(dynamicText);
            })
            .catch((x) => {
              toast.error(`${x.originalStatus}: ${x.status}`)
              setValidationText(`${x.originalStatus}: ${x.status}`);
              setStatus(Status.ready);
            });
        }}>
          <Form.Group className={styles.prfLoaderWrapper}>
            <Form.Control
              className={styles.prfEditor}
              as="textarea"
              rows={10}
              value={dynamicText}
              disabled={status === Status.loading}
              onChange={(event) => {
                setDynamicText(event.target.value);
              }}
            />

            {
              validationText &&
              <div className={styles.prfEditorValidationText}>
                {validationText}
              </div>
            }

            {
              status === Status.loading &&
              <Loader/>
            }

            <ButtonGroup className={styles.prfEditorControlGroup} aria-label="Editor control group">
              <Button
                variant="danger"
                disabled={status === Status.loading}
                onClick={() => {
                  setStatus(Status.ready);
                  setValidationText('');
                  setDynamicText(staticText);
                }}><X/>
              </Button>
              <Button
                variant="success"
                disabled={status === Status.loading || dynamicText === staticText}
                type={'submit'}><ArrowBarUp/>
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Form>
      );
    case Status.ready:
      return (
        <span className={styles.prfEditor}>
                  {
                    validationText &&
                    <div className={styles.prfEditorValidationText}>
                      <Alert variant={'danger'}>
                        Изменения не были сохранены сервером. Скопируйте ваши изменения себе, иначе они будут утеряны
                      </Alert>
                      <div>
                          <Bug> </Bug> {validationText}
                      </div>
                    </div>
                  }
          <PencilSquare
            className={styles.prfEditorPencil}
            onClick={() => setStatus(Status.editing)}
          />
            <span dangerouslySetInnerHTML={{__html: fixSupStyles(staticText)}}/>
        </span>
      );
    default:
      throw new Error(`Enum Status is out of range: ${status}`);
  }
};

export default Editor;
