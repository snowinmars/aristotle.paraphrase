const child_process = require('child_process');

export const git = (command: string): string => child_process.execSync(`git ${command}`, {encoding: 'utf8'}).trim()
