const fs = require('fs');
const content = fs.readFileSync('src/pages/ContainerGuidePage.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('id=') || l.includes('Interactive Technical Inspector') || l.includes('TechnicalContainerInspector')) {
    console.log(i + 1, l.trim());
  }
});

