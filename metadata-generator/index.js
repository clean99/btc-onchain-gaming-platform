const fs = require("fs");
const fs_extra = require("fs-extra");
const crypto = require("crypto");
const metadata_count = 5 //Replace with your value
let count = 0


fs_extra.emptyDirSync("./genericJson")

while (count < metadata_count)  {

  let count_increment = count + 1

  const metas = {
    "name":  `Birdy #${count_increment}`,
    "description": "Replace with Your collection description",
    "image": `ipfs://your_cid/${count_increment}.png`, //You can replace this dynamic URL with a single image URL. EX: 'ipfs://your_cid/image.png'
    "edition": count_increment,
    "attributes": {
      tokenHash: crypto.createHash('sha256').update(count_increment.toString()).digest('hex'),
    }
  };

  fs.writeFileSync(
    `genericJson/${count_increment+'.json'}`,
    JSON.stringify(metas, null, 2)
  );

  console.log(`${count_increment+'.json'} Created!`);
  count++;
};