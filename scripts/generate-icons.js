import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// Minimal PNG encoder using pure Node.js (zlib)
function createPNG(width, height, colorFn) {
  // RGBA buffer: each scanline has 1 filter byte (0) + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = colorFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: RGBA (6)
  ihdr[10] = 0; // Compression method
  ihdr[11] = 0; // Filter method
  ihdr[12] = 0; // Interlace method

  function createChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const length = data.length;
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(length, 0);

    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Standard CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Brand gradient with rounded center icon
function brandShader(x, y, w, h, isMaskable = false) {
  const nx = x / w;
  const ny = y / h;
  const cx = 0.5;
  const cy = 0.5;
  const dist = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2);

  // Gradient: Indigo (#4F46E5) -> Violet (#7C3AED) -> Pink (#EC4899)
  const t = (nx + ny) / 2;
  let r = Math.round(79 * (1 - t) + 236 * t);
  let g = Math.round(70 * (1 - t) + 72 * t);
  let b = Math.round(229 * (1 - t) + 153 * t);

  // Corner rounding for non-maskable (standard squircle effect)
  if (!isMaskable) {
    const cornerRadius = 0.22;
    const dx = Math.max(0, Math.abs(nx - 0.5) - (0.5 - cornerRadius));
    const dy = Math.max(0, Math.abs(ny - 0.5) - (0.5 - cornerRadius));
    const cornerDist = Math.sqrt(dx * dx + dy * dy);
    if (cornerDist > cornerRadius) {
      return [0, 0, 0, 0]; // Transparent outer edge
    }
  }

  // Inner stylized glowing emblem
  if (dist < 0.28) {
    // White / subtle soft heart highlight
    const glow = Math.max(0, 1 - dist / 0.28);
    r = Math.min(255, Math.round(r + (255 - r) * glow * 0.9));
    g = Math.min(255, Math.round(g + (255 - g) * glow * 0.9));
    b = Math.min(255, Math.round(b + (255 - b) * glow * 0.9));
  } else if (dist < 0.35 && dist > 0.33) {
    // Orbit ring
    r = 255;
    g = 255;
    b = 255;
  }

  return [r, g, b, 255];
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating PWA icons...');
const icon192 = createPNG(192, 192, (x, y, w, h) => brandShader(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

const icon512 = createPNG(512, 512, (x, y, w, h) => brandShader(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

const iconMaskable = createPNG(512, 512, (x, y, w, h) => brandShader(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);

const appleIcon = createPNG(180, 180, (x, y, w, h) => brandShader(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Favicon 32x32
const favicon = createPNG(32, 32, (x, y, w, h) => brandShader(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

console.log('PWA icons created successfully in public/.');
