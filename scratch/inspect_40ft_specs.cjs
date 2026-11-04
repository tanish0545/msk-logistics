const fs = require('fs');
const content = fs.readFileSync('src/data/containerGuideData.ts', 'utf8');

const targetIds = ['40ft-standard', '40ft-high-cube', '40ft-high-cube-heavy-duty'];

for (const id of targetIds) {
  const start = content.indexOf(`id: '${id}'`);
  const end = content.indexOf('category:', start);
  const blockEnd = content.indexOf('operationalDisclaimer:', start);
  const block = content.slice(start, blockEnd + 150);
  console.log(`\n================== ${id} ==================`);
  
  // extract external, internal, tare, max gross, max payload, cubic
  const extMatch = block.match(/externalDimensions:\s*\{[\s\S]*?height:\s*\{([^}]+)\}/);
  const intMatch = block.match(/internalDimensions:\s*\{[\s\S]*?height:\s*\{([^}]+)\}/);
  const grossMatch = block.match(/maxGrossWeight:\s*\{([^}]+)\}/);
  const tareMatch = block.match(/tareWeight:\s*\{([^}]+)\}/);
  const payloadMatch = block.match(/maxPayload:\s*\{([^}]+)\}/);
  const cbmMatch = block.match(/cubicCapacity:\s*\{([^}]+)\}/);
  
  console.log('External Height:', extMatch ? extMatch[1].trim() : 'N/A');
  console.log('Internal Height:', intMatch ? intMatch[1].trim() : 'N/A');
  console.log('Max Gross Weight:', grossMatch ? grossMatch[1].trim() : 'N/A');
  console.log('Tare Weight:', tareMatch ? tareMatch[1].trim() : 'N/A');
  console.log('Max Payload:', payloadMatch ? payloadMatch[1].trim() : 'N/A');
  console.log('Cubic Capacity:', cbmMatch ? cbmMatch[1].trim() : 'N/A');
}

