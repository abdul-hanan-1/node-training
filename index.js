//-------------FILE Read/Write-------------------

  const fs = require('fs');
//Blocking Synchronous Code
// const textin = fs.readFileSync('./txt/input.txt','utf-8');
// const textout = `This what we know about avocado: ${textin} \n Creted on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textout);


//Non Blocking Asynchronous Code

// fs.readFile('./txt/start.txt','utf-8', (err,data) => {
// 	console.log(data);
// 	fs.readFile(`./txt/${data}.txt`,'utf-8',(err,data1) =>{
// 		console.log(data1);
// 		fs.readFile('./txt/append.txt','utf-8',(err,data2) => {
// 			console.log(data2);
// 			fs.writeFile('./txt/final.txt',`${data1}\n${data2}`,'utf-8',err => {
// 				console.log('File has been modified.');
// 			})
// 		});
// 	});
// });
// console.log('Will read from file.');


//-------------Web Server-------------------------

const http = require('http');
const url = require('url');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const parsedData = JSON.parse(data);

const server = http.createServer((req,res) => {
	const pathName = req.url;
	if(pathName === '/' || pathName === '/overview')
		res.end("This is Overview");
	else if(pathName === '/product')
		res.end("This is product");
	else if(pathName === '/api')
	{
		res.end(data);
		res.writeHead(404,{
			'Content-type' : 'application/json'
		})
	}
	else
	{
		res.writeHead(404,{
			'Content-type' : 'text/html'
		})
		res.end("<h1>Page not found.</h1>")
	}
})

server.listen(8000,'127.0.0.1', () => {
	console.log("Listening to requests on port 8000.");
})


// ./ means the directory from which the script is runnimg
// while ${__dirname}/ means current file's directory.