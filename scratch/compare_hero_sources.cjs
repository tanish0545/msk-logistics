const fs = require('fs');

const rawPath = 'public/images/hero/msk-cinematic-port-raw.png';
const finalPath = 'public/images/hero/msk-cinematic-port-final.png';
const montagePath = 'public/images/hero/global-freight-transportation-montage.png';

const rawStat = fs.statSync(rawPath);
const finalStat = fs.statSync(finalPath);
const montageStat = fs.existsSync(montagePath) ? fs.statSync(montagePath) : null;

const rawBuf = fs.readFileSync(rawPath);
const finalBuf = fs.readFileSync(finalPath);

const rawW = rawBuf.readUInt32BE(16);
const rawH = rawBuf.readUInt32BE(20);

const finalW = finalBuf.readUInt32BE(16);
const finalH = finalBuf.readUInt32BE(20);

console.log('=== HERO SOURCE ASSET COMPARISON ===');
console.log('1. Raw Image (msk-cinematic-port-raw.png):');
console.log(`   Dimensions: ${rawW} × ${rawH}`);
console.log(`   File Size: ${(rawStat.size / 1024).toFixed(1)} KB (${rawStat.size} bytes)`);
console.log(`   Aspect Ratio: ${(rawW / rawH).toFixed(3)}:1`);

console.log('\n2. Final Image (msk-cinematic-port-final.png):');
console.log(`   Dimensions: ${finalW} × ${finalH}`);
console.log(`   File Size: ${(finalStat.size / (1024 * 1024)).toFixed(2)} MB (${finalStat.size} bytes)`);
console.log(`   Aspect Ratio: ${(finalW / finalH).toFixed(3)}:1`);

console.log('\n3. Original Transport Montage (global-freight-transportation-montage.png):');
if (montageStat) {
  const montageBuf = fs.readFileSync(montagePath);
  const mW = montageBuf.readUInt32BE(16);
  const mH = montageBuf.readUInt32BE(20);
  console.log(`   Dimensions: ${mW} × ${mH}`);
  console.log(`   File Size: ${(montageStat.size / (1024 * 1024)).toFixed(2)} MB (${montageStat.size} bytes)`);
  console.log(`   Aspect Ratio: ${(mW / mH).toFixed(3)}:1`);
}

const scaleX = finalW / rawW;
const scaleY = finalH / rawH;
console.log(`\nScale Factor (Final vs Raw): ${scaleX.toFixed(2)}× width, ${scaleY.toFixed(2)}× height`);
console.log(`Data density comparison: Raw was ${rawW * rawH} pixels, Final is ${finalW * finalH} pixels (${((finalW * finalH) / (rawW * rawH)).toFixed(1)}× pixel expansion).`);

