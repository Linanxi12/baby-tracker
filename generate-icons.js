// Generate simple colored circle icons for the Baby Tracker PWA
const fs = require('fs');
const zlib = require('zlib');

function createPNG(size, color) {
  // color = [r, g, b] 0-255
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);  // width
  ihdrData.writeUInt32BE(size, 4);  // height
  ihdrData.writeUInt8(8, 8);        // bit depth
  ihdrData.writeUInt8(2, 9);        // color type: RGB
  ihdrData.writeUInt8(0, 10);       // compression
  ihdrData.writeUInt8(0, 11);       // filter
  ihdrData.writeUInt8(0, 12);       // interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // IDAT: pixel data
  const rawData = Buffer.alloc(size * (1 + size * 3)); // filter byte + RGB per row
  const cx = size / 2, cy = size / 2, r = size * 0.42;
  const bgColor = [255, 249, 245]; // warm cream

  for (let y = 0; y < size; y++) {
    const rowOffset = y * (1 + size * 3);
    rawData.writeUInt8(0, rowOffset); // filter: none
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pixelOffset = rowOffset + 1 + x * 3;

      if (dist <= r) {
        rawData.writeUInt8(color[0], pixelOffset);
        rawData.writeUInt8(color[1], pixelOffset + 1);
        rawData.writeUInt8(color[2], pixelOffset + 2);
      } else if (dist <= r + 1.5) {
        // anti-aliased edge
        const t = (dist - r) / 1.5;
        rawData.writeUInt8(Math.round(color[0] * (1-t) + bgColor[0] * t), pixelOffset);
        rawData.writeUInt8(Math.round(color[1] * (1-t) + bgColor[1] * t), pixelOffset + 1);
        rawData.writeUInt8(Math.round(color[2] * (1-t) + bgColor[2] * t), pixelOffset + 2);
      } else {
        rawData.writeUInt8(bgColor[0], pixelOffset);
        rawData.writeUInt8(bgColor[1], pixelOffset + 1);
        rawData.writeUInt8(bgColor[2], pixelOffset + 2);
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, 'ascii');
  const crc = crc32(Buffer.concat([typeBuffer, data]));
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = (crc >>> 1) ^ 0xEDB88320;
      else crc = crc >>> 1;
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons
const pinkColor = [255, 154, 118]; // #FF9A76

console.log('Generating icons...');
fs.writeFileSync('icon-192.png', createPNG(192, pinkColor));
console.log('Created icon-192.png');
fs.writeFileSync('icon-512.png', createPNG(512, pinkColor));
console.log('Created icon-512.png');
console.log('Done!');
