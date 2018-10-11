const fs = require('fs');
const execSync = require('child_process').execSync;

const themeconfPath = 'themes/strudel/_config.yml';
const themeconfig = fs.readFileSync(themeconfPath, 'utf-8');

console.log(`Checking latest Strudel version...`);
const localVersion = themeconfig.match(/version: (.*)/)[1];
const version = execSync('npm view strudel version').toString().trim();

if (localVersion === version) {
  console.log(`Version is up-to-date.`);
  process.exit(0);
}

fs.writeFileSync(
  themeconfPath,
  themeconfig.replace(/version: .*/, 'version: ' + version)
);

console.log(`\nSuccessfully updated Strudel version.\n`);
