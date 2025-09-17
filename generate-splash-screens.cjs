/**
 * generate-splash-screens.cjs
 * Generates iOS splash screen images for PWA in various sizes and orientations
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// iOS splash screen sizes (width x height)
const splashSizes = [
  // iPad Pro 12.9" (5th & 6th generation)
  { name: 'apple-splash-2048-2732', width: 2048, height: 2732 },
  { name: 'apple-splash-2732-2048', width: 2732, height: 2048 },
  
  // iPad Pro 11" (1st, 2nd, 3rd & 4th generation)
  { name: 'apple-splash-1668-2388', width: 1668, height: 2388 },
  { name: 'apple-splash-2388-1668', width: 2388, height: 1668 },
  
  // iPad Pro 10.5"
  { name: 'apple-splash-1536-2048', width: 1536, height: 2048 },
  { name: 'apple-splash-2048-1536', width: 2048, height: 1536 },
  
  // iPad mini (6th generation)
  { name: 'apple-splash-1488-2266', width: 1488, height: 2266 },
  { name: 'apple-splash-2266-1488', width: 2266, height: 1488 },
  
  // iPad Air (4th & 5th generation)
  { name: 'apple-splash-1640-2360', width: 1640, height: 2360 },
  { name: 'apple-splash-2360-1640', width: 2360, height: 1640 },
  
  // iPhone 14 Pro Max
  { name: 'apple-splash-1284-2778', width: 1284, height: 2778 },
  { name: 'apple-splash-2778-1284', width: 2778, height: 1284 },
  
  // iPhone 14 Pro
  { name: 'apple-splash-1170-2532', width: 1170, height: 2532 },
  { name: 'apple-splash-2532-1170', width: 2532, height: 1170 },
  
  // iPhone 13 Pro / iPhone 12 Pro
  { name: 'apple-splash-1125-2436', width: 1125, height: 2436 },
  { name: 'apple-splash-2436-1125', width: 2436, height: 1125 },
  
  // iPhone 14 Plus / iPhone 13 Pro Max / iPhone 12 Pro Max
  { name: 'apple-splash-1242-2688', width: 1242, height: 2688 },
  { name: 'apple-splash-2688-1242', width: 2688, height: 1242 },
  
  // iPhone 14 / iPhone 13 / iPhone 12 / iPhone 11
  { name: 'apple-splash-828-1792', width: 828, height: 1792 },
  { name: 'apple-splash-1792-828', width: 1792, height: 828 },
  
  // iPhone 8 Plus / iPhone 7 Plus / iPhone 6s Plus / iPhone 6 Plus
  { name: 'apple-splash-1242-2208', width: 1242, height: 2208 },
  { name: 'apple-splash-2208-1242', width: 2208, height: 1242 },
  
  // iPhone 8 / iPhone 7 / iPhone 6s / iPhone 6
  { name: 'apple-splash-750-1334', width: 750, height: 1334 },
  { name: 'apple-splash-1334-750', width: 1334, height: 750 },
  
  // iPhone 5
  { name: 'apple-splash-640-1136', width: 640, height: 1136 },
  { name: 'apple-splash-1136-640', width: 1136, height: 640 }
];

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate splash screens
splashSizes.forEach(size => {
  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');
  
  // Dark background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, size.width, size.height);
  
  // Calculate center position
  const centerX = size.width / 2;
  const centerY = size.height / 2;
  
  // Calculate icon size based on screen size (responsive)
  const iconSize = Math.min(size.width, size.height) * 0.15;
  const iconRadius = iconSize / 2;
  
  // Draw main circle (user icon background)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(centerX, centerY, iconRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw user icon (simplified person silhouette)
  ctx.fillStyle = '#0a0a0a';
  
  // Head
  const headRadius = iconRadius * 0.25;
  ctx.beginPath();
  ctx.arc(centerX, centerY - iconRadius * 0.3, headRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Body
  const bodyWidth = iconRadius * 0.6;
  const bodyHeight = iconRadius * 0.8;
  ctx.beginPath();
  ctx.arc(centerX, centerY + iconRadius * 0.1, bodyWidth / 2, 0, Math.PI, true);
  ctx.arc(centerX - bodyWidth / 2, centerY + iconRadius * 0.1, bodyWidth / 4, 0, 2 * Math.PI);
  ctx.arc(centerX + bodyWidth / 2, centerY + iconRadius * 0.1, bodyWidth / 4, 0, 2 * Math.PI);
  ctx.fill();
  
  // AI indicator (green dot)
  const aiDotRadius = iconRadius * 0.15;
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(centerX + iconRadius * 0.6, centerY - iconRadius * 0.6, aiDotRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add app title below icon
  const fontSize = Math.min(size.width, size.height) * 0.04;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Mon cercle de compagnons IA', centerX, centerY + iconRadius + fontSize * 2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(publicDir, `${size.name}.png`);
  fs.writeFileSync(filePath, buffer);
  
  console.log(`Generated: ${size.name}.png (${size.width}x${size.height})`);
});

console.log(`\nSuccessfully generated ${splashSizes.length} iOS splash screen images!`);