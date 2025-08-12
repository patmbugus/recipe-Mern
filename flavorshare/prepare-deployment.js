#!/usr/bin/env node

/**
 * 🚀 FlavorShare Deployment Preparation Script
 * This script helps prepare your project for hosting deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🍳 FlavorShare Deployment Preparation');
console.log('=====================================\n');

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

// Check project structure
log('📁 Checking project structure...', 'blue');
const structureChecks = [
  checkDirectory('backend', 'Backend directory'),
  checkDirectory('client', 'Frontend directory'),
  checkFile('package.json', 'Root package.json'),
  checkFile('README.md', 'README file'),
  checkFile('.gitignore', 'Git ignore file'),
  checkFile('LICENSE', 'License file')
];

// Check backend configuration
log('\n🔧 Checking backend configuration...', 'blue');
const backendChecks = [
  checkFile('backend/package.json', 'Backend package.json'),
  checkFile('backend/src/server.js', 'Backend server file'),
  checkFile('backend/env.production.template', 'Backend production env template')
];

// Check frontend configuration
log('\n🌐 Checking frontend configuration...', 'blue');
const frontendChecks = [
  checkFile('client/package.json', 'Frontend package.json'),
  checkFile('client/src/App.jsx', 'Frontend App component'),
  checkFile('client/env.production.template', 'Frontend production env template')
];

// Check deployment configuration
log('\n🚀 Checking deployment configuration...', 'blue');
const deploymentChecks = [
  checkFile('render.yaml', 'Render configuration'),
  checkFile('netlify.toml', 'Netlify configuration'),
  checkFile('DEPLOYMENT.md', 'Deployment guide'),
  checkFile('deploy.sh', 'Linux/Mac deployment script'),
  checkFile('deploy.bat', 'Windows deployment script')
];

// Check if git is initialized
log('\n📁 Checking Git repository...', 'blue');
let gitInitialized = false;
try {
  execSync('git status', { stdio: 'pipe' });
  log('✅ Git repository initialized', 'green');
  gitInitialized = true;
} catch (error) {
  log('❌ Git repository not initialized', 'red');
}

// Check if .env files exist
log('\n🔐 Checking environment files...', 'blue');
const envChecks = [
  checkFile('backend/.env', 'Backend .env file'),
  checkFile('client/.env', 'Frontend .env file')
];

// Test production build
log('\n🔨 Testing production build...', 'blue');
let buildSuccess = false;
try {
  process.chdir('client');
  execSync('npm run build', { stdio: 'pipe' });
  log('✅ Frontend build successful', 'green');
  buildSuccess = true;
  process.chdir('..');
} catch (error) {
  log('❌ Frontend build failed', 'red');
  log('   Error: ' + error.message, 'red');
  process.chdir('..');
}

// Test backend
log('\n🧪 Testing backend...', 'blue');
let backendTestSuccess = false;
try {
  process.chdir('backend');
  execSync('npm test', { stdio: 'pipe' });
  log('✅ Backend tests passed', 'green');
  backendTestSuccess = true;
  process.chdir('..');
} catch (error) {
  log('⚠️  Backend tests failed', 'yellow');
  log('   Error: ' + error.message, 'yellow');
  process.chdir('..');
}

// Summary
log('\n📊 Deployment Preparation Summary', 'bold');
log('=====================================');

const allChecks = [...structureChecks, ...backendChecks, ...frontendChecks, ...deploymentChecks];
const passedChecks = allChecks.filter(check => check).length;
const totalChecks = allChecks.length;

log(`\nOverall Status: ${passedChecks}/${totalChecks} checks passed`, passedChecks === totalChecks ? 'green' : 'yellow');

if (passedChecks === totalChecks) {
  log('\n🎉 Your project is ready for deployment!', 'green');
} else {
  log('\n⚠️  Some issues need to be resolved before deployment', 'yellow');
}

// Recommendations
log('\n📋 Next Steps:', 'blue');
log('1. Set up MongoDB Atlas database');
log('2. Create .env files from templates');
log('3. Choose hosting platform (see DEPLOYMENT.md)');
log('4. Deploy backend first');
log('5. Deploy frontend');
log('6. Test everything works');

// Create .env files if they don't exist
log('\n🔧 Creating environment files...', 'blue');

if (!fs.existsSync('backend/.env')) {
  try {
    fs.copyFileSync('backend/env.production.template', 'backend/.env');
    log('✅ Created backend/.env from template', 'green');
    log('   ⚠️  Remember to update with your actual values!', 'yellow');
  } catch (error) {
    log('❌ Failed to create backend/.env', 'red');
  }
}

if (!fs.existsSync('client/.env')) {
  try {
    fs.copyFileSync('client/env.production.template', 'client/.env');
    log('✅ Created client/.env from template', 'green');
    log('   ⚠️  Remember to update with your actual values!', 'yellow');
  } catch (error) {
    log('❌ Failed to create client/.env', 'red');
  }
}

log('\n📚 For detailed deployment instructions, see DEPLOYMENT.md');
log('🚀 Happy deploying!', 'green');
