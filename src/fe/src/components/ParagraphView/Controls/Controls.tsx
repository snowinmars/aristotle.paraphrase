import React, {FunctionComponent, useEffect, useState} from 'react';
import {ControlChange, ControlProperties} from '../types';
import styles from './Controls.module.scss';
import {ParagraphHeader} from "../../../types/types";
import {bus} from '../../../utils/bus';
import {loadTextSettings} from "../../../utils/text-settings";

type ControlArguments = {
  paragraphKey: string;
  blockType: string;
  title: string;
  paragraphHeaderId: ParagraphHeader;
  selectedId: ParagraphHeader;
  onChange: (change: ControlChange) => void;
  onChangeAll: (change: ControlChange) => void;
}

const renderControl = ({paragraphKey, blockType, title, paragraphHeaderId, selectedId, onChange, onChangeAll}: ControlArguments) => {
  const key = `${paragraphKey}-${blockType}-${paragraphHeaderId}`;
  const value: ControlChange = {
    blockType,
    paragraphHeaderId,
  };

  return (
    <li
      className={[styles.prfControlListItem].join(' ')}
      key={key}
    >
      <input
        id={key}
        name={key}
        className={styles.prfControlInput}
        checked={paragraphHeaderId === selectedId}
        type="radio"
        onChange={(e) => {
          const definition = JSON.parse(e.target.value) as ControlChange;
          onChange(definition);
        }}
        value={JSON.stringify(value)}
      />
      <label
        className={[styles.prfControlLabel, styles.threeDotsText].join(' ')}
        htmlFor={key}
        onDoubleClick={() => onChangeAll(value)}
      >
        {title}
      </label>
    </li>
  );
};

const Controls: FunctionComponent<ControlProperties> = ({ blockType, paragraphKey, selectedTextId, parentChangeCallback }) => {
  const [selectedId, setSelectedId] = useState(selectedTextId);
  useEffect(() => setSelectedId(selectedTextId), [selectedTextId]);
  const {
    enableParaphrase,
    enableQbitSky,
    enableRoss,
    enabledCount,
  } = loadTextSettings();
  const isNotes = [
    enableParaphrase && ParagraphHeader.paraphraseNotes,
    enableQbitSky && ParagraphHeader.qBitSkyNotes,
    enableRoss && ParagraphHeader.rossNotes
  ].filter(x => x).includes(selectedId);

  const onChange = (change: ControlChange) => {
    setSelectedId(change.paragraphHeaderId);
    parentChangeCallback(change);
  };
  const onChangeAll = (change: ControlChange) => {
    bus.emit('fire', change);
  };

  useEffect(() => {
    bus.subscribe('fire', (x) => {
      const change = x as ControlChange;
      if (change.blockType === blockType) onChange(change);
    });

    return () => {
      bus.unsubscribe('fire');
    };
  }, []);

  if (enabledCount === 1) {
    return <></>
  }

  return (
      <ul className={styles.prfControlList}>
        {
          enableParaphrase && renderControl({
            title: 'Парафраз',
            paragraphHeaderId: isNotes ? ParagraphHeader.paraphraseNotes : ParagraphHeader.paraphrase,
            paragraphKey: paragraphKey,
            blockType: blockType,
            selectedId: selectedId,
            onChange: onChange,
            onChangeAll: onChangeAll,
          })
        }

        {
          enableQbitSky && renderControl({
            title: 'Кубицкий',
            paragraphHeaderId: isNotes ? ParagraphHeader.qBitSkyNotes : ParagraphHeader.qBitSky,
            paragraphKey: paragraphKey,
            blockType: blockType,
            selectedId: selectedId,
            onChange: onChange,
            onChangeAll: onChangeAll,
          })
        }

        {
          enableRoss && renderControl({
            title: 'Ross',
            paragraphHeaderId: isNotes ? ParagraphHeader.rossNotes : ParagraphHeader.ross,
            paragraphKey: paragraphKey,
            blockType: blockType,
            selectedId: selectedId,
            onChange: onChange,
            onChangeAll: onChangeAll,
          })
        }
      </ul>
  );
};

export default Controls;
