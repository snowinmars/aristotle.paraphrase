import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ColorPicker, {useColorObject} from 'react-color-palette';
import RefreshIcon from '@material-ui/icons/Refresh';
import {toColorObject} from 'react-color-palette/lib/utils';
import Store from './Store';
import colors from '../../configs/color';
import './ColorSettings.scoped.scss';
import './Colors.scoped.scss';

function ColorSettings(): JSX.Element {
  const [selectedOption, setSelectedOption] = React.useState('bgMaster');
  const [color, setColor] = useColorObject('hex', Store.getCssValue(selectedOption));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedOption = (event.target as HTMLInputElement).value;
    setSelectedOption(newSelectedOption);
    setColor(toColorObject('hex', Store.getCssValue(newSelectedOption)));
  };

  const renderOption = (key: string,
               title: string) => {
    return (
      <div className={'ariph-color-option'}>
        <RefreshIcon
          data-key={key}
          onClick={(e) => {
            const key = (e.target as HTMLInputElement).getAttribute('data-key');
            let color = '';

            switch (key) {
              case 'bgMaster': color = colors.default.bgMaster; break;
              case 'bgSlave': color = colors.default.bgSlave; break;
              case 'fgMaster': color = colors.default.fgMaster; break;
              case 'fgSlave': color = colors.default.fgSlave; break;
              default: return;
            }

            setColor(toColorObject('hex', color));
            Store.setCssValue(key, color);
          }}
        />
        <span className={`ariph-color-value ariph-${key}`}> </span>
        <FormControlLabel
          value={key}
          control={<Radio />}
          label={title}
        />
      </div>
    );
  };


  return (
    <div className={'ariph-color-settings'}>
      <div>

        <FormLabel component="legend">
          <span>Цвет</span>
          <a target={'_blank'} rel={'noreferrer'} href={'https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=546E7A'}>Палитра</a>
        </FormLabel>
        <RadioGroup
          aria-label="color-settings"
          name="color-settings"
          value={selectedOption}
          onChange={handleChange}
        >
          {renderOption('bgMaster', 'Фон, основной')}
          {renderOption('bgSlave', 'Фон, дополнительный')}
          {renderOption('fgMaster', 'Текст, основной')}
          {renderOption('fgSlave', 'Текст, дополнительный')}
        </RadioGroup>
      </div>

      <ColorPicker
        width={200}
        color={color}
        onChange={(e) => {
          setColor(e);
          Store.setCssValue(selectedOption, e.hex);
        }}
      />
    </div>
  );
}

export default ColorSettings;
