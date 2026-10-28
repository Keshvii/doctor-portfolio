import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out'),base=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/\/$/,'');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.txt':'text/plain','.pdf':'application/pdf'};
const server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(base&&path!==base&&!path.startsWith(base+'/')){res.writeHead(404).end('Not found');return}let file=resolve(root,'.'+path.slice(base.length));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return}if((await stat(file)).isDirectory())file=resolve(file,'index.html');res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end('Not found')}});
server.listen(3000,'0.0.0.0',()=>console.log(`Preview: http://localhost:3000${base}/`));
