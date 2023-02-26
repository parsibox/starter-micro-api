// Require modules
const http = require('http');
const https = require('https');
const ws = require('ws');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


var nodeList = [
    "atlanta.v2ray.online",
    "seattle.v2ray.online",
    "helsinki.v2ray.online",
  "phoenix.v2ray.online",
  "vienna.v2ray.online",
  "amsterdam.v2ray.online",
  "losAngeles.v2ray.online",
    "tokyo.v2ray.online"
];

// Create a server
const server = http.createServer();

// Create a WebSocket server
const wss = new ws.Server({server});

// Listen for WebSocket connections
wss.on('connection', function connection(ws) {
// Listen for messages from WebSocket clients
ws.on('message', function incoming(message) {
console.log('Received message: %s', message);
});

// Listen for custom events from WebSocket clients
ws.addEventListener('customEvent', function listener(event) {
console.log('Received custom event: %s', event);
});
});

// Listen for HTTP requests
server.on('request', function request(req, res) {
// Forward HTTP requests to another URL
    let myh = nodeList[Math.floor(Math.random() * nodeList.length)];
    console.log( myh);
     console.log(  req.url);
     console.log( req.method);
    console.log( req.headers);
    
const options = {
hostname: myh,
port: 443,
path: req.url,
method: req.method,
headers: req.headers,
    rejectUnauthorized: false,
      requestCert: true,
      agent: false,
    ciphers: 'ALL',
    secureProtocol: 'TLSv1_method',
};

// Make an HTTPS request to the URL
const connector = https.request(options, function (response) {
// Send back the response headers and status code
res.writeHead(response.statusCode, response.headers);

// Pipe the response data to the original response object
response.pipe(res);
});

// Handle errors in HTTPS request
connector.on('error', function (error) {
console.error(error);
res.statusCode = 500;
res.end();
});

// Pipe the original request data to the HTTPS request object
req.pipe(connector);
});

// Start listening on port 3000
server.listen(3000);
