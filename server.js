const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Default to index.html
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Strip query parameters
    filePath = filePath.split('?')[0];
    
    // Resolve absolute file path relative to project root
    const resolvedPath = path.join(__dirname, filePath);
    
    // Basic path traversal protection
    if (!resolvedPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    fs.stat(resolvedPath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File Not Found');
            return;
        }
        
        const ext = path.extname(resolvedPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });
        
        const stream = fs.createReadStream(resolvedPath);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`  Local server running at: http://localhost:${PORT}  `);
    console.log(`  Press Ctrl+C to stop the server                 `);
    console.log(`==================================================`);
});
