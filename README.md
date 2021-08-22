## About

This is an Aristotle paraphrase project: https://ariphrase.ru

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
IS_DEV=true
REACT_APP_HOST=localhost
REACT_APP_PORT=80
REACT_APP_PROTOCOL=http
```

### Production config:

Your github personal access token should have push access to [data repository](https://github.com/snowinmars/aristotle.paraphrase.data),

```
GIT_KEY= # github personal access token
IS_DEV=false
REACT_APP_HOST=ariphrase.ru
REACT_APP_PORT=443
REACT_APP_PROTOCOL=https
```

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
1. `echo -e "GIT_KEY=None\nIS_DEV=true" > .env`
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

### Wikificate
1. `cd src/be`
2. `yarn wiki` will apply common russian text rules
