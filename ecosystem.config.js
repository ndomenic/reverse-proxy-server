module.exports = {
  apps : [{
    name: 'Reverse-Proxy-Server',
    script: 'src/index.js',
    autorestart: true,
    watch: false,
    env: {
      PORT: 80,
      NODE_ENV: "production",
    },
  }],
};
