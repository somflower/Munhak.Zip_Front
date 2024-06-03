// React와 Spring Boot 연결을 위한 Proxy 설정

//경로

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};