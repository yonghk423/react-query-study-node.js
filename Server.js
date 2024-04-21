// http 모듈을 가져옵니다.
const http = require('http');

// 서버를 생성합니다.
const server = http.createServer((req, res) => {
    // 응답을 설정합니다.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

// 서버가 3000 포트에서 수신 대기하도록 설정합니다.
server.listen(8080, () => {
    console.log('Server running at http://8080/');
});