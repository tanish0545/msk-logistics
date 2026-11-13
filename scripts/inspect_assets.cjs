const fs = require('fs');

const content = fs.readFileSync('src/data/imageAssets.ts', 'utf8');
const entries = content.split(/\{\s*id:/).slice(1);

entries.forEach(entry => {
  const getField = (field) => {
    const m = entry.match(new RegExp(`${field}:\\s*['"]([^'"]+)['"]`));
    return m ? m[1] : '';
  };
  console.log('File:', getField('driveFilename'), '| Local:', getField('localPath'));
  console.log('Title:', getField('title'));
  console.log('Category:', getField('category'), '/', getField('subcategory'));
  console.log('Details:', getField('verifiedDetails'));
  console.log('----------------------------------------');
});
