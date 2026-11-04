const { execSync } = require('child_process');

try {
  const out = execSync('wmic process where "ProcessId=27596 or ProcessId=22232" get ProcessId,CommandLine,ExecutablePath', { encoding: 'utf8' });
  console.log(out);
} catch (e) {
  console.error(e.message);
}

