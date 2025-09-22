/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { EyeShape, Accessory } from '../../../lib/presets/agents';

type BasicFaceProps = {
  ctx: CanvasRenderingContext2D;
  mouthScale: number;
  eyeScale: number;
  color?: string;
  eyeShape?: EyeShape;
  accessory?: Accessory;
};

const eye = (
  ctx: CanvasRenderingContext2D,
  pos: [number, number],
  radius: number,
  scaleY: number,
  shape: EyeShape = 'round'
) => {
  ctx.save();
  ctx.translate(pos[0], pos[1]);
  ctx.beginPath();

  switch (shape) {
    case 'line':
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.lineWidth = radius / 2;
      ctx.stroke();
      break;
    case 'oval':
      ctx.scale(1, 0.6);
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'round':
    default:
      ctx.scale(1, scaleY);
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.restore();
};

const drawMonocle = (
  ctx: CanvasRenderingContext2D,
  eyePos: [number, number],
  eyeRadius: number
) => {
  ctx.save();
  ctx.strokeStyle = '#D4AF37'; // Gold color
  ctx.lineWidth = eyeRadius / 4;

  // Draw lens
  ctx.beginPath();
  ctx.arc(eyePos[0], eyePos[1], eyeRadius * 1.5, 0, Math.PI * 2);
  ctx.stroke();

  // Draw chain
  ctx.beginPath();
  ctx.moveTo(eyePos[0] + eyeRadius * 1.5, eyePos[1]);
  ctx.bezierCurveTo(
    eyePos[0] + eyeRadius * 4,
    eyePos[1] - eyeRadius * 2,
    eyePos[0] + eyeRadius * 5,
    eyePos[1] + eyeRadius * 5,
    eyePos[0] + eyeRadius * 3,
    eyePos[1] + eyeRadius * 7
  );
  ctx.lineWidth = eyeRadius / 8;
  ctx.stroke();

  ctx.restore();
};

const drawSciFiVisor = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  const cx = width / 2;
  const cy = height / 2.4; // Center of the visor, aligned with eyes
  const visorWidth = width * 0.75;
  const visorHeight = height / 8;
  const curveAmount = visorHeight * 0.6;

  ctx.save();

  // 1. Draw the transparent lens first
  // A very light blue with significant transparency
  ctx.fillStyle = 'rgba(173, 216, 230, 0.2)';
  ctx.strokeStyle = 'rgba(200, 230, 255, 0.8)'; // Brighter for the border
  ctx.lineWidth = 3;

  const path = new Path2D();
  path.moveTo(cx - visorWidth / 2, cy);
  path.quadraticCurveTo(cx, cy - curveAmount, cx + visorWidth / 2, cy);
  path.quadraticCurveTo(cx, cy + curveAmount, cx - visorWidth / 2, cy);
  path.closePath();

  // Add a glow effect to the border
  ctx.shadowColor = 'rgba(173, 216, 230, 0.9)';
  ctx.shadowBlur = 15;
  ctx.stroke(path);

  // Reset shadow before filling
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fill(path);

  // 2. Draw small side pieces for the "helmet" part
  ctx.fillStyle = '#444'; // Dark grey for side pieces
  const sidePieceWidth = width / 18;

  // Left side piece
  ctx.beginPath();
  ctx.arc(cx - visorWidth / 2, cy, sidePieceWidth, Math.PI * 0.5, Math.PI * 1.5);
  ctx.fill();

  // Right side piece
  ctx.beginPath();
  ctx.arc(cx + visorWidth / 2, cy, sidePieceWidth, Math.PI * 1.5, Math.PI * 0.5);
  ctx.fill();

  ctx.restore();
};

