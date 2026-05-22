const fs = require('fs');
const files = fs.readdirSync('./images')
  .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
  .sort();
fs.writeFileSync('./images.json', JSON.stringify(files, null, 2));
console.log(`Wrote ${files.length} images to images.json`);