const express = require('express');
const proxy = require('http-proxy-middleware');
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

//Listen for requests on the specified port 
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));