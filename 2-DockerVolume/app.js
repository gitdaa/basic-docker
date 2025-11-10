const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

// Paths for volume demonstration
const dataDir = "/app/data";
const logsDir = "/app/logs";
const configDir = "/app/config";

// Ensure directories exist
[dataDir, logsDir, configDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Log all requests
  const logEntry = `${new Date().toISOString()} - ${method} ${url}\n`;
  fs.appendFileSync(path.join(logsDir, "access.log"), logEntry);

  if (url === "/") {
    handleHomePage(res);
  } else if (url === "/write" && method === "POST") {
    handleWrite(req, res);
  } else if (url === "/read") {
    handleRead(res);
  } else if (url === "/logs") {
    handleLogs(res);
  } else if (url === "/config") {
    handleConfig(res);
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
        <title>Docker Volume Learning</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            button { padding: 10px 15px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
            button:hover { background: #0056b3; }
            input { padding: 8px; margin: 5px; width: 200px; }
            .volume-info { background: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🗂️ Docker Volume Learning</h1>
            
            <div class="volume-info">
                <h3>📁 Volume Directories:</h3>
                <ul>
                    <li><strong>/app/data</strong> - สำหรับเก็บข้อมูล (Data Volume)</li>
                    <li><strong>/app/logs</strong> - สำหรับเก็บ log files (Log Volume)</li>
                    <li><strong>/app/config</strong> - สำหรับ configuration files (Config Volume)</li>
                </ul>
            </div>

            <div class="section">
                <h3>✍️ เขียนข้อมูลลง Volume</h3>
                <input type="text" id="dataInput" placeholder="พิมพ์ข้อความที่ต้องการบันทึก">
                <button onclick="writeData()">บันทึกข้อมูล</button>
            </div>

            <div class="section">
                <h3>📖 อ่านข้อมูลจาก Volume</h3>
                <button onclick="readData()">อ่านข้อมูลทั้งหมด</button>
                <div id="dataResult"></div>
            </div>

            <div class="section">
                <h3>📋 ดู Access Logs</h3>
                <button onclick="viewLogs()">ดู Logs</button>
                <div id="logsResult"></div>
            </div>

            <div class="section">
                <h3>⚙️ ดู Config</h3>
                <button onclick="viewConfig()">ดู Configuration</button>
                <div id="configResult"></div>
            </div>
        </div>

        <script>
            function writeData() {
                const data = document.getElementById('dataInput').value;
                if (!data) return alert('กรุณาพิมพ์ข้อความ');
                
                fetch('/write', {
                    method: 'POST',
                    headers: {'Content-Type': 'text/plain'},
                    body: data
                }).then(() => {
                    alert('บันทึกข้อมูลเรียบร้อย');
                    document.getElementById('dataInput').value = '';
                });
            }

            function readData() {
                fetch('/read')
                .then(res => res.text())
                .then(data => {
                    document.getElementById('dataResult').innerHTML = 
                        '<pre style="background:#f8f9fa; padding:10px; border-radius:5px;">' + data + '</pre>';
                });
            }

            function viewLogs() {
                fetch('/logs')
                .then(res => res.text())
                .then(logs => {
                    document.getElementById('logsResult').innerHTML = 
                        '<pre style="background:#f8f9fa; padding:10px; border-radius:5px; max-height:200px; overflow-y:scroll;">' + logs + '</pre>';
                });
            }

            function viewConfig() {
                fetch('/config')
                .then(res => res.text())
                .then(config => {
                    document.getElementById('configResult').innerHTML = 
                        '<pre style="background:#f8f9fa; padding:10px; border-radius:5px;">' + config + '</pre>';
                });
            }
        </script>
    </body>
    </html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
}

function handleWrite(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const timestamp = new Date().toISOString();
    const data = `[${timestamp}] ${body}\n`;
    fs.appendFileSync(path.join(dataDir, "user-data.txt"), data);
    res.end("Data written successfully");
  });
}

function handleRead(res) {
  const dataFile = path.join(dataDir, "user-data.txt");
  try {
    const data = fs.existsSync(dataFile)
      ? fs.readFileSync(dataFile, "utf8")
      : "ไม่มีข้อมูล";
    res.end(data);
  } catch (error) {
    res.end("Error reading data: " + error.message);
  }
}

function handleLogs(res) {
  const logFile = path.join(logsDir, "access.log");
  try {
    const logs = fs.existsSync(logFile)
      ? fs.readFileSync(logFile, "utf8")
      : "ไม่มี logs";
    res.end(logs);
  } catch (error) {
    res.end("Error reading logs: " + error.message);
  }
}

function handleConfig(res) {
  const config = {
    appName: "Docker Volume Demo",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    volumes: {
      data: "/app/data",
      logs: "/app/logs",
      config: "/app/config",
    },
    containerInfo: {
      hostname: require("os").hostname(),
      platform: require("os").platform(),
      nodeVersion: process.version,
    },
  };

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(config, null, 2));
}

server.listen(port, () => {
  console.log(`🚀 Docker Volume Learning App running on port ${port}`);
  console.log(`📁 Data directory: ${dataDir}`);
  console.log(`📋 Logs directory: ${logsDir}`);
  console.log(`⚙️  Config directory: ${configDir}`);

  // Create initial config file
  const configFile = path.join(configDir, "app-config.json");
  if (!fs.existsSync(configFile)) {
    const initialConfig = {
      created: new Date().toISOString(),
      message: "This file demonstrates config volume mounting",
    };
    fs.writeFileSync(configFile, JSON.stringify(initialConfig, null, 2));
  }
});
