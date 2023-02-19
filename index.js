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
/*
const http = require('http');
const fetch = require('node-fetch');




http.createServer(function (req, res) {
    console.log(` start at ${req.url}!`);
	let url = new URL( `https://${req.headers.host}${req.url}` );
	        url.hostname = 'https://'+nodeList[Math.floor(Math.random() * nodeList.length)];                        
        url.protocol = "https";
	 console.log( url.hostname );
	// res.write('بله');
  //  res.end();
	
	    try {
      return fetch(new Request(url, req));
    } catch (e) {
      return new Response(e);
    }
	

    
}).listen(process.env.PORT || 3000);
*/

/*
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
my_target = 'https://'+nodeList[Math.floor(Math.random() * nodeList.length)]; 
app.use('*', createProxyMiddleware({target:my_target, changeOrigin: true}));
app.listen(process.env.PORT || 3000);
*/
var http = require('http'),

var httpProxy = require('http-proxy');
my_target =  nodeList[Math.floor(Math.random() * nodeList.length)]; 


var proxy = new httpProxy.createProxyServer({
  target: {
        host: my_target,
    port: 443
  }
});
var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

proxyServer.listen(8015);

