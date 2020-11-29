import React from 'react';
import './Downloads.scss';
import config from "../../configs/api";
import Button from "@material-ui/core/Button";

class Downloads extends React.Component {
  renderListItem = (title, url) => {
    return <li className={'ariph-download-title'}>
      <span className={'ariph-title'}>{title}</span>

      {/* picture_as_pdf*/}
      {/*https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg*/}
      <Button
        disabled={url===undefined}
        href={`${url}/tex`}
      >
        <i className="material-icons">download</i>
        <img
          className={'ariph-latex-logo'}
          width={'40px'}
          src={'https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg'}
          alt="LaTeX Logo" />
      </Button>
      <Button
        disabled={url===undefined}
        href={`${url}/pdf`}
      >
        <i className="material-icons">download</i>
        <i className="material-icons">picture_as_pdf</i>
      </Button>
    </li>
  }

  render = () => {
    return <div>
      <ul>
        {this.renderListItem('Аристотель - Метафизика - Кубицкий, 1934 г.')}
        {this.renderListItem('Аристотель - Метафизика - Ross, 1908 г.')}
        {this.renderListItem('Аристотель - Метафизика - Парафраз')}
      </ul>

      <ul className={'ariph-download-per-book'}>
        <li>
          <span>Кубицкий, 1934 г.</span>
          <ul>
            {this.renderListItem('Книга 1', `${config.host}/api/1/origin_rus`)}
          </ul>
        </li>
        <li>
          <span>Ross, 1908 г.</span>
          <ul>
            {this.renderListItem('Книга 1', `${config.host}/api/1/origin_eng`)}
          </ul>
        </li>
        <li>
          <span>Парафраз</span>
          <ul>
            {this.renderListItem('Книга 1', `${config.host}/api/1/paraphrase`)}
          </ul>
        </li>
      </ul>
    </div>
  }
}

export default Downloads;
