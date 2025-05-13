const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;

// 정적 파일 제공
app.use(express.static(__dirname));

// 루트 경로로 접속시 treejs.html로 리다이렉트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "treejs.html"));
});

app.get("/treejs2", (req, res) => {
  res.sendFile(path.join(__dirname, "treejs2.html"));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});
