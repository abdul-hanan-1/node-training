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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');



const replaceTemplate = (temp,product) => {
	let output = temp.replace(/{%IMAGE%}/g,product.image);
	output = output.replace(/{%QUANTITY%}/g,product.quantity);
	output = output.replace(/{%PRICE%}/g,product.price);
	output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
	output = output.replace(/{%LOCATION%}/g,product.from);
	output = output.replace(/{%DESCRIPTION%}/g,product.description);
	output = output.replace(/{%PRODUCTNAME%}/g,product.productName);
	output = output.replace(/{%ID%}/g,product.id);
	if (!product.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g," not-organic ");
		console.log(product.organic)
	}
	return output;	
}

const parsedData = JSON.parse(data);

const server = http.createServer((req,res) => {
	const {query,pathname} = url.parse(req.url,true);
	if(pathname === '/' || pathname === '/overview')
	{

		const cardsHtml = parsedData.map(element => replaceTemplate(tempCard,element));
		const cardHtml = cardsHtml.join(" ");
		const finalHtml = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
		res.end(finalHtml);
		res.writeHead(200,{
			'Content-type' : 'text/html'
		})
	}
	else if(pathname === '/product'){
		res.writeHead(200,{
			'Content-type' : 'text/html'
		})
		const productData = parsedData [query.id];
		const productHtml = replaceTemplate(tempProduct,productData);
		res.end(productHtml);

	}
	else if(pathname === '/api')
	{
		res.end(data);
		res.writeHead(200,{
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