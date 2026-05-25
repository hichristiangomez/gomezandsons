// Run with: node build-manifest.js
// Regenerates images.json from whatever files are currently in the images/ folder.
// Run this anytime you add, remove, or rename photos before committing to GitHub.

const fs = require('fs');
const files = fs.readdirSync('./images')
  .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
  .sort();
fs.writeFileSync('./images.json', JSON.stringify(files, null, 2));
console.log(`Wrote ${files.length} images to images.json`);