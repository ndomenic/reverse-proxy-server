const express = require('express');
const proxy = require('http-proxy-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { routes } = require('./routesConfig.json');

const app = express();

//Re-route each request to the appropriate route
for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      changeOrigin: true,
    })
  );
}

//Listen for https requests on the specified port 
if (process.env.NODE_ENV == 'production') {
  //Certificate
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/domenichini.ca/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/domenichini.ca/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/domenichini.ca/chain.pem', 'utf8');

  https.createServer({
    key: privateKey,
    cert: certificate,
    ca: ca
  }, app).listen(443, () => console.log(`Listening on port 443`));
}

//Default http server
http.createServer(app).listen(80, () => {
  console.log('HTTP Server running on port 80');
});