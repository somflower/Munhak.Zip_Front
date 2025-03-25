const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // 또는 적절한 경로를 설정
        createProxyMiddleware({
            target: 'http://localhost:8080', // 백엔드 서버 주소
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // 필요에 따라 경로를 재작성
            },
        })
    );
};
