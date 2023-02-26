// Require modules
const http = require('http');
const https = require('https');
const ws = require('ws');


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
const options = {
hostname: nodeList[Math.floor(Math.random() * nodeList.length)],
port: 443,
path: req.url,
method: req.method,
headers: req.headers,
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
