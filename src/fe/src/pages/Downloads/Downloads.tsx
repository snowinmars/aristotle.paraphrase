import React from 'react';
import config from '../../configs/api';
import Button from '@material-ui/core/Button';
import './Downloads.scoped.scss';
import './Colors.scoped.scss';

const renderListItem = (title: string, url: string | null = null) => {
  return <li className={'ariph-download-row'}>
    <span className={'ariph-title'}>{title}</span>

    <Button
      disabled={url===null}
      href={url ? `${url}/tex` : ''}
    >
      <i className="material-icons">download</i>
      <img
        className={'ariph-latex-logo'}
        width={'40px'}
        src={'https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg'}
        alt="LaTeX Logo" />
    </Button>

    <Button
      disabled={url===null}
      href={url ? `${url}/pdf` : ''}
    >
      <i className="material-icons">download</i>
      <i className="material-icons">picture_as_pdf</i>
    </Button>
  </li>;
};

function Downloads(): JSX.Element {
  return <div>
    <ul>
      {renderListItem('Аристотель - Метафизика - Кубицкий, 1934 г.')}
      {renderListItem('Аристотель - Метафизика - Ross, 1908 г.')}
      {renderListItem('Аристотель - Метафизика - Парафраз')}
    </ul>

    <ul className={'ariph-download-per-book'}>
      <li>
        <span>Кубицкий, 1934 г.</span>
        <ul>
          {renderListItem('Книга 1', `${config.host}/api/1/origin_rus`)}
        </ul>
      </li>
      <li>
        <span>Ross, 1908 г.</span>
        <ul>
          {renderListItem('Книга 1', `${config.host}/api/1/origin_eng`)}
        </ul>
      </li>
      <li>
        <span>Парафраз</span>
        <ul>
          {renderListItem('Книга 1', `${config.host}/api/1/paraphrase`)}
        </ul>
      </li>
    </ul>
  </div>;
}

export default Downloads;
