const http = require("http");
const { exec } = require("child_process");
const os = require("os");

const port = 3000;
const serviceName = process.env.SERVICE_NAME || "network-app";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    handleHomePage(res);
  } else if (url === "/basic-info") {
    handleBasicInfo(res);
  } else if (url === "/simple-ping" && method === "POST") {
    handleSimplePing(req, res);
  } else if (url === "/simple-call" && method === "POST") {
    handleSimpleCall(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

function handleHomePage(res) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Docker Network - เรียนรู้ง่ายๆ</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                background: #f0f8ff;
                color: #333;
            }
            .container { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-width: 700px;
                margin: 0 auto;
            }
            .info-box { 
                background: #e3f2fd; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0;
                border-left: 4px solid #2196f3;
            }
            .test-box { 
                background: #f5f5f5; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0;
            }
            button { 
                padding: 10px 20px; 
                margin: 10px 5px; 
                background: #2196f3; 
                color: white; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer;
                font-size: 16px;
            }
            button:hover { 
                background: #1976d2; 
            }
            .result { 
                background: #f8f8f8; 
                padding: 15px; 
                border-radius: 5px; 
                margin: 10px 0;
                border: 1px solid #ddd;
                font-family: monospace;
                white-space: pre-wrap;
            }
            .status { 
                display: inline-block; 
                padding: 5px 10px; 
                border-radius: 3px; 
                font-weight: bold;
                margin: 5px 0;
            }
            .success { background: #d4edda; color: #155724; }
            .error { background: #f8d7da; color: #721c24; }
            h1 { text-align: center; color: #2196f3; }
            h3 { color: #1976d2; margin-top: 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌐 Docker Network - เรียนรู้ง่ายๆ</h1>
            
            <div class="info-box">
                <h3>ℹ️ ข้อมูลพื้นฐาน</h3>
                <p><strong>ชื่อ Service:</strong> ${serviceName}</p>
                <p><strong>Container ID:</strong> ${os.hostname()}</p>
                <p><strong>วัตถุประสงค์:</strong> เรียนรู้การสื่อสารระหว่าง Container</p>
            </div>

            <div class="test-box">
                <h3>🧪 แบบทดสอบง่ายๆ</h3>
                
                <h4>1. ทดสอบหา Service อื่น</h4>
                <button onclick="testWebApp()">หา web-app</button>
                <button onclick="testApiApp()">หา api-app</button>
                <div id="findResult" class="result"></div>
                
                <h4>2. ทดสอบเรียกใช้ Service</h4>
                <button onclick="callWebApp()">เรียก web-app</button>
                <button onclick="callApiApp()">เรียก api-app</button>
                <div id="callResult" class="result"></div>
                
                <h4>3. ดูข้อมูล Network</h4>
                <button onclick="showBasicInfo()">ข้อมูลพื้นฐาน</button>
                <div id="basicResult" class="result"></div>
            </div>

            <div class="info-box">
                <h3>💡 สิ่งที่เรียนรู้</h3>
                <ul>
                    <li>✅ Container สามารถเรียกกันด้วยชื่อ service ได้</li>
                    <li>✅ ไม่ต้องรู้ IP address ของกัน</li>
                    <li>✅ Docker จัดการ network ให้อัตโนมัติ</li>
                </ul>
            </div>
        </div>

        <script>
            function testWebApp() {
                showStatus('กำลังหา web-app...', 'findResult');
                fetch('/simple-ping', {
                    method: 'POST',
                    body: 'web-app'
                })
                .then(res => res.text())
                .then(result => {
                    document.getElementById('findResult').innerHTML = 
                        '<div class="status success">✅ พบ web-app แล้ว!</div>' + result;
                })
                .catch(() => {
                    document.getElementById('findResult').innerHTML = 
                        '<div class="status error">❌ ไม่พบ web-app</div>';
                });
            }

            function testApiApp() {
                showStatus('กำลังหา api-app...', 'findResult');
                fetch('/simple-ping', {
                    method: 'POST',
                    body: 'api-app'
                })
                .then(res => res.text())
                .then(result => {
                    document.getElementById('findResult').innerHTML = 
                        '<div class="status success">✅ พบ api-app แล้ว!</div>' + result;
                })
                .catch(() => {
                    document.getElementById('findResult').innerHTML = 
                        '<div class="status error">❌ ไม่พบ api-app</div>';
                });
            }

            function callWebApp() {
                showStatus('กำลังเรียก web-app...', 'callResult');
                fetch('/simple-call', {
                    method: 'POST',
                    body: 'web-app:3000'
                })
                .then(res => res.text())
                .then(result => {
                    document.getElementById('callResult').innerHTML = 
                        '<div class="status success">✅ เรียก web-app สำเร็จ!</div>' + result;
                })
                .catch(() => {
                    document.getElementById('callResult').innerHTML = 
                        '<div class="status error">❌ เรียก web-app ไม่สำเร็จ</div>';
                });
            }

            function callApiApp() {
                showStatus('กำลังเรียก api-app...', 'callResult');
                fetch('/simple-call', {
                    method: 'POST',
                    body: 'api-app:3000'
                })
                .then(res => res.text())
                .then(result => {
                    document.getElementById('callResult').innerHTML = 
                        '<div class="status success">✅ เรียก api-app สำเร็จ!</div>' + result;
                })
                .catch(() => {
                    document.getElementById('callResult').innerHTML = 
                        '<div class="status error">❌ เรียก api-app ไม่สำเร็จ</div>';
                });
            }

            function showBasicInfo() {
                fetch('/basic-info')
                .then(res => res.json())
                .then(data => {
                    const info = \`Service: \${data.serviceName}
Container: \${data.hostname}
Network: \${data.network || 'ไม่ทราบ'}
เวลา: \${new Date(data.timestamp).toLocaleString('th-TH')}\`;
                    document.getElementById('basicResult').textContent = info;
                });
            }

            function showStatus(message, targetId) {
                document.getElementById(targetId).innerHTML = 
                    '<div class="status">⏳ ' + message + '</div>';
            }
        </script>
    </body>
    </html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
}

function handleBasicInfo(res) {
  const info = {
    serviceName: serviceName,
    hostname: os.hostname(),
    network: "learning-net",
    timestamp: new Date().toISOString(),
  };

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(info, null, 2));
}

function handleSimplePing(req, res) {
  let target = "";
  req.on("data", (chunk) => (target += chunk));
  req.on("end", () => {
    exec(`ping -c 1 ${target}`, (error, stdout, stderr) => {
      if (error) {
        res.end(`❌ ไม่สามารถเข้าถึง ${target} ได้`);
      } else {
        res.end(`✅ พบ ${target} แล้ว!\nการเชื่อมต่อ: ปกติ`);
      }
    });
  });
}

function handleSimpleCall(req, res) {
  let target = "";
  req.on("data", (chunk) => (target += chunk));
  req.on("end", () => {
    const [host, port] = target.split(":");
    const testPort = port || "3000";

    exec(
      `curl -s -m 5 http://${host}:${testPort} | head -1`,
      (error, stdout, stderr) => {
        if (error) {
          res.end(`❌ ไม่สามารถเรียก ${target} ได้`);
        } else {
          res.end(`✅ เรียก ${target} สำเร็จ!\nได้รับข้อมูลกลับมา`);
        }
      }
    );
  });
}

server.listen(port, "0.0.0.0", () => {
  console.log(
    `🌐 Docker Network Learning App (${serviceName}) running on port ${port}`
  );
  console.log(`📊 Container hostname: ${os.hostname()}`);
  console.log(`🔧 Platform: ${os.platform()}`);
});
