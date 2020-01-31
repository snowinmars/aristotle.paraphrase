import React from 'react';
import './Status.scss';
import git_commit_hash from './git_commit_hash'

class Status extends React.Component {
    componentDidMount() {
        const uri = 'https://api.github.com/repos/snowinmars/aristotel.paraphrase/branches/master';

        fetch(uri)
            .then(res => res.json())
            .then(result => this.setState({git_info: result}),
                error => console.log(error));
    }

    constructor(props) {
        super(props);

        this.state = {
            git_info: null
        }
    }

    render = () => {
        const git_info = this.state.git_info;
        const datetime_format = {
            day: '2-digit',
            year: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        let last_change = <React.Fragment>Loading...</React.Fragment>;

        if (git_info) {
            const now = Date.now();

            const last_commit_datetime = new Date(Date.parse(git_info.commit.commit.author.date));
            const diff = Math.round((now - last_commit_datetime.getTime()) / (24*3600*1000));

            const last_commit_uri = git_info.commit.html_url;

            const last_commit_datetime_string = last_commit_datetime.toLocaleDateString("ru-RU", datetime_format);

            last_change = <React.Fragment><a href={last_commit_uri}>{last_commit_datetime_string}</a> (дней назад: {diff})</React.Fragment>;
        }

        return (
          <div className={'status'}>
              <p>Переведено: 1/14 книг</p>
              <p>Последнее изменение: {last_change}</p>
              <p>Коммит: {git_commit_hash}</p>
          </div>
        );
    }
}

export default Status;
