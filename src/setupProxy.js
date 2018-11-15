const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy(
        '/api', {
            target: 'http://192.168.1.149:8899',
            pathRewrite: {
                '/api': '/'
            }
        }));
};
