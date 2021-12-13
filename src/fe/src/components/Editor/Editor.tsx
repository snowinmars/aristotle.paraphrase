import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './Editor.module.scss';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import {X, ArrowBarUp, PencilSquare} from "react-bootstrap-icons";
import {usePushParagraphMutation} from "../accessor";
import {EditorParameters} from "../../types/types";
import Loader from "../Loader/Loader";

enum Status {
    editing = 'editing',
    loading = 'loading',
    ready = 'ready',
}

const validate = (text: string): boolean => {
    return text.search(/script/) === -1;
};

const Editor: FunctionComponent<EditorParameters> = (parameters: EditorParameters): JSX.Element => {
    const {text} = parameters;
    const feText = text.replaceAll(/<sup>(\d+)<\/sup>/g, (_, key) => {
        return `<sup className={styles.prfNotesLink}>${key}</sup>`;
    });

    const [staticText, setStaticText] = useState(feText);
    const [dynamicText, setDynamicText] = useState(text);
    useEffect(() => setStaticText(feText), [feText]);
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
                        .then(() => {
                            setStatus(Status.ready);
                            setStaticText(dynamicText);
                        })
                        .catch(() => {
                            setValidationText('Ошибка: изменения не были сохранены.');
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
                                const n = event.target.value;
                                setDynamicText(n);
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
                                <Loader />
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
                                disabled={status === Status.loading}
                                type={'submit'}><ArrowBarUp/>
                            </Button>
                        </ButtonGroup>
                    </Form.Group>
                </Form>
            );
        case Status.ready:
            return (
                <span className={styles.prfEditor}>
            <PencilSquare
                className={styles.prfEditorPencil}
                onClick={() => setStatus(Status.editing)}
            />
            <span dangerouslySetInnerHTML={{__html: staticText}}/>
        </span>
            );
        default:
            throw new Error(`Enum Status is out of range: ${status}`);
    }
};

export default Editor;
