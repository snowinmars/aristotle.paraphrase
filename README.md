## About

This is an Aristotle paraphrase project: https://arph.ru

See [data submodule](https://github.com/snowinmars/aristotle.paraphrase.data) for texts itself.

## Tech stack

React + redux toolkit, node express

## Prerequirements
Create two files with the following content:

- `src/.env`
- `src/be/.env`
- `src/fe/.env`

### Developer config:

```
GIT_KEY=None
IS_IN_DOCKER=false
REACT_APP_HOST=localhost
REACT_APP_PORT=5000
REACT_APP_PROTOCOL=http
```

### Production config:

```
GIT_KEY= # github personal access token
IS_IN_DOCKER=true
REACT_APP_HOST=ariphrase.ru
REACT_APP_PORT=443
REACT_APP_PROTOCOL=https
```

### Variables explanation

- `GIT_KEY` - your github personal access token, that should have push access to [data repository](https://github.com/snowinmars/aristotle.paraphrase.data)
- `IS_IN_DOCKER` - you can't test git data editor if you start be server outside of docker. The root of this issue is security: to test this flow, you should inject your `GIT_KEY` in git submodule origin url, and the git submodule sometimes will not understand what you want. Idk how to fix it right now.
- `REACT_APP_HOST` - a browser will send requests to this backend host
- `REACT_APP_PORT` - a browser will send requests to this backend port
- `REACT_APP_PROTOCOL` - a browser will send requests with this backend protocol 

## Run with docker

1. `cd src`
1. `docker-compose build`
1. `docker-compose up`

Pull/push with `/scripts`.

## Run without docker

Clone this repo with `/src/be/src/data` submodule

### be
1. `cd src/be`
1. `yarn`
1. `yarn start`

Using a developer build, you will not be able to push changes elsewhere: all git functions will be mocked.

### fe
1. `cd src/fe`
1. `yarn`
1. `yarn start`

## Dev

### Create new empty chapter
1. `cd src/be`
2. `yarn chapter 1 2 3` , where `1` is book id, `2` is chapter id and `3` is paragraphs count (f.e., from 1 to 3 included). Existing files will be touched, unexisting files will be created as empty.
   1. `yarn chapter 1 2 1,4` - create book 1, chapter 2, paragraphs 1 and 4 only
   2. `yarn chapter 1 2 1-4` - create book 1, chapter 2, paragraphs 1, 2, 3 and 4

### Wikificate
1. `cd src/be`
1. `yarn wiki` will apply common russian text rules

### Update ssh certificates using certbot
1. `sudo certbot certonly --manual`
  1. Update `acme-challenge` directory at host machine (it will be mapped inside ngx docker container)
1. Check that new certs appears (see certbot output, default folder is `/etc/letsencrypt/live/%domain%`)
1. Check that certificates is valid using `sudo openssl x509 -enddate -noout -in fullchain.pem`
1. Copy new certificates to host `crt` directory (it is mapped inside ngx docker container)
1. Restart docker containers

### Todo
#### fe
- prerender `/` and `/contacts`
- uglify (s)css with modules hash
- lazy load

#### be
- optimize caching
