import os
import subprocess
from pathlib import Path
import platform
import click  # click

root = Path(os.path.dirname(os.path.realpath(__file__)))


# call is CMD.exe
def call(command):
    print(command)
    result = subprocess.run(f'{command}'.split(),
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            universal_newlines=True,
                            shell=True)

    if result.stderr:
        raise Exception(f"{result.returncode}: {result.stderr}")

    return result.stdout


def create_git_hash_file():
    git_commit_hash_path = root.parent/'src'/'components'/'Status'/'git_commit_hash.js'

    with open(git_commit_hash_path, 'w', encoding='utf8') as file:
        git_commit_hash = call('git rev-parse HEAD').strip()
        git_commit_hash_template = f'const git_commit_hash = "{git_commit_hash}"; export default git_commit_hash;'
        file.write(git_commit_hash_template)

    return git_commit_hash_path


def build(container_name, container_tag_name):
    docker_ids = call('docker ps -a -q')
    docker_ids_length = len(docker_ids)
    print(f"Found {docker_ids_length} docker containers...")

    if docker_ids_length > 0:
        print(f"Stopping and removing {docker_ids_length} docker containers...")
        call(f"docker stop {docker_ids}")
        call(f"docker rm {docker_ids}")
        print(f"Stopped and removed {docker_ids_length} docker containers.")

    git_file_path = create_git_hash_file()
    print(f"Created git hash file at {git_file_path}")

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

    print('Docker container was pushed')


@click.command()
@click.option('--deploy_only', '-d', is_flag=True, required=True, help='Do not build current files but deploy latest docker image only')
def main(deploy_only):
    host = 'ec2-user@ec2-54-93-191-207.eu-central-1.compute.amazonaws.com'
    production_pem = './production.pem'
    container_tag_name = 'aristotle.paraphrase'
    container_name = f'snowinmars/{container_tag_name}'

    if not deploy_only:
        build(container_name, container_tag_name)

        if not (root/production_pem).exists():
            raise Exception('Docker container was pushed to hub but was not deployed to the remote server: .pem file cannot be found')

# if you have troubles with pem, use
# on linux:
#  chmod 600 $file
# on windows:
#  & icacls $file /c /t /inheritance:d
#  & icacls $file /c /t /grant $(whoami):F
#  & icacls $file /c /t /remove Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users

    # https://stackoverflow.com/questions/51156884/ssh-not-recognized-as-a-command-when-executed-from-python-using-subprocess
    # https://gist.github.com/bortzmeyer/1284249
    system32 = os.path.join(os.environ['SystemRoot'], 'SysNative')
    ssh_path = os.path.join(system32, 'OpenSSH\ssh.exe')

    print('Remote server: removing existing containers...')
    call(f'{ssh_path} -i "{root/production_pem}" {host} "docker stop $(docker ps -a -q)"')
    call(f'{ssh_path} -i "{root/production_pem}" {host} "docker rm $(docker ps -a -q)"')

    print('Remote server: logging in...')
    call(f'{ssh_path} -i "{root/production_pem}" {host} "docker login -u snowinmars --password-stdin asd"')

    print('Remote server: pulling...')
    call(f'{ssh_path} -i "{root/production_pem}" {host} "docker pull {container_name}"')

    print('Remote server: running...')
    call(f'{ssh_path} -i "{root/production_pem}" {host} "docker run -d -p 80:5000 {container_name}"')


if __name__ == '__main__':
    print(f'from root {root}')
    main()
