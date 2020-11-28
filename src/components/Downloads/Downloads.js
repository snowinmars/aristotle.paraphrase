import React from 'react';
import './Downloads.scss';

class Downloads extends React.Component {
  renderListItem = (title, width) => {
    return <li className={'ariph-download-title'}>
      <span className={'ariph-title'}>{title}</span>

      <button>Latex</button>
      <button>Pdf</button>
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
            {this.renderListItem('Книга 1')}
          </ul>
        </li>
        <li>
          <span>Ross, 1908 г.</span>
          <ul>
            {this.renderListItem('Книга 1')}
          </ul>
        </li>
        <li>
          <span>Парафраз</span>
          <ul>
            {this.renderListItem('Книга 1')}
          </ul>
        </li>
      </ul>
    </div>
  }
}

export default Downloads;
