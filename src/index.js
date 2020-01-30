const express = require('express');
const proxy = require('http-proxy-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { routes } = require('./routesConfig.json');

const app = express();

//Cert
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

//Re-route each request to the appropriate route
for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      changeOrigin: true,
    })
  );
}

//Listen for http requests on the specified port 
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

//Listen for https requests on the specified port 
https.createServer({
	key: privateKey,
	cert: certificate,
	ca: ca
}, app).listen(443, () => console.log(`Listening on port 443`));