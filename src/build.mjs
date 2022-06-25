import * as child_process from 'child_process';
import * as fs from 'fs';

const cleanBuildDir = () => {
  fs.rmdirSync('dist', {
    recursive: true, force: true
  });

  fs.mkdirSync('dist');
};

const run = (command) => {
  const [cmd, ...params] = command.split(' ');

  const child = child_process.spawn(cmd, params);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  return child;
}

const openElectronOnBuild = () => {
  const watcher = setInterval(() => {
    if (fs.existsSync('dist/main.js')) {
      clearInterval(watcher);
      run('electron --inspect=5858 .');
    }
  }, 500);
};

/* Runtime */

cleanBuildDir();

if (!fs.existsSync(`dist/index.html`)) {
  fs.writeFileSync(`dist/index.html`, fs.readFileSync(`src/index.html`));
}

run('parcel watch src/react/index.tsx --dist-dir dist/react-app');
run('tsc --watch');
openElectronOnBuild();

