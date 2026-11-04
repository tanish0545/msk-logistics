const fs = require('fs');
const path = require('path');

function findFiles(dir, exts) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist') {
        list = list.concat(findFiles(full, exts));
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (exts.includes(ext)) {
        list.push(full.replace(/\\/g, '/'));
      }
    }
  }
  return list;
}

const allTsx = findFiles('src', ['.tsx', '.ts']);
const componentFiles = allTsx.filter(f => f.includes('src/components/'));
const pageFiles = allTsx.filter(f => f.includes('src/pages/'));
const allCodeFiles = findFiles('src', ['.tsx', '.ts']).concat(['index.html', 'vite.config.ts']);

console.log(`Auditing ${componentFiles.length} component files and ${pageFiles.length} page files...`);

const codeTexts = allCodeFiles.map(f => ({
  path: f,
  text: fs.readFileSync(f, 'utf8')
}));

const componentAudit = [];

for (const comp of componentFiles) {
  const baseName = path.basename(comp, path.extname(comp));
  // check how many times baseName is imported or referenced
  let importCount = 0;
  const referencingFiles = [];
  for (const c of codeTexts) {
    if (c.path === comp) continue; // skip self
    // regex for import of this component
    if (c.text.includes(baseName)) {
      importCount++;
      referencingFiles.push(c.path);
    }
  }
  componentAudit.push({
    file: comp,
    name: baseName,
    importCount,
    referencingFiles,
    isUnused: importCount === 0
  });
}

const unusedComponents = componentAudit.filter(c => c.isUnused);
console.log(`Unused components count: ${unusedComponents.length}`);
unusedComponents.forEach((u, i) => {
  console.log(`  ${i+1}. ${u.file}`);
});

fs.writeFileSync('scratch/component_audit.json', JSON.stringify({
  totalComponents: componentFiles.length,
  unusedCount: unusedComponents.length,
  components: componentAudit
}, null, 2));

