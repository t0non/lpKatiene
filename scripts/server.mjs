import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.ico':'image/x-icon'};
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep)&&f!==root)throw Error();if((await fs.stat(f)).isDirectory())f=path.join(f,'index.html');const b=await fs.readFile(f);res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(b)}catch{res.writeHead(404);res.end('Página não encontrada');}}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173'));
