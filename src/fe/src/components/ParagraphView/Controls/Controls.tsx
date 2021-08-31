import React, {FunctionComponent, useEffect, useState} from 'react';
import {ControlChange, ControlProperties} from '../types';
import './Controls.scss';
import {ParagraphHeader} from "../../../types/types";
import {bus} from '../../../utils/bus';

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
      className={['prf-control-list-item'].join(' ')}
      key={key}
    >
      <input
        id={key}
        name={key}
        className="prf-control-input"
        checked={paragraphHeaderId === selectedId}
        type="radio"
        onChange={(e) => {
          const definition = JSON.parse(e.target.value) as ControlChange;
          onChange(definition);
        }}
        value={JSON.stringify(value)}
      />
      <label
        className="prf-control-label three-dots-text"
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
  const isNotes = [ ParagraphHeader.paraphraseNotes, ParagraphHeader.qBitSkyNotes, ParagraphHeader.rossNotes ].includes(selectedId);

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

  return (
      <ul className="prf-control-list">
        {
          renderControl({
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
          renderControl({
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
          renderControl({
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
