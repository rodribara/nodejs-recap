const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {

try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8')
    console.log(data.toString()); // changes buffer to data
    await fsPromises.writeFile(path.join(__dirname, 'files','promiseWrite.txt'), data)
    await fsPromises.appendFile(path.join(__dirname, 'files','promiseWrite.txt'), '\n\nNice to meet you')
    await fsPromises.rename(path.join(__dirname, 'files','promiseWrite.txt'), path.join(__dirname,'files', 'newPromiseWrite.txt'))
    const newData = await fsPromises.readFile(path.join(__dirname,'files', 'newPromiseWrite.txt'), 'utf8')
    console.log(newData.toString())
} catch (err){console.error(err)}
}
 

fileOps()

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
})