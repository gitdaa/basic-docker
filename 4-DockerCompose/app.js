const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simple Docker Compose App</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                margin: 0;
                padding: 50px;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 10px;
                max-width: 600px;
                margin: 0 auto;
            }
            h1 { font-size: 3em; margin-bottom: 20px; }
            p { font-size: 1.2em; margin: 20px 0; }
            .info { 
                background: rgba(255, 255, 255, 0.1); 
                padding: 20px; 
                border-radius: 5px; 
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🐳 4-DockerCompose</h1>
            <p>docker-compose ง่ายนิดเดียว</p>
            
            <div class="info">
                <h3>App Info:</h3>
                <p><strong>Container:</strong> ${
                  process.env.HOSTNAME || "localhost"
                }</p>
                <p><strong>Port:</strong> ${port}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>✅ Docker Compose ได้แล้วจ้าาา</p>
        </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    container: process.env.HOSTNAME,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Simple app listening on port ${port}`);
  console.log(`📦 Container: ${process.env.HOSTNAME || "localhost"}`);
  console.log(`🌐 Visit: http://localhost:${port}`);
});
