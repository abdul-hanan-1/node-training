const fs = require('fs');
//Blocking Synchronous Code
// const textin = fs.readFileSync('./txt/input.txt','utf-8');
// const textout = `This what we know about avocado: ${textin} \n Creted on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textout);


//Non Blocking Asynchronous Code

fs.readFile('./txt/start.txt','utf-8', (err,data) => {
	console.log(data);
	fs.readFile(`./txt/${data}.txt`,'utf-8',(err,data1) =>{
		console.log(data1);
		fs.readFile('./txt/append.txt','utf-8',(err,data2) => {
			console.log(data2);
			fs.writeFile('./txt/final.txt',`${data1}\n${data2}`,'utf-8',err => {
				console.log('File has been modified.');
			})
		});
	});
});
console.log('Will read from file.');

