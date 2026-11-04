const fs = require('fs');
const path = require('path');

const terms = ['deugro', 'jaguar', 'yogiji', 'transglobal', 'bbm'];
const results = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'backups') {
        walk(full);
      }
    } else if (/\.(tsx?|jsx?|json|html|md)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        terms.forEach(term => {
          if (new RegExp('\\b' + term + '\\b', 'i').test(line)) {
            results.push({ file: full, lineNum: idx + 1, term, line: line.trim() });
          }
        });
      });
    }
  }
}

walk('src');
console.log(`Found ${results.length} occurrences in src:`);
results.forEach(r => console.log(`${r.file}:${r.lineNum} [${r.term}]: ${r.line}`));

