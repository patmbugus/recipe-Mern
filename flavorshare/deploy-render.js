#!/usr/bin/env node

/**
 * FlavorShare Render Deployment Preparation Script
 * This script helps you prepare your project for deployment to Render
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 FlavorShare Render Deployment Preparation\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description}`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description}`, 'red');
    return false;
  }
}

function runCommand(command, description) {
  try {
    execSync(command, { stdio: 'pipe' });
    log(`✅ ${description}`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description}`, 'red');
    return false;
  }
}

// Check project structure
log('\n📁 Checking Project Structure...', 'bold');

const structureChecks = [
  checkDirectory('backend', 'Backend directory exists'),
  checkDirectory('client', 'Client directory exists'),
  checkFile('backend/package.json', 'Backend package.json exists'),
  checkFile('backend/server.js', 'Backend server.js exists'),
  checkFile('render.yaml', 'Render configuration exists'),
  checkFile('backend/env.production.template', 'Environment template exists')
];

// Check backend dependencies
log('\n📦 Checking Backend Dependencies...', 'bold');

const backendChecks = [
  checkDirectory('backend/node_modules', 'Backend node_modules exists'),
  checkFile('backend/package-lock.json', 'Backend package-lock.json exists')
];

// Check if backend can start
log('\n🔧 Testing Backend...', 'bold');

const backendTests = [
  runCommand('cd backend && npm run test-connection', 'Backend connection test'),
  runCommand('cd backend && npm run test', 'Backend tests')
];

// Check Git status
log('\n📝 Checking Git Status...', 'bold');

const gitChecks = [
  runCommand('git status --porcelain', 'Git working directory clean'),
  runCommand('git remote -v', 'Git remote configured')
];

// Summary
log('\n📊 Deployment Readiness Summary', 'bold');
log('=====================================');

const allChecks = [...structureChecks, ...backendChecks, ...backendTests, ...gitChecks];
const passedChecks = allChecks.filter(check => check).length;
const totalChecks = allChecks.length;

log(`\nOverall Status: ${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  log('\n🎉 Your project is ready for Render deployment!', 'green');
} else {
  log('\n⚠️  Some issues need to be resolved before deployment', 'yellow');
}

// Next steps
log('\n🚀 Next Steps for Render Deployment:', 'bold');
log('1. Go to [render.com](https://render.com)');
log('2. Create new Web Service');
log('3. Connect your GitHub repository');
log('4. Set Root Directory to: backend');
log('5. Configure environment variables');
log('6. Deploy!');

// Environment variables reminder
log('\n🔐 Required Environment Variables:', 'bold');
log('NODE_ENV=production');
log('PORT=10000');
log('MONGODB_URI=your-mongodb-connection-string');
log('JWT_SECRET=your-super-secret-jwt-key');
log('JWT_EXPIRE=30d');

// CORS configuration
log('\n🌐 CORS Configuration:', 'bold');
log('CORS_ORIGIN=https://your-frontend-domain.netlify.app');

// Important notes
log('\n⚠️  Important Notes:', 'yellow');
log('- Root Directory MUST be: backend');
log('- Build Command: npm install');
log('- Start Command: npm start');
log('- Use Free plan for testing');

log('\n📚 For detailed instructions, see: RENDER-DEPLOYMENT-GUIDE.md');
log('📋 For quick checklist, see: RENDER-CHECKLIST.md');

console.log('\nHappy deploying! 🎉✨\n');
