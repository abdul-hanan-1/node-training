const fs = require('fs');
//Blocking Synchronous Code
const textin = fs.readFileSync('./txt/input.txt','utf-8');
const textout = `This what we know about avocado: ${textin} \n Creted on: ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textout);


//Non Blocking Asynchronous Code

fs.readFile('./txt/start.txt','utf-8', (err,data) => {
	console.log(data);
})
console.log('Will read from file.')