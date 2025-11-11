const http = require("http");
const os = require("os");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Hello from Docker!</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            .emoji { font-size: 4em; margin: 20px 0; }
            .info { 
                background: rgba(255, 255, 255, 0.1); 
                padding: 20px; 
                border-radius: 5px; 
                margin: 20px 0;
                text-align: left;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji">🐳</div>
            <h1>Hello from Docker Container!</h1>
            <p>This Node.js application is running inside a Docker container</p>
            
            <div class="info">
                <h3>Container Information:</h3>
                <p><strong>Hostname:</strong> ${os.hostname()}</p>
                <p><strong>Platform:</strong> ${os.platform()}</p>
                <p><strong>Node.js Version:</strong> ${process.version}</p>
                <p><strong>Current Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>ARG Env:</strong> ${process.env.APP_VERSION}</p>
                <p><strong>File Version:</strong> 3</p>
            </div>
            
            <p>🎉 Successfully running <code>node index.js</code> in Docker!</p>
        </div>
    </body>
    </html>
  `;

  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`);
  console.log(`📦 Container hostname: ${os.hostname()}`);
  console.log(`⚡ Node.js version: ${process.version}`);
});
