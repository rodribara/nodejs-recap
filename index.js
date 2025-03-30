const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString()); // changes buffer to data

    }
})
/* console.log('hello') */
 // callback hell - nesting callbacks
/* fs.writeFile(path.join(__dirname, 'files','reply.txt'), 'created text', (err) => {
    if (err) throw err;
    console.log('Write complete')
    fs.appendFile(path.join(__dirname, 'files','reply.txt'), 'appended', (err) => {
        if (err) throw err;
        console.log('append complete')
        fs.rename(path.join(__dirname, 'files','reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('Rename complete')
        })
    })
}) */


    


process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
})