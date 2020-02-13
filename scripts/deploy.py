import os
import subprocess
from pathlib import Path

root = Path(os.path.dirname(os.path.realpath(__file__)))


# call is CMD.exe
def call(command):
    print(command)
    result = subprocess.run(f'{command}'.split(),
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            universal_newlines=True)

    if result.stderr:
        raise Exception(f"{result.returncode}: {result.stderr}")

    return result.stdout


def main():
    host = 'ec2-user@ec2-54-93-191-207.eu-central-1.compute.amazonaws.com'
    production_pem = './production.pem'
    container_tag_name = 'aristotle.paraphrase'
    container_name = f'snowinmars/{container_tag_name}'

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
    call(f"docker build -t {container_name} {root.parent}")

    print('Run Docker container...')
    call(f'docker run -d -p 5001:5000 {container_name}')
    new_container_id = call('docker ps -a -q')
    print(f"Found {len(new_container_id)} docker containers: {new_container_id}")

    call(f"docker commit {new_container_id} {container_tag_name}")
    call(f'docker tag {container_tag_name} {container_name}')

    print('Push docker container...')
    call(f'docker push {container_name}')

    if not (root/production_pem).exists():
        raise Exception('Cant find .pem to connect remote server')

# if you have troubles with pem, use
# on linux:
#  chmod 600 $file
# on windows:
#  & icacls $file /c /t /inheritance:d
#  & icacls $file /c /t /grant $(whoami):F
#  & icacls $file /c /t /remove Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users

    print('Remote server: removing existing containers...')
    call(f'ssh -i "{root/production_pem}" {host} "docker stop $(docker ps -a -q)"')
    call(f'ssh -i "{root/production_pem}" {host} "docker rm $(docker ps -a -q)"')

    print('Remote server: logging in...')
    call(f'ssh -i "{root/production_pem}" {host} "docker login -u snowinmars --password-stdin asd"')

    print('Remote server: pulling...')
    call(f'ssh -i "{root/production_pem}" {host} "docker pull {container_name}"')

    print('Remote server: running...')
    call(f'ssh -i "{root/production_pem}" {host} "docker run -d -p 80:5000 {container_name}"')


if __name__ == '__main__':
    print(f'from root {root}')
    main()
