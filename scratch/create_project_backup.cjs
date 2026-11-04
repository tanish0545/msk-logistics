const fs = require('fs');
const path = require('path');

const targetBackupDir = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d\\backups\\pre_recovery_snapshot';

console.log('Creating full project recovery backup at:', targetBackupDir);

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const item of fs.readdirSync(src)) {
    if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive('.', targetBackupDir);
console.log('Recovery backup completed successfully!');

