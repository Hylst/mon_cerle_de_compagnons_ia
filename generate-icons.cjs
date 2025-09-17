/**
 * generate-icons.js
 * Script to generate PWA icons in various sizes using Canvas API
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Icon sizes needed for comprehensive PWA support
const iconSizes = [48, 72, 96, 144, 168, 192, 256, 512];

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to create an icon
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background with rounded corners
  const cornerRadius = size * 0.15;
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, cornerRadius);
  ctx.fill();
  
  // Main user icon (circle for head)
  const headRadius = size * 0.125;
  const headY = size * 0.375;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size / 2, headY, headRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Body (arc for shoulders)
  const bodyRadius = size * 0.25;
  const bodyY = size * 0.75;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.04;
  ctx.beginPath();
  ctx.arc(size / 2, bodyY, bodyRadius, Math.PI, 2 * Math.PI);
  ctx.stroke();
  
  // AI indicator (small green circle)
  const aiRadius = size * 0.0625;
  const aiX = size * 0.667;
  const aiY = size * 0.292;
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(aiX, aiY, aiRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  return canvas;
}

// Generate all icon sizes
iconSizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = `icon-${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated ${filename} (${size}x${size})`);
});

// Also create apple-touch-icon sizes
const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];
appleSizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = `apple-touch-icon-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated ${filename} (${size}x${size})`);
});

// Create favicon.ico compatible sizes
const faviconSizes = [16, 32];
faviconSizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = `favicon-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated ${filename} (${size}x${size})`);
});

console.log('\n✅ All PWA icons generated successfully!');
console.log('📱 Icons created for Android, iOS, and Desktop PWA support');