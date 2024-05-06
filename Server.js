const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

// body-parser 미들웨어를 사용하여 JSON 본문을 파싱합니다.
app.use(bodyParser.json());

// POST /login 경로에 대한 라우트 핸들러를 생성합니다.
app.post('/login', (req, res) => {
    // 요청 본문을 콘솔에 출력합니다.
    console.log("req body?", req.body);

    // 사용자 인증을 수행합니다. 이 예제에서는 단순히 요청 본문에 'username'과 'password' 필드가 있는지 확인합니다.
    if (req.body.email && req.body.password) {

        // JWT 토큰을 생성합니다. 이 예제에서는 'username' 필드만 토큰에 포함합니다.
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, 'secretKey');
        console.log("token? : ", token)

        // 토큰을 검증합니다.
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                console.log('Token verification failed:', err);
            } else {
                console.log('Decoded:', decoded);
            }
        });

        // 응답을 설정합니다. 토큰을 응답 본문에 포함합니다.
        res.json({ token });
    } else {
        // 인증에 실패하면 401 Unauthorized 응답을 반환합니다.
        res.sendStatus(401);
    }
});

// 서버가 8080 포트에서 수신 대기하도록 설정합니다.
app.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});