import React from 'react';
import './Status.scss';

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
        const last_commit_datetime = git_info && new Date(Date.parse(git_info.commit.commit.author.date)).toLocaleDateString("ru-RU", datetime_format);
        const last_commit_uri = git_info && git_info.commit.html_url
        
        return (
          <div className={'status'}>
              <p>Переведено: 1/14 книг</p>
              <p>Последнее изменение: <a href={last_commit_uri}>{last_commit_datetime}</a></p>
          </div>  
        );
    }
}

export default Status;
