# Ariph

## How to run

1. Install and run docker.

1. Run the database using following. If you use Windows, run scripts from `/scripts/win` folder.

```bash
cd /scripts

chmod +x *.sh

./stop_all.sh

# The following line will return error kinda 'LETSENCRYPT_PASSWORD is not defined'. That's fine
# It means that nginx proxy container could not be builded, but you don't need it to run the system locally
./build.sh

# This will successfully run only 'ariph/db' and 'ariph/ntf' containers.
# That's fine for now
./run.sh
./get_ips.sh # optional
```
### Volumes

All volumes mount in `/home/${USER}/ariph/` of the host

- `ariphpsql` - psql volume. You will not have access to this folder - that's ok.
- `ariphlogs` - logs from all containers.

### Network
- `ariph`
	Set ips and ports in `scripts/variables.sh`.

### Backend container

Logs could be finded in `ariphlogs` docker volume with `backend` prefix.

### Frontend container

Nginx serves frontend. It's impossible to pass `REACT_APP_` env vars into nginx directly, so I made a workaround `/src/fe/build-env.sh`. It generates `.env.gen` file with required variables and inject it as js global object into `Index.html` head tag.

This file should exists both remote and locally, so the system uses
- `dockerentrypoint.sh` to start as remote service
- `yarnentrypoint.sh` to start locally

Frontend could be binded to docker backend container ip or to production host ip. Is depends on `IS_PROD` env variable:
- `./run_ariph.sh` - bind with docker
- `IS_PROD=1 ./run_ariph.sh` - bind with production

Logs could be finded in `ariphlogs` docker volume with `frontend` prefix.

### Nginx container

This is only container that should be public availabe. Its ip should be binded to domain.

`/src/ngx/proxy.conf.template` file will be builded using `dockerentrypoint.sh`.

During docker build flow it downloads a file with certbot ssh keys. It could fails, that's fine. If no local image was found, docker will pull working image from docker hub.

Logs could be finded in `ariphlogs` docker volume with `main_nginx` prefix.
