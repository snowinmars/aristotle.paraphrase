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

    git_commit_hash_path = root.parent/'src'/'components'/'Status'/'git_commit_hash.js'

    with open(git_commit_hash_path, 'w', encoding='utf8') as file:
        git_commit_hash = call('git rev-parse HEAD').strip()
        git_commit_hash_template = f'const git_commit_hash = "{git_commit_hash}"; export default git_commit_hash;'
        file.write(git_commit_hash_template)

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

    if not (root/'default.pem').exists():
        raise Exception('Cant find .pem to connect remote server')

    print('Connecting to the remote server')
   # call('ssh -i default.pem ec2-user@ec2-54-93-191-207.eu-central-1.compute.amazonaws.com')


if __name__ == '__main__':
    print(f'from root {root}')
    main()