const drawTiara = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  const PADDING = 20;
  const faceRadius = width / 2 - PADDING;
  const faceTopY = height / 2 - faceRadius;

  ctx.save();

  // Tiara position
  const tiaraY = faceTopY + height * 0.05;
  const tiaraCenterX = width / 2;
  const tiaraWidth = width * 0.5;
  const tiaraHeight = height * 0.1;

  // Band
  // Create a silver gradient for a metallic look
  const gradient = ctx.createLinearGradient(
    tiaraCenterX - tiaraWidth / 2,
    tiaraY,
    tiaraCenterX + tiaraWidth / 2,
    tiaraY
  );
  gradient.addColorStop(0, '#E0E0E0'); // Light silver
  gradient.addColorStop(0.5, '#FFFFFF'); // Highlight
  gradient.addColorStop(1, '#B0B0B0'); // Darker silver

  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.fillStyle = gradient;

  // Draw the curved band
  ctx.beginPath();
  ctx.moveTo(tiaraCenterX - tiaraWidth / 2, tiaraY);
  // A gentle curve upwards
  ctx.quadraticCurveTo(
    tiaraCenterX,
    tiaraY + tiaraHeight * 0.2,
    tiaraCenterX + tiaraWidth / 2,
    tiaraY
  );
  // The peak of the tiara
  ctx.quadraticCurveTo(
    tiaraCenterX,
    tiaraY - tiaraHeight,
    tiaraCenterX - tiaraWidth / 2,
    tiaraY
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Main Gem (Deep Pink)
  const gemSize = width / 25;
  ctx.fillStyle = '#ff1493';
  ctx.strokeStyle = '#a00060';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Simple diamond shape
  ctx.moveTo(tiaraCenterX, tiaraY - tiaraHeight * 0.9); // Top point
  ctx.lineTo(tiaraCenterX + gemSize / 2, tiaraY - tiaraHeight * 0.6); // Right point
  ctx.lineTo(tiaraCenterX, tiaraY - tiaraHeight * 0.3); // Bottom point
  ctx.lineTo(tiaraCenterX - gemSize / 2, tiaraY - tiaraHeight * 0.6); // Left point
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Add a sparkle to the gem
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(
    tiaraCenterX - gemSize * 0.15,
    tiaraY - tiaraHeight * 0.7,
    gemSize * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.restore();
};

const drawGoggles = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 15;
  const eyeRadius = width / 30;

  // Strap
  ctx.fillStyle = '#333';
  ctx.fillRect(0, eyesCenter[1] - eyeRadius, width, eyeRadius * 2);

  // Lenses
  ctx.strokeStyle = '#555';
  ctx.lineWidth = eyeRadius / 2;
  ctx.fillStyle = '#c1e1ec'; // Light blue lens

  const lensRadius = eyeRadius * 2;

  ctx.beginPath();
  ctx.arc(
    eyesCenter[0] - eyesOffset,
    eyesCenter[1],
    lensRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(
    eyesCenter[0] + eyesOffset,
    eyesCenter[1],
    lensRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

const drawBowlerHat = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();
  ctx.fillStyle = '#222';

  // Brim
  const brimY = height / 3.5;
  const brimWidth = width * 0.7;
  const brimHeight = height / 20;
  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    brimY,
    brimWidth / 2,
    brimHeight / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Crown
  const crownHeight = height / 5;
  const crownWidth = brimWidth * 0.8;
  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    brimY - crownHeight / 2 + brimHeight / 2,
    crownWidth / 2,
    crownHeight / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Cut the bottom of the crown to sit on the brim
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.rect(0, 0, width, brimY);
  ctx.fill();

  ctx.restore();
};

const drawPlumedHat = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  // This padding must match the one used when drawing the face circle.
  const PADDING = 20;
  const faceRadius = width / 2 - PADDING;
  const faceTopY = height / 2 - faceRadius;

  ctx.save();
  ctx.fillStyle = '#3A2A2A'; // Dark brown
  ctx.strokeStyle = '#2A1A1A';
  ctx.lineWidth = 2;

  const hatCenterX = width / 2;
  const brimWidth = width * 0.8;
  const brimHeight = height / 18;
  // Position the brim lower relative to the top of the face.
  const brimY = faceTopY + brimHeight * 2.5;

  // Brim
  ctx.beginPath();
  ctx.ellipse(hatCenterX, brimY, brimWidth / 2, brimHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Crown
  const crownHeight = height / 4;
  const crownWidth = brimWidth * 0.7;
  const crownY = brimY - crownHeight / 2.5;

  ctx.beginPath();
  // Using bezier curves for a less rigid crown shape
  ctx.moveTo(hatCenterX - crownWidth / 2, brimY);
  ctx.bezierCurveTo(
    hatCenterX - crownWidth / 2, crownY,
    hatCenterX + crownWidth / 2, crownY,
    hatCenterX + crownWidth / 2, brimY
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Feather (plume)
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#BDBDBD';
  ctx.lineWidth = 1.5;

  // Position and rotation
  const featherBaseX = hatCenterX - crownWidth / 3.5;
  const featherBaseY = brimY;
  ctx.translate(featherBaseX, featherBaseY);
  ctx.rotate(-Math.PI / 12); // Tilt it slightly

  const featherLength = height * 0.2;
  const featherWidth = width * 0.05;

  // Draw path
  ctx.beginPath();
  ctx.moveTo(0, 0);
  // Curve out and up to the tip
  ctx.quadraticCurveTo(-featherWidth, -featherLength / 2, 0, -featherLength);
  // Curve back down
  ctx.quadraticCurveTo(featherWidth, -featherLength / 2, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore(); // Restore from feather drawing

  ctx.restore();
};

const drawChefHat = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  // This padding must match the one used when drawing the face circle.
  const PADDING = 20;
  const faceRadius = width / 2 - PADDING;
  const faceTopY = height / 2 - faceRadius;

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E0E0E0'; // Light grey for pleat lines
  ctx.lineWidth = 1;

  const bandHeight = height / 15;
  const bandY = faceTopY + 10;
  const bandWidth = width * 0.55;
  const bandX = (width - bandWidth) / 2;

  // Hat band
  ctx.fillRect(bandX, bandY, bandWidth, bandHeight);

  // Puffy top - create a cloud-like shape with multiple arcs
  const topCenterY = bandY;
  const topHeight = height / 4.5;
  const topWidth = width * 0.65;
  const topCenterX = width / 2;

  ctx.beginPath();
  // Start from the left edge of the band
  ctx.moveTo(bandX + 2, bandY); // a little inward
  // Create a series of arcs to form the puffy top
  ctx.arc(
    topCenterX - topWidth * 0.3,
    topCenterY - topHeight * 0.5,
    topWidth * 0.25,
    Math.PI * 0.9,
    Math.PI * 1.8
  );
  ctx.arc(
    topCenterX,
    topCenterY - topHeight * 0.7,
    topWidth * 0.4,
    Math.PI * 1.3,
    Math.PI * 1.9
  );
  ctx.arc(
    topCenterX + topWidth * 0.3,
    topCenterY - topHeight * 0.5,
    topWidth * 0.25,
    Math.PI * 1.2,
    Math.PI * 2.1
  );
  // Connect back to the right edge of the band
  ctx.lineTo(bandX + bandWidth - 2, bandY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

const drawSunglasses = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 12;
  const lensWidth = width / 8;
  const lensHeight = width / 12;

  // Lenses (semi-transparent)
  ctx.fillStyle = 'rgba(17, 17, 17, 0.5)'; // #111 with 50% opacity
  ctx.beginPath();
  ctx.rect(
    eyesCenter[0] - eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );
  ctx.fill();

  ctx.beginPath();
  ctx.rect(
    eyesCenter[0] + eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );
  ctx.fill();

  // Bridge (opaque)
  ctx.strokeStyle = '#111';
  ctx.lineWidth = width / 50;
  ctx.beginPath();
  ctx.moveTo(eyesCenter[0] - eyesOffset + lensWidth / 2, eyesCenter[1]);
  ctx.lineTo(eyesCenter[0] + eyesOffset - lensWidth / 2, eyesCenter[1]);
  ctx.stroke();

  ctx.restore();
};

const draw3dGlasses = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 12;
  const lensWidth = width / 8;
  const lensHeight = width / 10;

  // Frames
  ctx.strokeStyle = '#222';
  ctx.lineWidth = width / 40;

  const framePath = new Path2D();
  framePath.rect(
    eyesCenter[0] - eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );
  framePath.rect(
    eyesCenter[0] + eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );
  ctx.stroke(framePath);

  // Lenses
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red
  ctx.fillRect(
    eyesCenter[0] - eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)'; // Cyan
  ctx.fillRect(
    eyesCenter[0] + eyesOffset - lensWidth / 2,
    eyesCenter[1] - lensHeight / 2,
    lensWidth,
    lensHeight
  );

  // Bridge
  ctx.beginPath();
  ctx.moveTo(eyesCenter[0] - eyesOffset + lensWidth / 2, eyesCenter[1]);
  ctx.lineTo(eyesCenter[0] + eyesOffset - lensWidth / 2, eyesCenter[1]);
  ctx.stroke();

  ctx.restore();
};

const drawBeautyMark = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();
  ctx.fillStyle = '#000';

  const mouthCenter = [width / 2, (height / 2.875) * 1.55];
  const markX = mouthCenter[0] - width / 8;
  const markY = mouthCenter[1] - height / 15;

  ctx.beginPath();
  ctx.arc(markX, markY, width / 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

const drawBeret = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  // This padding must match the one used when drawing the face circle.
  const PADDING = 20;
  const faceRadius = width / 2 - PADDING;
  const faceTopY = height / 2 - faceRadius;

  ctx.save();

  // Artistic enhancements for a more realistic look
  const beretTilt = -0.25; // Keep the characteristic tilt
  const beretWidth = width / 2.2; // Slightly wider for a fuller look
  const beretHeight = height / 7;
  const beretCenterX = width / 2.1; // Shifted right
  // Lowered to prevent truncation and give a better fit
  const beretCenterY = faceTopY + beretHeight * 1.3;

  // Define a richer color palette for depth
  const baseColor = '#3a3a3a';
  const shadowColor = '#202020';
  const highlightColor = '#505050';
  const deepShadow = '#1a1a1a';

  // 1. Band of the beret (drawn first to be underneath)
  // Use a dark, flat color as it's mostly in shadow.
  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  ctx.ellipse(
    beretCenterX,
    beretCenterY + beretHeight * 0.4, // Position the band lower than the main puff
    beretWidth * 0.7, // Band is tighter
    beretHeight * 0.4,
    beretTilt,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // 2. Main puffy part with a radial gradient for volume
  const gradient = ctx.createRadialGradient(
    beretCenterX - beretWidth * 0.2, // Light source from top-left
    beretCenterY - beretHeight * 0.4,
    beretHeight * 0.1, // Inner circle of gradient (highlight)
    beretCenterX,
    beretCenterY,
    beretWidth // Outer circle of gradient (shadow)
  );
  gradient.addColorStop(0, highlightColor);
  gradient.addColorStop(0.5, baseColor);
  gradient.addColorStop(1, shadowColor);

  ctx.fillStyle = gradient;
  ctx.strokeStyle = deepShadow; // A very dark outline for definition
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(
    beretCenterX,
    beretCenterY,
    beretWidth,
    beretHeight,
    beretTilt,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  // 3. Small stem on top, more refined
  ctx.beginPath();
  ctx.moveTo(beretCenterX, beretCenterY - beretHeight * 0.95);
  ctx.lineTo(beretCenterX + 5, beretCenterY - beretHeight - 10);
  ctx.lineWidth = 3;
  ctx.strokeStyle = shadowColor;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
};

const drawSweatband = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  const PADDING = 20;
  const faceRadius = width / 2 - PADDING;
  const faceTopY = height / 2 - faceRadius;

  ctx.save();
  ctx.fillStyle = '#E0E0E0'; // Light grey

  const bandWidth = width * 0.6;
  const bandHeight = height / 12;
  const bandX = (width - bandWidth) / 2;
  const bandY = faceTopY + bandHeight * 0.5; // Position on forehead

  ctx.beginPath();
  // Use a path with slightly rounded corners
  const radius = 8;
  ctx.moveTo(bandX + radius, bandY);
  ctx.lineTo(bandX + bandWidth - radius, bandY);
  ctx.quadraticCurveTo(bandX + bandWidth, bandY, bandX + bandWidth, bandY + radius);
  ctx.lineTo(bandX + bandWidth, bandY + bandHeight - radius);
  ctx.quadraticCurveTo(bandX + bandWidth, bandY + bandHeight, bandX + bandWidth - radius, bandY + bandHeight);
  ctx.lineTo(bandX + radius, bandY + bandHeight);
  ctx.quadraticCurveTo(bandX, bandY + bandHeight, bandX, bandY + bandHeight - radius);
  ctx.lineTo(bandX, bandY + radius);
  ctx.quadraticCurveTo(bandX, bandY, bandX + radius, bandY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

const drawReadingGlasses = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.save();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 12;
  const lensWidth = width / 9;
  const lensHeight = width / 14;

  // Frames and Bridge color and thickness
  ctx.strokeStyle = '#222';
  ctx.lineWidth = width / 40;

  // Lens glare
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

  // Left Frame
  const leftX = eyesCenter[0] - eyesOffset - lensWidth / 2;
  const Y = eyesCenter[1] - lensHeight / 2;
  ctx.beginPath();
  ctx.rect(leftX, Y, lensWidth, lensHeight);
  ctx.stroke();
  ctx.fill();

  // Right Frame
  const rightX = eyesCenter[0] + eyesOffset - lensWidth / 2;
  ctx.beginPath();
  ctx.rect(rightX, Y, lensWidth, lensHeight);
  ctx.stroke();
  ctx.fill();

  // Bridge
  ctx.beginPath();
  ctx.moveTo(leftX + lensWidth, eyesCenter[1]);
  ctx.lineTo(rightX, eyesCenter[1]);
  ctx.stroke();

  ctx.restore();
};

export function renderBasicFace(props: BasicFaceProps) {
  const {
    ctx,
    eyeScale: eyesOpenness,
    mouthScale: mouthOpenness,
    color,
    eyeShape = 'round',
    accessory = 'none',
  } = props;
  const { width, height } = ctx.canvas;
  const PADDING = 20;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the background circle
  ctx.fillStyle = color || 'white';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 2 - PADDING, 0, Math.PI * 2);
  ctx.fill();

  const eyesCenter = [width / 2, height / 2.425];
  const eyesOffset = width / 15;
  const eyeRadius = width / 30;
  const eyesPosition: Array<[number, number]> = [
    [eyesCenter[0] - eyesOffset, eyesCenter[1]],
    [eyesCenter[0] + eyesOffset, eyesCenter[1]],
  ];

  // Draw the eyes first, so accessories are drawn on top
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  eye(ctx, eyesPosition[0], eyeRadius, eyesOpenness + 0.1, eyeShape);
  eye(ctx, eyesPosition[1], eyeRadius, eyesOpenness + 0.1, eyeShape);

  // Draw accessory (if any)
  switch (accessory) {
    case 'monocle':
      drawMonocle(ctx, eyesPosition[0], eyeRadius);
      break;
    case 'headphones':
      drawSciFiVisor(ctx);
      break;
    case 'tiara':
      drawTiara(ctx);
      break;
    case 'goggles':
      drawGoggles(ctx);
      break;
    case 'bowler_hat':
      drawBowlerHat(ctx);
      break;
    case 'plumed_hat':
      drawPlumedHat(ctx);
      break;
    case 'chef_hat':
      drawChefHat(ctx);
      break;
    case 'sunglasses':
      drawSunglasses(ctx);
      break;
    case '3d_glasses':
      draw3dGlasses(ctx);
      break;
    case 'beauty_mark':
      drawBeautyMark(ctx);
      break;
    case 'beret':
      drawBeret(ctx);
      break;
    case 'sweatband':
      drawSweatband(ctx);
      break;
    case 'reading_glasses':
      drawReadingGlasses(ctx);
      break;
  }

  const mouthCenter = [width / 2, (height / 2.875) * 1.55];
  const mouthExtent = [width / 10, (height / 5) * mouthOpenness + 10];

  // Draw the mouth
  ctx.save();
  ctx.translate(mouthCenter[0], mouthCenter[1]);
  ctx.scale(1, mouthOpenness + height * 0.002);
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(
    0,
    0,
    mouthExtent[0],
    mouthExtent[1] * 0.45,
    0,
    0,
    Math.PI,
    true
  );
  ctx.fill();
  ctx.restore();
}
