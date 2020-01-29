import os
import subprocess
from pathlib import Path

root = Path(os.path.dirname(os.path.realpath(__file__)))


def call(command):
    result = subprocess.run(command.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)

    if result.stderr:
        raise Exception(f"{result.returncode}: {result.stderr}")

    return result.stdout


def main():
    docker_ids = call('docker ps -a -q')
    print(f"Found {len(docker_ids)} docker containers...")

    if len(docker_ids) > 0:
        print(f"Stopping and removing {len(docker_ids)} docker containers...")
        call(f"docker stop {docker_ids}")
        call(f"docker rm {docker_ids}")
        print(f"Stopped and removed {len(docker_ids)} docker containers.")

    print('Build Docker container...')
    call(f"docker build -t snowinmars/aristotel.paraphrase {root.parent}")

    print('Run Docker container...')
    call('docker run -d -p 5001:5000 snowinmars/aristotel.paraphrase')
    new_container_id = call('docker ps -a -q')
    print(f"Found {len(new_container_id)} docker containers: {new_container_id}")

    call(f"docker commit {new_container_id} aristotel.paraphrase")
    call('docker tag aristotel.paraphrase snowinmars/aristotel.paraphrase')

    print('Push docker container...')
    call('docker push snowinmars/aristotel.paraphrase')
    
    print('Done')


if __name__ == '__main__':
    print(f'from root {root}')
    main()
