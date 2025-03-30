const fs = require("fs");
const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./files/new-lorem.txt");

/* rs.on('data', dataChunk => {
    ws.write(dataChunk)
}) 
    //there's a better way to do this

 */

rs.pipe(ws); // recommended way, or at least better than rs.on
