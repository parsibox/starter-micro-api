var http = require('http');
const fetch = require('node-fetch');


var nodeList = [
    "Atlanta.v2ray.online",
    "Seattle.v2ray.online",
    "Helsinki.v2ray.online",
	"Phoenix.v2ray.online",
	"Vienna.v2ray.online",
	"Amsterdam.v2ray.online",
	"LosAngeles.v2ray.online",
    "Tokyo.v2ray.online"
];

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
	let url = new URL(req.url);
	        url.hostname = nodeList[Math.floor(Math.random() * nodeList.length)];                        
        url.protocol = "https";
	 console.log( url.hostname );
	 res.write('بله');
    res.end();

    
}).listen(process.env.PORT || 3000);
