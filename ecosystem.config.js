module.exports = {
  apps : [{
    name: 'Reverse-Proxy-Server',
    script: 'src/index.js',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production",
    },
  }],
};
