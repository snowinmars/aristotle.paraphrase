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

    get_last_change_block = () => {
        const git_info = this.state.git_info;

        if (!git_info) {
            return <React.Fragment>Loading...</React.Fragment>;
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

        const last_commit_datetime = new Date(Date.parse(git_info.commit.commit.author.date));
        const diff = Math.round((now - last_commit_datetime.getTime()) / (24 * 3600 * 1000));

        const last_commit_uri = git_info.commit.html_url;

        const last_commit_datetime_string = last_commit_datetime.toLocaleDateString("ru-RU", datetime_format);

        return (
            <React.Fragment>
                <a href={last_commit_uri}>{last_commit_datetime_string}</a> (дней назад: {diff})
            </React.Fragment>
        );
    };

    get_statistics_block = () => {

    };

    render = () => {
        const last_change_block = this.get_last_change_block();
        const statistics_block = this.get_statistics_block();

        return (
          <div className={'status'}>
              <p>Переведено: 1/14 книг</p>
              <p>Последнее изменение: {last_change_block}</p>
              <p>Коммит: {git_commit_hash}</p>
          </div>
        );
    }
}

export default Status;
