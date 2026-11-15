// Test script to verify Gmail SMTP authentication and handshake
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key] && val) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {}
}

loadEnv();

async function verifySmtp() {
  console.log('=== VERIFYING GMAIL SMTP CONFIGURATION ===\n');
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'info@msklogisticsolution.com';
  const pass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();

  console.log('Host:   ', host);
  console.log('Port:   ', port);
  console.log('Secure: ', secure);
  console.log('User:   ', user);
  console.log('Pass:   ', pass ? '[CONFIGURED - ' + pass.length + ' chars]' : '[NOT SET IN .env]');

  if (!pass) {
    console.log('\n[STATUS] SMTP_PASS is empty in .env.');
    console.log('To activate Gmail SMTP delivery:');
    console.log('1. Generate a 16-character Google App Password from: https://myaccount.google.com/apppasswords');
    console.log('2. Add SMTP_PASS="your-16-char-app-password" to your .env file');
    console.log('3. Re-run: node scripts/test_smtp_connection.cjs');
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    console.log('\nAttempting SSL handshake and authentication with smtp.gmail.com:465...');
    await transporter.verify();
    console.log('[SUCCESS] Gmail SMTP handshake and authentication verified successfully!');
  } catch (err) {
    console.error('[ERROR] Gmail SMTP handshake failed:', err.message);
  }
}

verifySmtp();
