import React, {useState, useEffect} from 'react';
import config from '../../configs/api';
import './Status.scoped.scss';

interface GitInfo {
  commit: {
    html_url: string,
    commit: {
      author: {
        date: string,
      }
    }
  }
}

const getLastChangeBlock = (gitInfo: GitInfo) => {
  if (!gitInfo || !gitInfo.commit) {
    return <React.Fragment>Загружаю...</React.Fragment>;
  }

  const datetime_format = {
    day: '2-digit',
    year: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const now = Date.now();

  const lastCommitDatetime = new Date(Date.parse(gitInfo.commit.commit.author.date));
  const diff = Math.round((now - lastCommitDatetime.getTime()) / (24 * 3600 * 1000));

  const lastCommitUri = gitInfo.commit.html_url;

  const lastCommitDatetimeString = lastCommitDatetime.toLocaleDateString('ru-RU', datetime_format);

  const ago = <React.Fragment>
    {diff === 0 ? '(сегодня)' : `(дней назад: ${diff})`}
  </React.Fragment>;

  return (
    <React.Fragment>
      <a href={lastCommitUri}>{lastCommitDatetimeString}</a> {ago}
    </React.Fragment>
  );
};

function Status(): JSX.Element {
  const [gitInfo, setGitInfo] = useState<GitInfo>({
    commit: {
      html_url: '',
      commit: {
        author: {
          date: '',
        },
      },
    },
  });

  useEffect(() => {
    const uri = 'https://api.github.com/repos/snowinmars/aristotle.paraphrase/branches/master';

    void fetch(uri)
      .then((res) => res.json())
      .then((result) => setGitInfo(result),
        (error) => console.log(error));
  }, []);

  const lastChangeBlock = getLastChangeBlock(gitInfo);

  return (
    <div className={'status'}>
      <p>Переведено: 1/14 книг</p>
      <p>Последнее изменение: {lastChangeBlock}</p>
      <p>Коммит: {config.gitHash}</p>
    </div>
  );
}

export default Status;
